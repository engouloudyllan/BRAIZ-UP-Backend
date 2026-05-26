import express from "express";
import jwt from "jsonwebtoken";
import env from "../config/env.js";
import ApiResponse from "../helpers/responses.js";
import { prisma } from "../models/index.js";

/**
 * On omet `user` du Request original (déclaré globalement comme Prisma `User` complet,
 * password inclus, dans src/Types/index.d.ts) puis on le redéclare avec un shape "safe"
 * sans password. Empêche le conflit TS et évite tout risque de fuite du mot de passe.
 */
export interface AuthenticatedRequest extends Omit<express.Request, "user"> {
  user?: {
    id: number;
    email: string;
    firstName: string | null;
    lastName: string | null;
    phoneNumber: string | null;
    profileImage: string | null;
    isVerified: boolean;
  };
}

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
    };
    next();
  } catch (err: any) {
    return ApiResponse.error(res, null, "Token invalide ou expiré", 401);
  }
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
      };
    }
  } catch {
    /* ignore — route reste accessible sans user */
  }
  next();
}
