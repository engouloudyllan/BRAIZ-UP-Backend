import express from "express";
import { prisma } from "../models/index.js";
import ApiResponse from "../helpers/responses.js";
import Utils from "../helpers/Utils.js";
import type { OrderStatus, paymentMethod, CustomerType } from "@prisma/client";
import type { UploadedFile } from "express-fileupload";

const ORDER_INCLUDE = {
  user: {
    select: { id: true, firstName: true, lastName: true, email: true, phoneNumber: true },
  },
  items: {
    include: {
      product: { select: { id: true, name: true, images: true } },
    },
  },
  shippingZone: true,
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
  shippingFee?: string;
  deliveryTime?: string;
  proximityAddress?: string;
  paymentMethod?: string;
  items?: string; // JSON string: [{productId: number, quantity: number}]
}

class OrderController {
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

  static async create(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const body = req.body as GuestOrderBody;
    const files = (req as any).files as Record<string, UploadedFile | UploadedFile[]> | undefined;
    const proofFile = files?.paymentProof;

    // ── Validation rapide ──────────────────────────────────────────────────
    const validPaymentMethods: paymentMethod[] = [
      "ORANGE_MONEY",
      "MTN_MOBILE_MONEY",
      "CASH_ON_DELIVERY",
    ];
    if (!body.paymentMethod || !validPaymentMethods.includes(body.paymentMethod as paymentMethod)) {
      return ApiResponse.error(res, null, "Moyen de paiement invalide", 400);
    }

    let parsedItems: { productId: number; quantity: number }[] = [];
    try {
      parsedItems = JSON.parse(body.items || "[]");
    } catch {
      return ApiResponse.error(res, null, "Format des articles invalide", 400);
    }

    if (!parsedItems.length) {
      return ApiResponse.error(res, null, "La commande doit contenir au moins un article", 400);
    }

    const customerType: CustomerType =
      body.customerType === "ENTREPRISE" ? "ENTREPRISE" : "PARTICULIER";
    const isDeliveryRequested = body.isDeliveryRequested === "true";

    try {
      // ── 1. Zone de livraison par défaut ──────────────────────────────────
      const defaultZone = await prisma.shippingZone.findFirst({
        where: { isActive: true },
      });
      if (!defaultZone) {
        return ApiResponse.error(res, null, "Aucune zone de livraison configurée", 500);
      }

      // ── 2. Vérifier les produits + calculer les totaux ───────────────────
      const productIds = parsedItems.map((i) => i.productId);
      const products = await prisma.product.findMany({
        where: { id: { in: productIds } },
      });

      let totalProducts = 0;
      const orderItemsData: { productId: number; quantity: number; unitPrice: number }[] = [];

      for (const item of parsedItems) {
        const product = products.find((p) => p.id === item.productId);
        if (!product) {
          return ApiResponse.error(res, null, `Produit introuvable : ID ${item.productId}`, 400);
        }
        totalProducts += product.price * item.quantity;
        orderItemsData.push({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: product.price,
        });
      }

      // ── 3. Frais de livraison ────────────────────────────────────────────
      const shippingFee = isDeliveryRequested
        ? parseFloat(body.shippingFee ?? "0") || defaultZone.fee
        : 0;
      const totalAmount = totalProducts + shippingFee;

      // ── 4. Preuve de paiement (upload) ───────────────────────────────────
      let paymentProofUrl = "";
      if (proofFile) {
        const file = Array.isArray(proofFile) ? proofFile[0] : proofFile;
        paymentProofUrl = (await Utils.saveFile(file, "orders")) as string;
      }

      // ── 5. Heure de livraison ────────────────────────────────────────────
      let deliveryDateTime: Date | null = null;
      if (isDeliveryRequested && body.deliveryTime) {
        // body.deliveryTime peut être "HH:MM" ou une ISO string
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

      // ── 6. Code ticket unique ────────────────────────────────────────────
      const codeTicket = `BRZ-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 6)
        .toUpperCase()}`;

      // ── 7. Création de la commande ───────────────────────────────────────
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
          proximityAddress: body.proximityAddress ?? null,
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
          shippingZoneId: defaultZone.id,
          items: {
            create: orderItemsData,
          },
        },
        include: ORDER_INCLUDE,
      });

      return ApiResponse.success(res, order, "Commande créée avec succès", 201);
    } catch (error) {
      console.error("[OrderController.create]", error);
      next(error);
    }
  }

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

      const order = await prisma.order.update({
        where: { id: +id! },
        data: { status },
        include: ORDER_INCLUDE,
      });
      return ApiResponse.success(res, order, "Order status updated");
    } catch (error) {
      next(error);
    }
  }

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
      return ApiResponse.success(res, order, "Order cancelled successfully");
    } catch (error) {
      next(error);
    }
  }
}

export default OrderController;
