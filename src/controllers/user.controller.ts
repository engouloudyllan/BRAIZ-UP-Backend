import ResponseHandler from "../helpers/responses.js";
import { prisma } from "../models/index.js";
import express from "express";
import bcrypt from "bcrypt";
import Utils from "../helpers/Utils.js";
import type { UploadedFile } from "express-fileupload";
import type { AuthenticatedRequest } from "../middlewares/auth.middleware.js";
import type { Prisma } from "@prisma/client";

const PUBLIC_USER_SELECT = {
  id: true,
  email: true,
  userName: true,
  firstName: true,
  lastName: true,
  phoneNumber: true,
  profileImage: true,
  isVerified: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
  roles: {
    include: {
      role: { select: { id: true, title: true, description: true } },
    },
  },
} as const;

function shapeUser(req: express.Request, u: any) {
  if (u?.profileImage) {
    u.profileImage = Utils.resolveFileUrl(req, u.profileImage);
  }
  if (Array.isArray(u?.roles)) {
    u.rolesList = u.roles.map((r: any) => r.role);
  }
  return u;
}

class UserController {
  /** GET /users — liste paginée + recherche + filtre rôle/actif (admin) */
  static async getAll(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const {
        page,
        limit,
        search,
        role,
        active,
      } = req.query as Record<string, string | undefined>;

      const take = limit ? Math.max(1, Math.min(100, +limit)) : 0;
      const _page = page ? Math.max(1, +page) : 1;
      const skip = take ? (_page - 1) * take : 0;

      const where: Prisma.UserWhereInput = {};
      if (search?.trim()) {
        const s = search.trim();
        where.OR = [
          { email: { contains: s } },
          { firstName: { contains: s } },
          { lastName: { contains: s } },
          { userName: { contains: s } },
          { phoneNumber: { contains: s } },
        ];
      }
      if (active === "true") where.isActive = true;
      if (active === "false") where.isActive = false;
      if (role?.trim()) {
        where.roles = { some: { role: { title: role.trim() } } };
      }

      const users = await prisma.user.findMany({
        where,
        select: PUBLIC_USER_SELECT,
        orderBy: { createdAt: "desc" },
        ...(take ? { take, skip } : {}),
      });

      const shaped = users.map((u) => shapeUser(req, u));

      if (take) {
        const totalItems = await prisma.user.count({ where });
        return ResponseHandler.success(
          res,
          {
            data: shaped,
            pagination: {
              limit: take,
              currentPage: _page,
              previousPage: _page > 1 ? _page - 1 : null,
              nextPage: _page * take >= totalItems ? null : _page + 1,
              totalItem: totalItems,
              totalPage: Math.ceil(totalItems / take),
            },
          },
          "Liste des utilisateurs",
        );
      }

      return ResponseHandler.success(res, shaped, "Liste des utilisateurs");
    } catch (error) {
      next(error);
    }
  }

  /** GET /users/:id — détail */
  static async getById(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const { id } = req.params;
    try {
      const user = await prisma.user.findUnique({
        where: { id: +id! },
        select: PUBLIC_USER_SELECT,
      });
      if (!user) {
        return ResponseHandler.notFound(res, "Utilisateur introuvable");
      }
      return ResponseHandler.success(res, shapeUser(req, user), "Utilisateur");
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /users — création par un admin
   * Body: { email, userName?, firstName?, lastName?, phoneNumber?, password, roleTitles?: string[] }
   */
  static async create(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const {
        email,
        userName,
        firstName,
        lastName,
        phoneNumber,
        password,
        roleTitles,
      } = req.body as {
        email?: string;
        userName?: string;
        firstName?: string;
        lastName?: string;
        phoneNumber?: string;
        password?: string;
        roleTitles?: string[];
      };

      if (!email?.trim() || !password?.trim()) {
        return ResponseHandler.error(
          res,
          null,
          "Email et mot de passe requis",
          400,
        );
      }

      const exists = await prisma.user.findUnique({ where: { email } });
      if (exists) {
        return ResponseHandler.error(res, null, "Cet email existe déjà", 409);
      }

      const hash = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          email: email.trim(),
          password: hash,
          userName: userName?.trim() || null,
          firstName: firstName?.trim() || null,
          lastName: lastName?.trim() || null,
          phoneNumber: phoneNumber?.trim() || null,
          isVerified: true, // créé par admin → vérifié d'office
        },
      });

      // Assigner les rôles si fournis
      if (Array.isArray(roleTitles) && roleTitles.length) {
        const roles = await prisma.role.findMany({
          where: { title: { in: roleTitles } },
          select: { id: true },
        });
        if (roles.length) {
          await prisma.userHasRoles.createMany({
            data: roles.map((r) => ({ userId: user.id, roleId: r.id })),
            skipDuplicates: true,
          });
        }
      } else {
        // Pas de rôle → assigner CLIENT par défaut
        const client = await prisma.role.findFirst({
          where: { title: "CLIENT" },
        });
        if (client) {
          await prisma.userHasRoles.create({
            data: { userId: user.id, roleId: client.id },
          });
        }
      }

      const created = await prisma.user.findUnique({
        where: { id: user.id },
        select: PUBLIC_USER_SELECT,
      });
      return ResponseHandler.success(
        res,
        shapeUser(req, created),
        "Utilisateur créé",
        201,
      );
    } catch (error) {
      next(error);
    }
  }

  /** PUT /users/:id — édition par admin */
  static async update(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const { id } = req.params;
    try {
      const existing = await prisma.user.findUnique({
        where: { id: +id! },
      });
      if (!existing) {
        return ResponseHandler.notFound(res, "Utilisateur introuvable");
      }

      const {
        email,
        userName,
        firstName,
        lastName,
        phoneNumber,
        password,
      } = req.body as Record<string, string | undefined>;

      const data: Record<string, any> = {};
      if (email !== undefined) data.email = email.trim();
      if (userName !== undefined) data.userName = userName.trim() || null;
      if (firstName !== undefined) data.firstName = firstName.trim() || null;
      if (lastName !== undefined) data.lastName = lastName.trim() || null;
      if (phoneNumber !== undefined)
        data.phoneNumber = phoneNumber.trim() || null;
      if (password?.trim()) {
        data.password = await bcrypt.hash(password, 10);
      }

      const updated = await prisma.user.update({
        where: { id: +id! },
        data,
        select: PUBLIC_USER_SELECT,
      });

      return ResponseHandler.success(
        res,
        shapeUser(req, updated),
        "Utilisateur mis à jour",
      );
    } catch (error) {
      next(error);
    }
  }

  /** PATCH /users/:id/active — toggle actif (admin) */
  static async toggleActive(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const { id } = req.params;
    const { isActive } = req.body as { isActive?: boolean };
    try {
      const existing = await prisma.user.findUnique({ where: { id: +id! } });
      if (!existing) {
        return ResponseHandler.notFound(res, "Utilisateur introuvable");
      }
      const newValue =
        typeof isActive === "boolean" ? isActive : !existing.isActive;

      const updated = await prisma.user.update({
        where: { id: +id! },
        data: { isActive: newValue },
        select: PUBLIC_USER_SELECT,
      });

      return ResponseHandler.success(
        res,
        shapeUser(req, updated),
        newValue ? "Utilisateur activé" : "Utilisateur désactivé",
      );
    } catch (error) {
      next(error);
    }
  }

  /** PUT /users/:id/roles — remplace les rôles du user par roleTitles[] */
  static async assignRoles(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const { id } = req.params;
    const { roleTitles } = req.body as { roleTitles?: string[] };
    if (!Array.isArray(roleTitles)) {
      return ResponseHandler.error(res, null, "roleTitles[] requis", 400);
    }
    try {
      const userId = +id!;
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        return ResponseHandler.notFound(res, "Utilisateur introuvable");
      }

      const roles = await prisma.role.findMany({
        where: { title: { in: roleTitles } },
        select: { id: true },
      });

      // Replace rôles existants
      await prisma.userHasRoles.deleteMany({ where: { userId } });
      if (roles.length) {
        await prisma.userHasRoles.createMany({
          data: roles.map((r) => ({ userId, roleId: r.id })),
        });
      }

      const updated = await prisma.user.findUnique({
        where: { id: userId },
        select: PUBLIC_USER_SELECT,
      });
      return ResponseHandler.success(
        res,
        shapeUser(req, updated),
        "Rôles mis à jour",
      );
    } catch (error) {
      next(error);
    }
  }

  /** DELETE /users/:id (admin) */
  static async delete(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const { id } = req.params;
    try {
      const existing = await prisma.user.findUnique({ where: { id: +id! } });
      if (!existing) {
        return ResponseHandler.notFound(res, "Utilisateur introuvable");
      }
      await prisma.user.delete({ where: { id: +id! } });
      return ResponseHandler.success(res, { id: +id! }, "Utilisateur supprimé");
    } catch (error: any) {
      // FK constraint si l'user a des commandes/adresses → 409
      if (error?.code === "P2003") {
        return ResponseHandler.error(
          res,
          null,
          "Impossible de supprimer : cet utilisateur a des données liées (commandes, adresses). Désactivez-le plutôt.",
          409,
        );
      }
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
        updated.profileImage = Utils.resolveFileUrl(req, updated.profileImage);
      }

      return ResponseHandler.success(
        res,
        shapeUser(req, updated),
        "Profil mis à jour",
      );
    } catch (error) {
      next(error);
    }
  }

  /** PUT /users/me/password */
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
