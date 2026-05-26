import express from "express";
import { prisma } from "../models/index.js";
import ApiResponse from "../helpers/responses.js";
import type { AuthenticatedRequest } from "../middlewares/auth.middleware.js";

const ADDRESS_INCLUDE = {
  shippingZone: {
    include: {
      district: { include: { city: true } },
      neighborhood: true,
    },
  },
} as const;

class AddressController {
  /** GET /addresses — liste les adresses du user connecté */
  static async getMine(
    req: AuthenticatedRequest,
    res: express.Response,
    next: express.NextFunction,
  ) {
    if (!req.user) return ApiResponse.error(res, null, "Non authentifié", 401);
    try {
      const list = await prisma.address.findMany({
        where: { userId: req.user.id },
        include: ADDRESS_INCLUDE,
        orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
      });
      return ApiResponse.success(res, list, "Mes adresses");
    } catch (error) {
      next(error);
    }
  }

  /** POST /addresses — créer une adresse */
  static async create(
    req: AuthenticatedRequest,
    res: express.Response,
    next: express.NextFunction,
  ) {
    if (!req.user) return ApiResponse.error(res, null, "Non authentifié", 401);
    try {
      const { title, street, details, isDefault, shippingZoneId } = req.body as {
        title?: string;
        street?: string;
        details?: string;
        isDefault?: boolean;
        shippingZoneId?: number;
      };

      if (!title || !street || !shippingZoneId) {
        return ApiResponse.error(
          res,
          null,
          "title, street et shippingZoneId sont requis",
          400,
        );
      }

      // Vérifier que la zone existe et est active
      const zone = await prisma.shippingZone.findFirst({
        where: { id: +shippingZoneId, isActive: true },
      });
      if (!zone) {
        return ApiResponse.error(
          res,
          null,
          "Zone de livraison invalide ou inactive",
          400,
        );
      }

      // Si la nouvelle adresse est marquée par défaut, on retire le flag des autres
      if (isDefault) {
        await prisma.address.updateMany({
          where: { userId: req.user.id, isDefault: true },
          data: { isDefault: false },
        });
      }

      const address = await prisma.address.create({
        data: {
          title,
          street,
          details: details ?? null,
          isDefault: !!isDefault,
          userId: req.user.id,
          shippingZoneId: +shippingZoneId,
        },
        include: ADDRESS_INCLUDE,
      });

      return ApiResponse.success(res, address, "Adresse créée", 201);
    } catch (error) {
      next(error);
    }
  }

  /** PUT /addresses/:id — mettre à jour */
  static async update(
    req: AuthenticatedRequest,
    res: express.Response,
    next: express.NextFunction,
  ) {
    if (!req.user) return ApiResponse.error(res, null, "Non authentifié", 401);
    try {
      const id = +req.params.id!;
      const existing = await prisma.address.findFirst({
        where: { id, userId: req.user.id },
      });
      if (!existing) {
        return ApiResponse.notFound(res, "Adresse introuvable");
      }

      const { title, street, details, isDefault, shippingZoneId } = req.body as {
        title?: string;
        street?: string;
        details?: string | null;
        isDefault?: boolean;
        shippingZoneId?: number;
      };

      if (shippingZoneId !== undefined) {
        const zone = await prisma.shippingZone.findFirst({
          where: { id: +shippingZoneId, isActive: true },
        });
        if (!zone) {
          return ApiResponse.error(
            res,
            null,
            "Zone de livraison invalide ou inactive",
            400,
          );
        }
      }

      if (isDefault === true) {
        await prisma.address.updateMany({
          where: { userId: req.user.id, isDefault: true, NOT: { id } },
          data: { isDefault: false },
        });
      }

      const data: Record<string, any> = {};
      if (title !== undefined) data.title = title;
      if (street !== undefined) data.street = street;
      if (details !== undefined) data.details = details;
      if (isDefault !== undefined) data.isDefault = isDefault;
      if (shippingZoneId !== undefined) data.shippingZoneId = +shippingZoneId;

      const updated = await prisma.address.update({
        where: { id },
        data,
        include: ADDRESS_INCLUDE,
      });

      return ApiResponse.success(res, updated, "Adresse mise à jour");
    } catch (error) {
      next(error);
    }
  }

  /** DELETE /addresses/:id */
  static async delete(
    req: AuthenticatedRequest,
    res: express.Response,
    next: express.NextFunction,
  ) {
    if (!req.user) return ApiResponse.error(res, null, "Non authentifié", 401);
    try {
      const id = +req.params.id!;
      const existing = await prisma.address.findFirst({
        where: { id, userId: req.user.id },
      });
      if (!existing) {
        return ApiResponse.notFound(res, "Adresse introuvable");
      }
      await prisma.address.delete({ where: { id } });
      return ApiResponse.success(res, { id }, "Adresse supprimée");
    } catch (error) {
      next(error);
    }
  }
}

export default AddressController;
