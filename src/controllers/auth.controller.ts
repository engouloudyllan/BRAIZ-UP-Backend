import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../models/index.js";
import ApiResponse from "../helpers/responses.js";
import Utils from "../helpers/Utils.js";
import env from "../config/env.js";
import { createAndSendOtp, verifyOtp } from "../services/otp.service.js";
import type { AuthenticatedRequest } from "../middlewares/auth.middleware.js";

const SALT_ROUNDS = 10;

function signToken(userId: number): string {
  // jsonwebtoken@9 attend `expiresIn: number | StringValue` (template type strict).
  // Notre env retourne `string` → on cast en `any` pour éviter de devoir importer
  // le type `StringValue` (interne à `ms`).
  return jwt.sign({ userId }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn as unknown as number,
  });
}

function publicUser(req: express.Request, u: any) {
  // Strip password & internal fields, expose roles[] + resolve profileImage URL
  if (!u) return null;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, roles, profileImage, ...rest } = u;
  return {
    ...rest,
    profileImage: profileImage
      ? Utils.resolveFileUrl(req, profileImage)
      : null,
    roles: Array.isArray(roles)
      ? roles.map((r: any) => (r?.role?.title ?? r?.title ?? r))
      : [],
  };
}

async function getUserWithRoles(userId: number) {
  return prisma.user.findUnique({
    where: { id: userId },
    include: {
      roles: { include: { role: { select: { id: true, title: true } } } },
    },
  });
}

class AuthController {
  /**
   * POST /auth/register
   * Crée le compte (non vérifié) + envoie un OTP par email.
   * Body: { email, password, firstName?, lastName?, phoneNumber? }
   */
  static async register(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const { email, password, firstName, lastName, phoneNumber } = req.body as {
        email?: string;
        password?: string;
        firstName?: string;
        lastName?: string;
        phoneNumber?: string;
      };

      if (!email || !password) {
        return ApiResponse.error(res, null, "Email et mot de passe requis", 400);
      }

      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) {
        if (existing.isVerified) {
          return ApiResponse.error(
            res,
            null,
            "Un compte avec cet email existe déjà",
            409,
          );
        }
        // Compte non vérifié : on renvoie un nouvel OTP
        await createAndSendOtp(
          existing.id,
          existing.email,
          existing.firstName ?? undefined,
          "EMAIL_VERIFICATION",
        );
        return ApiResponse.success(
          res,
          { userId: existing.id, email: existing.email },
          "Un nouveau code de vérification vous a été envoyé",
          200,
        );
      }

      const hash = await bcrypt.hash(password, SALT_ROUNDS);
      const user = await prisma.user.create({
        data: {
          email,
          password: hash,
          firstName: firstName ?? null,
          lastName: lastName ?? null,
          phoneNumber: phoneNumber ?? null,
          isVerified: false,
        },
      });

      // Assigner le rôle CLIENT par défaut
      const clientRole = await prisma.role.findUnique({
        where: { title: "CLIENT" },
      });
      if (clientRole) {
        await prisma.userHasRoles.create({
          data: { userId: user.id, roleId: clientRole.id },
        });
      }

      await createAndSendOtp(
        user.id,
        user.email,
        user.firstName ?? undefined,
        "EMAIL_VERIFICATION",
      );

      return ApiResponse.success(
        res,
        { userId: user.id, email: user.email },
        "Compte créé. Un code de vérification a été envoyé par email.",
        201,
      );
    } catch (error) {
      console.error("[register]", error);
      next(error);
    }
  }

  /**
   * POST /auth/verify-email
   * Body: { userId, code }  → marque isVerified=true et renvoie un token.
   */
  static async verifyEmail(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const { userId, code } = req.body as { userId?: number; code?: string };
      if (!userId || !code) {
        return ApiResponse.error(res, null, "userId et code requis", 400);
      }

      const ok = await verifyOtp(+userId, code, "EMAIL_VERIFICATION");
      if (!ok) {
        return ApiResponse.error(res, null, "Code invalide ou expiré", 400);
      }

      const user = await prisma.user.update({
        where: { id: +userId },
        data: { isVerified: true },
      });

      const token = signToken(user.id);
      const full = await getUserWithRoles(user.id);
      return ApiResponse.success(
        res,
        { token, user: publicUser(req, full) },
        "Email vérifié avec succès",
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /auth/resend-otp
   * Body: { userId, type } — réenvoie un OTP (limit côté front pour éviter spam).
   */
  static async resendOtp(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const { userId, type } = req.body as {
        userId?: number;
        type?: "EMAIL_VERIFICATION" | "PASSWORD_RESET";
      };
      if (!userId || !type) {
        return ApiResponse.error(res, null, "userId et type requis", 400);
      }

      const user = await prisma.user.findUnique({ where: { id: +userId } });
      if (!user) {
        return ApiResponse.notFound(res, "Utilisateur introuvable");
      }

      await createAndSendOtp(
        user.id,
        user.email,
        user.firstName ?? undefined,
        type,
      );

      return ApiResponse.success(res, null, "Code renvoyé");
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /auth/login
   * Body: { email, password }
   */
  static async login(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const { email, password } = req.body as {
        email?: string;
        password?: string;
      };
      if (!email || !password) {
        return ApiResponse.error(res, null, "Email et mot de passe requis", 400);
      }

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return ApiResponse.error(res, null, "Email ou mot de passe incorrect", 401);
      }

      const ok = await bcrypt.compare(password, user.password);
      if (!ok) {
        return ApiResponse.error(res, null, "Email ou mot de passe incorrect", 401);
      }

      if (!user.isActive) {
        return ApiResponse.error(res, null, "Compte désactivé", 403);
      }

      // Si pas vérifié : on renvoie un OTP et on demande au front d'aller à l'écran OTP
      if (!user.isVerified) {
        await createAndSendOtp(
          user.id,
          user.email,
          user.firstName ?? undefined,
          "EMAIL_VERIFICATION",
        );
        return ApiResponse.error(
          res,
          { userId: user.id, requiresVerification: true },
          "Email non vérifié. Un code vous a été envoyé.",
          403,
        );
      }

      const token = signToken(user.id);
      const full = await getUserWithRoles(user.id);
      return ApiResponse.success(
        res,
        { token, user: publicUser(req, full) },
        "Connexion réussie",
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /auth/me — protégée par requireAuth
   */
  static async me(req: AuthenticatedRequest, res: express.Response) {
    if (!req.user) {
      return ApiResponse.error(res, null, "Non authentifié", 401);
    }
    const user = await getUserWithRoles(req.user.id);
    return ApiResponse.success(res, publicUser(req, user), "Profil");
  }

  /**
   * POST /auth/logout — invalidation côté client (clear localStorage).
   * (Pas de blacklist serveur pour rester simple ; le token expire seul.)
   */
  static async logout(_req: express.Request, res: express.Response) {
    res.clearCookie("token");
    return ApiResponse.success(res, null, "Déconnexion réussie");
  }

  /**
   * POST /auth/forgot-password
   * Body: { email }  → envoie un OTP de reset si le user existe.
   * (Toujours retourne success pour ne pas révéler l'existence de l'email.)
   */
  static async forgotPassword(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const { email } = req.body as { email?: string };
      if (!email) return ApiResponse.error(res, null, "Email requis", 400);

      const user = await prisma.user.findUnique({ where: { email } });
      if (user) {
        await createAndSendOtp(
          user.id,
          user.email,
          user.firstName ?? undefined,
          "PASSWORD_RESET",
        );
      }
      // Réponse identique que l'email existe ou non
      return ApiResponse.success(
        res,
        { userId: user?.id ?? null, email },
        "Si un compte existe, un code a été envoyé par email",
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /auth/reset-password
   * Body: { userId, code, newPassword }
   */
  static async resetPassword(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const { userId, code, newPassword } = req.body as {
        userId?: number;
        code?: string;
        newPassword?: string;
      };
      if (!userId || !code || !newPassword) {
        return ApiResponse.error(
          res,
          null,
          "userId, code et newPassword requis",
          400,
        );
      }
      if (newPassword.length < 6) {
        return ApiResponse.error(
          res,
          null,
          "Mot de passe trop court (min 6 caractères)",
          400,
        );
      }

      const ok = await verifyOtp(+userId, code, "PASSWORD_RESET");
      if (!ok) {
        return ApiResponse.error(res, null, "Code invalide ou expiré", 400);
      }

      const hash = await bcrypt.hash(newPassword, SALT_ROUNDS);
      const user = await prisma.user.update({
        where: { id: +userId },
        data: { password: hash },
      });

      const token = signToken(user.id);
      const full = await getUserWithRoles(user.id);
      return ApiResponse.success(
        res,
        { token, user: publicUser(req, full) },
        "Mot de passe réinitialisé",
      );
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
