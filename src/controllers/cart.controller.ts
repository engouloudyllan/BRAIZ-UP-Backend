import express from "express";
import { randomUUID } from "node:crypto";
import ApiResponse from "../helpers/responses.js";
import Utils from "../helpers/Utils.js";
import { prisma } from "../models/index.js";

const CART_INCLUDE = {
  item: {
    include: {
      product: {
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          images: true,
          isAvailable: true,
        },
      },
    },
  },
} as const;

const SESSION_COOKIE = "braizup_cart_sid";
const SESSION_HEADER = "x-session-id"; // Express lowercase les noms de headers
const CART_TTL_DAYS = 30;

function buildExpiresAt() {
  return new Date(Date.now() + CART_TTL_DAYS * 24 * 60 * 60 * 1000);
}

/**
 * Lit le sessionId du panier dans l'ordre :
 *  1. Header `X-Session-Id` (canal fiable, contourne les soucis cross-origin)
 *  2. Cookie `braizup_cart_sid` (fallback / source canonique si même origine)
 */
function readSessionId(req: express.Request): string | null {
  const fromHeader = req.headers[SESSION_HEADER];
  if (typeof fromHeader === "string" && fromHeader.trim()) {
    return fromHeader.trim();
  }
  const fromCookie = req.cookies?.[SESSION_COOKIE];
  return typeof fromCookie === "string" && fromCookie ? fromCookie : null;
}

/**
 * Récupère ou crée le panier pour le visiteur courant.
 *  - Si user connecté → cart lié à userId (auto-créé si inexistant)
 *  - Sinon → cart lié à sessionId (header OU cookie). Si rien, on en génère un
 *    qu'on renvoie via le header de réponse `X-Session-Id` (le front le persiste).
 */
async function getOrCreateCart(req: express.Request, res: express.Response) {
  const userId = req.user?.id ?? null;
  let sessionId: string | null = readSessionId(req);

  // ── Cas user connecté ────────────────────────────────────────────────
  if (userId) {
    let cart = await prisma.cart.findFirst({
      where: { userId, status: "ACTIVE" },
      include: CART_INCLUDE,
    });

    if (!cart) {
      // S'il existait un cart "guest" lié au cookie → on le transfère au user
      if (sessionId) {
        const guestCart = await prisma.cart.findFirst({
          where: { sessionId, status: "ACTIVE" },
        });
        if (guestCart) {
          cart = await prisma.cart.update({
            where: { id: guestCart.id },
            data: {
              userId,
              sessionId: null, // libère le sessionId
              expiresAt: buildExpiresAt(),
            },
            include: CART_INCLUDE,
          });
        }
      }

      if (!cart) {
        cart = await prisma.cart.create({
          data: {
            userId,
            expiresAt: buildExpiresAt(),
          },
          include: CART_INCLUDE,
        });
      }
    }
    return cart;
  }

  // ── Cas guest ────────────────────────────────────────────────────────
  if (!sessionId) {
    sessionId = randomUUID();
    // Cookie (fonctionne en same-origin)
    res.cookie(SESSION_COOKIE, sessionId, {
      httpOnly: false,
      sameSite: "lax",
      maxAge: CART_TTL_DAYS * 24 * 60 * 60 * 1000,
      path: "/",
    });
  }

  // TOUJOURS renvoyer le sessionId dans le header de réponse pour que le front
  // le persiste dans localStorage (fiable en cross-origin).
  res.setHeader("X-Session-Id", sessionId);
  res.setHeader("Access-Control-Expose-Headers", "X-Session-Id");

  let cart = await prisma.cart.findFirst({
    where: { sessionId, status: "ACTIVE" },
    include: CART_INCLUDE,
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { sessionId, expiresAt: buildExpiresAt() },
      include: CART_INCLUDE,
    });
  }

  return cart;
}

/** Hydrate les images en URLs absolues */
function shapeCart(req: express.Request, cart: any) {
  if (!cart) return null;
  return {
    id: cart.id,
    sessionId: cart.sessionId,
    userId: cart.userId,
    status: cart.status,
    expiresAt: cart.expiresAt,
    createdAt: cart.createdAt,
    updatedAt: cart.updatedAt,
    items: (cart.item ?? []).map((it: any) => ({
      productId: it.productId,
      cartId: it.cartId,
      quantity: it.quantity,
      unitPrice: it.unitPrice,
      createdAt: it.createdAt,
      updatedAt: it.updatedAt,
      product: it.product
        ? {
            ...it.product,
            images: Utils.resolveFileUrls(
              req,
              it.product.images as unknown as string | string[],
            ),
          }
        : null,
    })),
  };
}

class CartController {
  /** GET /cart — récupère/crée le panier courant et le retourne hydraté. */
  static async getCurrentCart(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const cart = await getOrCreateCart(req, res);
      return ApiResponse.success(res, shapeCart(req, cart), "Panier courant");
    } catch (error) {
      console.error("[cart.getCurrentCart]", error);
      next(error);
    }
  }

  /**
   * POST /cart/items — ajoute un produit (ou incrémente sa quantité).
   * Body: { productId, quantity? }  (quantity défaut = 1)
   */
  static async addItem(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const { productId, quantity } = req.body as {
        productId?: number;
        quantity?: number;
      };
      if (!productId) {
        return ApiResponse.error(res, null, "productId requis", 400);
      }
      const qty = Math.max(1, Number(quantity) || 1);

      const product = await prisma.product.findUnique({
        where: { id: +productId },
      });
      if (!product) {
        return ApiResponse.error(res, null, "Produit introuvable", 404);
      }
      if (!product.isAvailable) {
        return ApiResponse.error(res, null, "Produit indisponible", 400);
      }

      const cart = await getOrCreateCart(req, res);

      // Upsert (productId, cartId)
      const existing = await prisma.cartItem.findUnique({
        where: { cartId_productId: { cartId: cart.id, productId: +productId } },
      });

      if (existing) {
        await prisma.cartItem.update({
          where: {
            cartId_productId: { cartId: cart.id, productId: +productId },
          },
          data: {
            quantity: existing.quantity + qty,
            unitPrice: product.price, // refresh prix au cas où
          },
        });
      } else {
        await prisma.cartItem.create({
          data: {
            cartId: cart.id,
            productId: +productId,
            quantity: qty,
            unitPrice: product.price,
          },
        });
      }

      // Recharge le cart avec items
      const updated = await prisma.cart.findUnique({
        where: { id: cart.id },
        include: CART_INCLUDE,
      });
      return ApiResponse.success(res, shapeCart(req, updated), "Article ajouté");
    } catch (error) {
      console.error("[cart.addItem]", error);
      next(error);
    }
  }

  /**
   * PATCH /cart/items/:productId — change la quantité (qty <=0 → supprime).
   * Body: { quantity }
   */
  static async updateItem(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const productId = +(req.params.productId ?? 0);
      const { quantity } = req.body as { quantity?: number };
      if (!productId) {
        return ApiResponse.error(res, null, "productId requis", 400);
      }

      const cart = await getOrCreateCart(req, res);

      const qty = Number(quantity);
      if (!qty || qty <= 0) {
        // Suppression
        await prisma.cartItem
          .delete({
            where: { cartId_productId: { cartId: cart.id, productId } },
          })
          .catch(() => null);
      } else {
        await prisma.cartItem.update({
          where: { cartId_productId: { cartId: cart.id, productId } },
          data: { quantity: qty },
        });
      }

      const updated = await prisma.cart.findUnique({
        where: { id: cart.id },
        include: CART_INCLUDE,
      });
      return ApiResponse.success(res, shapeCart(req, updated), "Quantité mise à jour");
    } catch (error) {
      console.error("[cart.updateItem]", error);
      next(error);
    }
  }

  /** DELETE /cart/items/:productId — retire un article */
  static async removeItem(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const productId = +(req.params.productId ?? 0);
      if (!productId) {
        return ApiResponse.error(res, null, "productId requis", 400);
      }
      const cart = await getOrCreateCart(req, res);

      await prisma.cartItem
        .delete({
          where: { cartId_productId: { cartId: cart.id, productId } },
        })
        .catch(() => null);

      const updated = await prisma.cart.findUnique({
        where: { id: cart.id },
        include: CART_INCLUDE,
      });
      return ApiResponse.success(res, shapeCart(req, updated), "Article supprimé");
    } catch (error) {
      console.error("[cart.removeItem]", error);
      next(error);
    }
  }

  /** DELETE /cart — vide le panier */
  static async clearCart(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const cart = await getOrCreateCart(req, res);
      await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
      const updated = await prisma.cart.findUnique({
        where: { id: cart.id },
        include: CART_INCLUDE,
      });
      return ApiResponse.success(res, shapeCart(req, updated), "Panier vidé");
    } catch (error) {
      console.error("[cart.clearCart]", error);
      next(error);
    }
  }

  /**
   * POST /cart/merge — fusionne le panier guest (sessionId cookie) dans le panier user.
   * Appelé automatiquement après login pour ne pas perdre le panier de l'invité.
   * Si user pas connecté → no-op.
   */
  static async mergeGuestIntoUser(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return ApiResponse.success(res, null, "Pas d'utilisateur connecté, no-op");
      }
      const sessionId = req.cookies?.[SESSION_COOKIE];
      if (!sessionId) {
        const cart = await getOrCreateCart(req, res);
        return ApiResponse.success(res, shapeCart(req, cart), "Aucune session à fusionner");
      }

      // Récupérer les 2 carts
      const [userCart, guestCart] = await Promise.all([
        prisma.cart.findFirst({
          where: { userId, status: "ACTIVE" },
          include: { item: true },
        }),
        prisma.cart.findFirst({
          where: { sessionId, status: "ACTIVE" },
          include: { item: true },
        }),
      ]);

      if (!guestCart) {
        // Rien à fusionner
        const cart = userCart ?? (await getOrCreateCart(req, res));
        return ApiResponse.success(res, shapeCart(req, cart), "Pas de panier invité");
      }

      // Pas de userCart → on convertit le guestCart en userCart
      if (!userCart) {
        const promoted = await prisma.cart.update({
          where: { id: guestCart.id },
          data: { userId, sessionId: null, expiresAt: buildExpiresAt() },
          include: CART_INCLUDE,
        });
        // Clear cookie (optionnel)
        res.clearCookie(SESSION_COOKIE);
        return ApiResponse.success(res, shapeCart(req, promoted), "Panier invité transféré");
      }

      // Les 2 existent → on fusionne les items du guest dans le user (additionner les quantités)
      for (const guestItem of guestCart.item) {
        const existing = userCart.item.find(
          (it) => it.productId === guestItem.productId,
        );
        if (existing) {
          await prisma.cartItem.update({
            where: {
              cartId_productId: {
                cartId: userCart.id,
                productId: guestItem.productId,
              },
            },
            data: { quantity: existing.quantity + guestItem.quantity },
          });
        } else {
          await prisma.cartItem.create({
            data: {
              cartId: userCart.id,
              productId: guestItem.productId,
              quantity: guestItem.quantity,
              unitPrice: guestItem.unitPrice,
            },
          });
        }
      }

      // Supprimer le guestCart (cascade sur cartItem)
      await prisma.cart.delete({ where: { id: guestCart.id } });
      res.clearCookie(SESSION_COOKIE);

      const finalCart = await prisma.cart.findUnique({
        where: { id: userCart.id },
        include: CART_INCLUDE,
      });
      return ApiResponse.success(res, shapeCart(req, finalCart), "Paniers fusionnés");
    } catch (error) {
      console.error("[cart.mergeGuestIntoUser]", error);
      next(error);
    }
  }
}

export default CartController;
