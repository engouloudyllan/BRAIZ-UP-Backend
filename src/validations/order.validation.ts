// import * as Yup from "yup";
// import { prisma } from "../models/index.js";

// export const createOrderSchema = Yup.object({
//   customerType: Yup.string()
//     .oneOf(["PARTICULIER", "ENTREPRISE"], "Type de client invalide")
//     .required("Le type de client est requis"),

//   phone: Yup.string().optional(),

//   isDeliveryRequested: Yup.boolean().required(),

//   deliveryTime

//   shippingZoneId: Yup.number()
//     .required("La zone de livraison est requise") // ← champ obligatoire
//     .test("zoneExists", "Zone de livraison introuvable", async (value) => {
//       if (!value) return false; // ← si pas de valeur → échec
//       const count = await prisma.shippingZone.count({
//         where: { id: value, isActive: true }, // ← zone doit être active
//       });
//       return count > 0; // ← true si existe et active
//     }),

//   proximityAddress: Yup.string()
//     .max(100, "Le point de repère est trop long")
//     .nullable()
//     .typeError("Date de livraison invalide"),


// });
