import * as Yup from "yup";
import { PrismaClient } from "@prisma/client";
import { prisma } from "../models/index.js";
import type { UploadedFile } from "express-fileupload";

// export const createProductSchema = Yup.object({
//   name: Yup.string().required().label("Name"),
//   description: Yup.string().label("Description"),
//   image: Yup.mixed()
//     .test("required", "The image is required", (value) => {
//       if (value) {
//         return true;
//       } else {
//         return false;
//       }
//     })
//     .test("fileFormat", "Format incorrect", (value) => {
//       if (value instanceof File) {
//         return ["image/jpeg", "image/png", "image/webp"].includes(value.type);
//       } else {
//         return false;
//       }
//     })
//     .label("Image"),
//   categoryId: Yup.string()
//     .required()
//     .test(
//       "verifiedExistingCategory",
//       `The category with this ID doesn't exist`,
//       async (value) => {
//         const data = await prisma.category.findUnique({
//           where: { id: +value },
//         });
//         if (data) {
//           return true;
//         } else {
//           return false;
//         }
//       },
//     ),
//   price: Yup.number()
//     .typeError("Price must be a number")
//     .required("Price is required")
//     .positive("Price must be positive")
//     .label("Price"),

//   cookingDuration: Yup.number()
//     .typeError("Cooking duration must be a number")
//     .required("Cooking duration is required")
//     .integer("Cooking duration must be an integer")
//     .positive("Cooking duration must be positive")
//     .label("Cooking Duration"),
// });

// Ajuste le chemin vers ton instance Prisma

export const getByIdProductSchema = Yup.object({
  id: Yup.string().required(),
});

export const createProductSchema = Yup.object({
  name: Yup.string().required().label("Name"),
  description: Yup.string().label("Description"),
  //   images: Yup.mixed()
  //     .test("required", "The image is required", (value) => {
  //       return !!value;
  //     })
  //     .test("fileFormat", "Format incorrect", (value) => {
  //       if (value && typeof (value as any).mimetype === "string") {
  //         return ["image/jpeg", "image/png", "image/webp"].includes(
  //           (value as any).mimetype,
  //         );
  //       }
  //       return false;
  //     })
  //     .label("Image"),
  images: Yup.mixed()

    .test("required", "The image is required", (value) => {
      return !!value;
    })

    .test("minImages", "Minimum 2 images required", (value) => {
      if (!value) return false;

      if (Array.isArray(value)) {
        return value.length >= 2;
      }

      return false;
    })

    .test("fileFormat", "Format incorrect", (value: unknown) => {
      const allowed = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

      if (!value) return false;

      if (Array.isArray(value)) {
        return value.every((file: UploadedFile) =>
          allowed.includes(file.mimetype),
        );
      }

      const file = value as UploadedFile;

      return allowed.includes(file.mimetype);
    })
    .label("Image"),
  categoryId: Yup.string()
    .required()
    .test(
      "verifiedExistingCategory",
      `The category with this ID doesn't exist`,
      async (value) => {
        if (!value) return false;
        const data = await prisma.category.findUnique({
          where: { id: +value },
        });
        return !!data;
      },
    ),
  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required")
    .positive("Price must be positive")
    .label("Price"),
  cookingDuration: Yup.number()
    .typeError("Cooking duration must be a number")
    .required("Cooking duration is required")
    .integer("Cooking duration must be an integer")
    .positive("Cooking duration must be positive")
    .label("Cooking Duration"),
});

export const updateProductSchema = Yup.object({
  id: Yup.string().required(),
  name: Yup.string().required().label("Name"),
  description: Yup.string().label("Description"),
  image: Yup.mixed()
    .optional()
    .test("fileFormat", "Format incorrect", (value) => {
      // Si aucune nouvelle image n'est fournie lors de la modification, on valide
      if (!value) return true;
      if (value && typeof (value as any).mimetype === "string") {
        return ["image/jpeg", "image/png", "image/webp"].includes(
          (value as any).mimetype,
        );
      }
      return false;
    })
    .label("Image"),
  categoryId: Yup.string()
    .required()
    .test(
      "verifiedExistingCategory",
      `The category with this ID doesn't exist`,
      async (value) => {
        if (!value) return false;
        const data = await prisma.category.findUnique({
          where: { id: +value },
        });
        return !!data;
      },
    ),
  price: Yup.number()
    .typeError("Price must be a number")
    .required("Price is required")
    .positive("Price must be positive")
    .label("Price"),
  cookingDuration: Yup.number()
    .typeError("Cooking duration must be a number")
    .required("Cooking duration is required")
    .integer("Cooking duration must be an integer")
    .positive("Cooking duration must be positive")
    .label("Cooking Duration"),
});

export const deleteProductSchema = Yup.object({
  id: Yup.string().required(),
});
