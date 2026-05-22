import express from "express";
import ResponseHandler from "../helpers/responses.js";
import { prisma } from "../models/index.js";

class CartController {
  static async getCurrentCart(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      let userId = req.user?.id || null;
      let sessionId = req.cookies?.sessionId || null; // cookies envoyés par le client

      let cart = await prisma.cart.findFirst({
        where: {
          OR: [
            userId ? { userId } : undefined,
            sessionId ? { sessionId } : undefined,
          ].filter(Boolean) as any,

          status: "ACTIVE",
        },
      });
      if (!cart) {
        return ResponseHandler.notFound(res, "Cart not found");
      }
      return ResponseHandler.success(res, cart, "Panier reconnu avec succès");
    } catch (error: any) {
      console.log(error);
      next(error);
    }
  }
}

export default CartController;
