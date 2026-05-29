import ResponseHandler from "../helpers/responses.js";
import { prisma } from "../models/index.js";
import express from "express";
import bcrypt from "bcrypt";
import Utils from "../helpers/Utils.js";
import type { UploadedFile } from "express-fileupload";
import type { AuthenticatedRequest } from "../middlewares/auth.middleware.js";
import type { User } from "@prisma/client";

const PUBLIC_USER_SELECT = {
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  phoneNumber: true,
  profileImage: true,
  isVerified: true,
  isActive: true,
  createdAt: true,
} as const;

type ApiUser = Omit<User, 'password' | 'userName' | 'responsable' | 'companyName' | 'updatedAt'>;

class UserController {
  static async getAll(
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const users = await prisma.user.findMany({
        select: PUBLIC_USER_SELECT,
        orderBy: { createdAt: "desc" },
      });

      const data = users.map((item: ApiUser) => {
        item.id = item.id;
        if (item.profileImage) {
          item.profileImage = Utils.resolveFileUrl(_req, item.profileImage);
          return item;
        } else {
          return item;
        }
      });

      return ResponseHandler.success(res, data, "Liste des utilisateurs");
    } catch (error: any) {
      next(error);
    }
  }

  /**
   * PUT /users/me — mise à jour du profil de l'utilisateur connecté.
   * Accepte multipart/form-data avec champ `profileImage` (fichier) optionnel.
   */
  static async updateMe(
    req: AuthenticatedRequest,
    res: express.Response,
    next: express.NextFunction,
  ) {
    if (!req.user) {
      return ResponseHandler.error(res, null, "Non authentifié", 401);
    }
    try {
      const { firstName, lastName, phoneNumber } = req.body as {
        firstName?: string;
        lastName?: string;
        phoneNumber?: string;
      };

      // Upload éventuel de la photo de profil
      const files = (req as any).files as
        | Record<string, UploadedFile | UploadedFile[]>
        | undefined;
      const photoFile = files?.profileImage;

      let profileImage: string | undefined;
      if (photoFile) {
        const f = Array.isArray(photoFile) ? photoFile[0] : photoFile;
        profileImage = (await Utils.saveFile(f, "users")) as string;
      }

      const data: Record<string, any> = {};
      if (firstName !== undefined) data.firstName = firstName;
      if (lastName !== undefined) data.lastName = lastName;
      if (phoneNumber !== undefined) data.phoneNumber = phoneNumber;
      if (profileImage) data.profileImage = profileImage;

      const updated = await prisma.user.update({
        where: { id: req.user.id },
        data,
        select: PUBLIC_USER_SELECT,
      });

      if (updated.profileImage) {
        // Cast vers express.Request : Utils.resolveFileUrl n'utilise que req.protocol/get('host'),
        // pas req.user. Le cast évite l'erreur de variance TS sur le type "user".
        updated.profileImage = Utils.resolveFileUrl(
          req as unknown as express.Request,
          updated.profileImage,
        );
      }

      return ResponseHandler.success(res, updated, "Profil mis à jour");
    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /users/me/password — changement de mot de passe (utilisateur connecté).
   * Body: { currentPassword, newPassword }
   */
  static async changePassword(
    req: AuthenticatedRequest,
    res: express.Response,
    next: express.NextFunction,
  ) {
    if (!req.user) {
      return ResponseHandler.error(res, null, "Non authentifié", 401);
    }
    try {
      const { currentPassword, newPassword } = req.body as {
        currentPassword?: string;
        newPassword?: string;
      };
      if (!currentPassword || !newPassword) {
        return ResponseHandler.error(
          res,
          null,
          "Mot de passe actuel et nouveau requis",
          400,
        );
      }
      if (newPassword.length < 6) {
        return ResponseHandler.error(
          res,
          null,
          "Nouveau mot de passe trop court (min 6)",
          400,
        );
      }

      const user = await prisma.user.findUnique({ where: { id: req.user.id } });
      if (!user) {
        return ResponseHandler.notFound(res, "Utilisateur introuvable");
      }

      const ok = await bcrypt.compare(currentPassword, user.password);
      if (!ok) {
        return ResponseHandler.error(
          res,
          null,
          "Mot de passe actuel incorrect",
          400,
        );
      }

      const hash = await bcrypt.hash(newPassword, 10);
      await prisma.user.update({
        where: { id: req.user.id },
        data: { password: hash },
      });

      return ResponseHandler.success(res, null, "Mot de passe modifié");
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
