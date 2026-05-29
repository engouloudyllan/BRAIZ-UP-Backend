import express from "express";
import jwt from "jsonwebtoken";
import env from "../config/env.js";
import ApiResponse from "../helpers/responses.js";
import { prisma } from "../models/index.js";

/**
 * `AuthenticatedRequest` est désormais un simple alias de `express.Request`.
 * La forme exacte de `req.user` (sans password, avec roles[]) est déclarée
 * une seule fois globalement dans src/Types/index.d.ts.
 *
 * Garder l'alias permet de :
 *  - Documenter qu'un handler attend un user authentifié
 *  - Ne rien casser dans les imports existants
 */
export type AuthenticatedRequest = express.Request;

/**
 * Middleware d'authentification.
 * Lit le token JWT depuis le header Authorization: "Bearer xxx"
 * ou depuis le cookie "token".
 * Ajoute req.user si valide. Renvoie 401 sinon.
 */
export async function requireAuth(
  req: AuthenticatedRequest,
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    const auth = req.headers.authorization;
    let token: string | null = null;

    if (auth?.startsWith("Bearer ")) {
      token = auth.slice(7);
    } else if (req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return ApiResponse.error(res, null, "Token manquant", 401);
    }

    const payload = jwt.verify(token, env.jwtSecret) as { userId: number };
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        profileImage: true,
        isVerified: true,
        isActive: true,
        roles: { include: { role: { select: { title: true } } } },
      },
    });

    if (!user || !user.isActive) {
      return ApiResponse.error(res, null, "Utilisateur introuvable ou inactif", 401);
    }

    req.user = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      profileImage: user.profileImage,
      isVerified: user.isVerified,
      roles: user.roles.map((r) => r.role.title),
    };
    next();
  } catch (err: any) {
    return ApiResponse.error(res, null, "Token invalide ou expiré", 401);
  }
}

/**
 * Middleware exige au moins UN des rôles passés. Utilisation :
 *   router.delete("/:id", requireAuth, requireRole("ADMIN"), Ctrl.delete)
 *   router.patch("/:id/status", requireAuth, requireRole("ADMIN", "ORDER_MANAGER"), Ctrl.x)
 */
export function requireRole(...allowedRoles: string[]) {
  return (
    req: AuthenticatedRequest,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    if (!req.user) {
      return ApiResponse.error(res, null, "Non authentifié", 401);
    }
    const has = req.user.roles.some((r) => allowedRoles.includes(r));
    if (!has) {
      return ApiResponse.error(
        res,
        null,
        `Accès refusé. Rôle requis : ${allowedRoles.join(" ou ")}`,
        403,
      );
    }
    next();
  };
}

/**
 * Optionnel : si token valide, on attache req.user.
 * Sinon, on continue sans erreur (route publique avec contexte user éventuel).
 */
export async function optionalAuth(
  req: AuthenticatedRequest,
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    const auth = req.headers.authorization;
    let token: string | null = null;
    if (auth?.startsWith("Bearer ")) token = auth.slice(7);
    else if (req.cookies?.token) token = req.cookies.token;

    if (!token) return next();

    const payload = jwt.verify(token, env.jwtSecret) as { userId: number };
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        profileImage: true,
        isVerified: true,
        isActive: true,
        roles: { include: { role: { select: { title: true } } } },
      },
    });

    if (user?.isActive) {
      req.user = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        profileImage: user.profileImage,
        isVerified: user.isVerified,
        roles: user.roles.map((r) => r.role.title),
      };
    }
  } catch {
    /* ignore — route reste accessible sans user */
  }
  next();
}
