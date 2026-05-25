import express from "express";
import { prisma } from "../models/index.js";
import ApiResponse from "../helpers/responses.js";
import Utils from "../helpers/Utils.js";
import type { OrderStatus, paymentMethod, CustomerType } from "@prisma/client";
import type { UploadedFile } from "express-fileupload";
import {
  notifyOrderInitiated,
  notifyStatusChanged,
} from "../services/notification.service.js";

const ORDER_INCLUDE = {
  user: {
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phoneNumber: true,
    },
  },
  items: {
    include: {
      product: { select: { id: true, name: true, images: true } },
    },
  },
  shippingZone: {
    include: {
      district: { include: { city: true } },
      neighborhood: true,
    },
  },
} as const;

interface GuestOrderBody {
  customerType?: string;
  guestName?: string;
  guestSurname?: string;
  guestCompanyName?: string;
  guestResponsable?: string;
  guestPhone?: string;
  guestEmail?: string;
  guestCity?: string;
  isDeliveryRequested?: string;
  shippingAddress?: string;
  shippingZoneId?: string; // ← envoyé par le frontend
  proximityAddress?: string; // ← adresse approximative tapée par le client
  deliveryTime?: string;
  paymentMethod?: string;
  items?: string; // JSON: [{productId, quantity}]
}

class OrderController {
  // ── GET / ────────────────────────────────────────────────────────────
  static async getAll(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const orders = await prisma.order.findMany({
        include: ORDER_INCLUDE,
        orderBy: { createdAt: "desc" },
      });
      return ApiResponse.success(res, orders, "Order list");
    } catch (error) {
      next(error);
    }
  }

  // ── GET /:id ─────────────────────────────────────────────────────────
  static async getById(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const { id } = req.params;
    try {
      const order = await prisma.order.findFirst({
        where: { id: +id! },
        include: { ...ORDER_INCLUDE, Address: true },
      });
      if (!order) {
        return ApiResponse.notFound(res, `Order not found with ID: ${id}`);
      }
      return ApiResponse.success(res, order, "Order retrieved successfully");
    } catch (error) {
      next(error);
    }
  }

  // ── GET /track/:token ────────────────────────────────────────────────
  // Route publique pour suivi client (pas d'auth requise).
  static async getByTrackingToken(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const token = String(req.params.token ?? "");
    if (!token) {
      return ApiResponse.error(res, null, "Token manquant", 400);
    }
    try {
      const order = await prisma.order.findFirst({
        where: { trackingToken: token },
        include: ORDER_INCLUDE,
      });
      if (!order) {
        return ApiResponse.notFound(
          res,
          `Aucune commande trouvée avec ce token.`,
        );
      }
      return ApiResponse.success(res, order, "Tracking info");
    } catch (error) {
      next(error);
    }
  }

  // ── POST / ───────────────────────────────────────────────────────────
  static async create(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const body = req.body as GuestOrderBody;
    const files = (req as any).files as
      | Record<string, UploadedFile | UploadedFile[]>
      | undefined;
    const proofFile = files?.paymentProof;

    // ── Validation ──────────────────────────────────────────────────────
    const validPaymentMethods: paymentMethod[] = [
      "ORANGE_MONEY",
      "MTN_MOBILE_MONEY",
      "CASH_ON_DELIVERY",
    ];
    if (
      !body.paymentMethod ||
      !validPaymentMethods.includes(body.paymentMethod as paymentMethod)
    ) {
      return ApiResponse.error(res, null, "Moyen de paiement invalide", 400);
    }

    let parsedItems: { productId: number; quantity: number }[] = [];
    try {
      parsedItems = JSON.parse(body.items || "[]");
    } catch {
      return ApiResponse.error(res, null, "Format des articles invalide", 400);
    }
    if (!parsedItems.length) {
      return ApiResponse.error(
        res,
        null,
        "La commande doit contenir au moins un article",
        400,
      );
    }

    const customerType: CustomerType =
      body.customerType === "ENTREPRISE" ? "ENTREPRISE" : "PARTICULIER";
    const isDeliveryRequested = body.isDeliveryRequested === "true";

    try {
      // ── 1. Choisir la zone de livraison ──────────────────────────────
      let zone: { id: number; fee: number } | null = null;

      if (body.shippingZoneId) {
        zone = await prisma.shippingZone.findFirst({
          where: { id: +body.shippingZoneId, isActive: true },
          select: { id: true, fee: true },
        });
      }

      // Fallback : prendre la première zone active si aucune n'est fournie
      if (!zone) {
        zone = await prisma.shippingZone.findFirst({
          where: { isActive: true },
          select: { id: true, fee: true },
        });
      }

      if (!zone) {
        return ApiResponse.error(
          res,
          null,
          "Aucune zone de livraison configurée",
          500,
        );
      }

      // ── 2. Produits + totaux ──────────────────────────────────────────
      const productIds = parsedItems.map((i) => i.productId);
      const products = await prisma.product.findMany({
        where: { id: { in: productIds } },
      });

      let totalProducts = 0;
      const orderItemsData: {
        productId: number;
        quantity: number;
        unitPrice: number;
      }[] = [];

      for (const item of parsedItems) {
        const product = products.find((p) => p.id === item.productId);
        if (!product) {
          return ApiResponse.error(
            res,
            null,
            `Produit introuvable : ID ${item.productId}`,
            400,
          );
        }
        totalProducts += product.price * item.quantity;
        orderItemsData.push({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: product.price,
        });
      }

      // ── 3. Frais de livraison (depuis la zone réelle) ─────────────────
      const shippingFee = isDeliveryRequested ? zone.fee : 0;
      const totalAmount = totalProducts + shippingFee;

      // ── 4. Preuve de paiement (upload) ────────────────────────────────
      let paymentProofUrl = "";
      if (proofFile) {
        const file = Array.isArray(proofFile) ? proofFile[0] : proofFile;
        paymentProofUrl = (await Utils.saveFile(file, "orders")) as string;
      }

      // ── 5. Heure de livraison ─────────────────────────────────────────
      let deliveryDateTime: Date | null = null;
      if (isDeliveryRequested && body.deliveryTime) {
        if (body.deliveryTime.includes("T")) {
          deliveryDateTime = new Date(body.deliveryTime);
        } else {
          const today = new Date();
          const [h, m] = body.deliveryTime.split(":").map(Number);
          deliveryDateTime = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
            h,
            m,
          );
        }
      }

      // ── 6. Code ticket unique ─────────────────────────────────────────
      const codeTicket = `BRZ-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 6)
        .toUpperCase()}`;

      // ── 7. Création ───────────────────────────────────────────────────
      const order = await prisma.order.create({
        data: {
          codeTicket,
          totalProducts,
          shippingFee,
          shippingAddress: body.shippingAddress ?? "",
          paymentProofUrl,
          totalAmount,
          isDeliveryRequested,
          deliveryTime: deliveryDateTime,
          proximityAddress: body.proximityAddress?.trim() || null,
          status: "EN_PRECOMMANDE",
          paymentMethod: body.paymentMethod as paymentMethod,
          customerType,
          guestName: body.guestName ?? null,
          guestSurname: body.guestSurname ?? null,
          guestCompanyName: body.guestCompanyName ?? null,
          guestResponsable: body.guestResponsable ?? null,
          guestPhone: body.guestPhone ?? null,
          guestEmail: body.guestEmail ?? null,
          guestCity: body.guestCity ?? null,
          shippingZoneId: zone.id,
          items: { create: orderItemsData },
        },
        include: ORDER_INCLUDE,
      });

      // ── 8. Notifications (fire & forget) ─────────────────────────────
      notifyOrderInitiated(order).catch(() => {});

      return ApiResponse.success(
        res,
        order,
        "Commande créée avec succès",
        201,
      );
    } catch (error) {
      console.error("[OrderController.create]", error);
      next(error);
    }
  }

  // ── PATCH /:id/status ────────────────────────────────────────────────
  static async updateStatusOrder(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const { id } = req.params;
    const { status } = req.body as { status: OrderStatus };

    const validStatuses: OrderStatus[] = [
      "EN_PRECOMMANDE",
      "EN_COURS_DE_PREPARATION",
      "PRÊTE",
      "EN_LIVRAISON",
      "LIVRÉE",
      "ANNULÉE",
    ];
    if (!status || !validStatuses.includes(status)) {
      return ApiResponse.error(res, null, `Invalid status: ${status}`, 400);
    }

    try {
      const existing = await prisma.order.findFirst({ where: { id: +id! } });
      if (!existing) {
        return ApiResponse.notFound(res, `Order not found with ID: ${id}`);
      }

      // Champs timestamps automatiques selon le statut
      const ts: Record<string, Date | undefined> = {};
      if (status === "EN_COURS_DE_PREPARATION" && !existing.preparingAt) ts.preparingAt = new Date();
      if (status === "PRÊTE" && !existing.readyAt) ts.readyAt = new Date();
      if (status === "LIVRÉE" && !existing.deliveredAt) ts.deliveredAt = new Date();

      const order = await prisma.order.update({
        where: { id: +id! },
        data: { status, ...ts },
        include: ORDER_INCLUDE,
      });

      // Notification client
      notifyStatusChanged(order, status).catch(() => {});

      return ApiResponse.success(res, order, "Order status updated");
    } catch (error) {
      next(error);
    }
  }

  // ── PATCH /:id/cancel ────────────────────────────────────────────────
  static async cancelOrder(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const { id } = req.params;
    try {
      const existing = await prisma.order.findFirst({ where: { id: +id! } });
      if (!existing) {
        return ApiResponse.notFound(res, `Order not found with ID: ${id}`);
      }
      if (existing.status === "ANNULÉE") {
        return ApiResponse.error(res, null, "Order is already cancelled", 400);
      }

      const order = await prisma.order.update({
        where: { id: +id! },
        data: { status: "ANNULÉE" },
        include: ORDER_INCLUDE,
      });

      notifyStatusChanged(order, "ANNULÉE").catch(() => {});

      return ApiResponse.success(res, order, "Order cancelled successfully");
    } catch (error) {
      next(error);
    }
  }
}

export default OrderController;
