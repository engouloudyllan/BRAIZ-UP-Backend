import express from "express";
import { prisma } from "../models/index.js";
import ApiResponse from "../helpers/responses.js";
import type { Prisma } from "@prisma/client";

const ROLE_INCLUDE = {
  permissions: {
    include: {
      permission: {
        select: { id: true, title: true, description: true },
      },
    },
  },
  _count: { select: { users: true } },
} as const;

function shapeRole(role: any) {
  return {
    id: role.id,
    title: role.title,
    description: role.description,
    createdAt: role.createdAt,
    updatedAt: role.updatedAt,
    usersCount: role._count?.users ?? 0,
    permissions:
      role.permissions?.map((p: any) => p.permission) ?? [],
  };
}

class RoleController {
  /** GET /roles */
  static async getAll(
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const roles = await prisma.role.findMany({
        include: ROLE_INCLUDE,
        orderBy: { title: "asc" },
      });
      return ApiResponse.success(res, roles.map(shapeRole), "Liste des rôles");
    } catch (err) {
      next(err);
    }
  }

  /** GET /roles/:id */
  static async getById(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const { id } = req.params;
    try {
      const role = await prisma.role.findUnique({
        where: { id: +id! },
        include: ROLE_INCLUDE,
      });
      if (!role) return ApiResponse.notFound(res, "Rôle introuvable");
      return ApiResponse.success(res, shapeRole(role), "Rôle");
    } catch (err) {
      next(err);
    }
  }

  /** POST /roles  { title, description?, permissionIds?: number[] } */
  static async create(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const { title, description, permissionIds } = req.body as {
      title?: string;
      description?: string;
      permissionIds?: number[];
    };
    if (!title?.trim()) {
      return ApiResponse.error(res, null, "Titre requis", 400);
    }
    try {
      const role = await prisma.role.create({
        data: {
          title: title.trim().toUpperCase(),
          description: description?.trim() || null,
        },
      });
      if (Array.isArray(permissionIds) && permissionIds.length) {
        await prisma.roleHasPermissions.createMany({
          data: permissionIds.map((pid) => ({ roleId: role.id, permissionId: pid })),
          skipDuplicates: true,
        });
      }
      const full = await prisma.role.findUnique({
        where: { id: role.id },
        include: ROLE_INCLUDE,
      });
      return ApiResponse.success(res, shapeRole(full), "Rôle créé", 201);
    } catch (err: any) {
      if (err?.code === "P2002") {
        return ApiResponse.error(res, null, "Ce rôle existe déjà", 409);
      }
      next(err);
    }
  }

  /** PUT /roles/:id  { title?, description?, permissionIds?: number[] } */
  static async update(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const { id } = req.params;
    const { title, description, permissionIds } = req.body as {
      title?: string;
      description?: string;
      permissionIds?: number[];
    };
    try {
      const existing = await prisma.role.findUnique({ where: { id: +id! } });
      if (!existing) return ApiResponse.notFound(res, "Rôle introuvable");

      const data: Prisma.RoleUpdateInput = {};
      if (title !== undefined) data.title = title.trim().toUpperCase();
      if (description !== undefined)
        data.description = description?.trim() || null;

      await prisma.role.update({ where: { id: +id! }, data });

      // Si permissionIds fourni → replace
      if (Array.isArray(permissionIds)) {
        await prisma.roleHasPermissions.deleteMany({
          where: { roleId: +id! },
        });
        if (permissionIds.length) {
          await prisma.roleHasPermissions.createMany({
            data: permissionIds.map((pid) => ({
              roleId: +id!,
              permissionId: pid,
            })),
          });
        }
      }

      const full = await prisma.role.findUnique({
        where: { id: +id! },
        include: ROLE_INCLUDE,
      });
      return ApiResponse.success(res, shapeRole(full), "Rôle mis à jour");
    } catch (err) {
      next(err);
    }
  }

  /** DELETE /roles/:id */
  static async delete(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const { id } = req.params;
    try {
      const existing = await prisma.role.findUnique({
        where: { id: +id! },
        include: { _count: { select: { users: true } } },
      });
      if (!existing) return ApiResponse.notFound(res, "Rôle introuvable");
      if (existing._count.users > 0) {
        return ApiResponse.error(
          res,
          null,
          `Impossible de supprimer : ${existing._count.users} utilisateur(s) utilisent ce rôle.`,
          409,
        );
      }
      await prisma.role.delete({ where: { id: +id! } });
      return ApiResponse.success(res, { id: +id! }, "Rôle supprimé");
    } catch (err) {
      next(err);
    }
  }
}

export default RoleController;
