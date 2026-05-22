import * as Yup from "yup";
import { prisma } from "../models/index.js";

// 1. Validation pour l'ajout d'un produit au panier
export const addCartItemSchema = Yup.object({
  cartId: Yup.number()
    .typeError("L'ID du panier doit être un nombre")
    .optional(),

  productId: Yup.number()
    .typeError("L'ID du produit doit être un nombre")
    .required("L'ID du produit est requis")
    .test(
      "productExists",
      "Ce produit n'existe pas ou n'est plus disponible",
      async (value) => {
        if (!value) return false;
        // On vérifie que le produit existe en base avant de l'ajouter
        const count = await prisma.product.count({ where: { id: value } });
        return count > 0;
      },
    ),

  quantity: Yup.number()
    .typeError("La quantité doit être un nombre")
    .required("La quantité est requise")
    .integer("La quantité doit être un entier")
    .min(1, "La quantité minimum est de 1"),

  unitPrice: Yup.number().required(),
});

// 2. Validation pour la mise à jour (ex: changer la quantité)
export const updateCartItemSchema = Yup.object({
  // La clé composite est requise pour identifier la ligne exacte
  cartId: Yup.number().optional(),
  productId: Yup.string().required("L'ID du produit est requis"),

  quantity: Yup.number()
    .typeError("La quantité doit être un nombre")
    .required("La nouvelle quantité est requise")
    .integer("La quantité doit être un entier")
    .min(1, "La quantité doit être d'au moins 1"),
});

// 3. Validation pour la suppression d'un item spécifique
export const removeCartItemSchema = Yup.object({
  // Seules les clés primaires composites sont nécessaires pour la suppression
  cartId: Yup.number().optional(),
  productId: Yup.number().required("L'ID du produit est requis"),
});
