import express from "express";
import { prisma } from "../models/index.js";
import ResponseHandler from "../helpers/responses.js";

class CartItemController {
  static async addItem(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const dataCartItem = req.body;
    try {
      let userId = req.user?.id || null;
      let sessionId = req.cookies?.sessionId || null; // cookies envoyés par le client

      // si aucun cookie → en créer un
      if (!sessionId) {
        sessionId = crypto.randomUUID();

        res.cookie("sessionId", sessionId, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 30, // 30 jours
        });
      }

      let cart = await prisma.cart.findFirst({
        where: {
          OR: [
            userId ? { userId } : undefined,
            sessionId ? { sessionId } : undefined,
          ].filter(Boolean) as any,

          status: "ACTIVE",
        },
      });

      // Si le panier n'existe pas je le crée
      if (!cart) {
        cart = await prisma.cart.create({
          data: {
            userId,
            sessionId,
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 jours
          },
        });
      }

      // S'il existe, alors je vérifie si un produit est déjà présent
      const existingItem = await prisma.cartItem.findUnique({
        where: {
          cartId_productId: {
            cartId: +cart.id,
            productId: +dataCartItem.productId,
          },
        },
      });

      // Si ce produit existe déjà  → update quantité
      if (existingItem) {
        await prisma.cartItem.update({
          where: {
            cartId_productId: {
              cartId: +cart.id,
              productId: +dataCartItem.productId,
            },
          },
          data: {
            quantity: existingItem.quantity + dataCartItem.quantity,
          },
        });
      } else {
        // Si ça n'existe pas alors je le crée (!existingItem)
        const product = await prisma.product.findUnique({
          where: {
            id: +dataCartItem.productId,
          },
        });

        if (!product) {
          throw new Error("Produit introuvable");
        }

        await prisma.cartItem.create({
          data: {
            cartId: +cart.id,
            productId: +dataCartItem.productId,
            quantity: +dataCartItem.quantity,
            unitPrice: product.price,
          },
        });
      }
      // Par la suite, je retourne le panier complet
      const cartReturn = await prisma.cart.findUnique({
        where: {
          id: +cart.id,
        },

        include: {
          item: {
            include: {
              product: true,
            },
          },
        },
      });
      return ResponseHandler.success(
        res,
        cartReturn,
        "Product successfully added to cart",
      );
    } catch (error: any) {
      console.log(error);
      next(error);
    }
  }
  static async updateItem(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const { productId } = req.params;
    console.log({ productId });
    const quantity = +req.body.quantity;
    try {
      const userId = req.user?.id || null;
      const sessionId = req.cookies?.sessionId || null;

      // 1. retrouver panier actif
      const cart = await prisma.cart.findFirst({
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

      // 2. vérifier item existant
      const existingItem = await prisma.cartItem.findUnique({
        where: {
          cartId_productId: {
            cartId: cart.id,
            productId: +productId!,
          },
        },
      });

      if (!existingItem) {
        return ResponseHandler.notFound(res, "Cart item not found");
      }

      // 3. update quantité
      const updatedItem = await prisma.cartItem.update({
        where: {
          cartId_productId: {
            cartId: cart.id,
            productId: +productId!,
          },
        },

        data: {
          quantity,
        },
      });

      return ResponseHandler.success(
        res,
        updatedItem,
        "CartItem updated successfully",
      );
    } catch (error: any) {
      console.log(error);
      next(error);
    }
  }
  static async removeItem(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const { productId } = req.params;
    console.log({ productId });
    try {
      const userId = req.user?.id || null;
      const sessionId = req.cookies?.sessionId || null;

      // 1. retrouver panier actif
      const cart = await prisma.cart.findFirst({
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

      // delete quantité
      const deletedItem = await prisma.cartItem.delete({
        where: {
          cartId_productId: {
            cartId: cart.id,
            productId: +productId!,
          },
        },
      });

      return ResponseHandler.success(
        res,
        deletedItem,
        "CartItem removed successfully",
      );
    } catch (error: any) {
      console.log(error);
      next(error);
    }
  }
}

export default CartItemController;
