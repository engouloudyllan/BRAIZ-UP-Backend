import express from "express";
import ProductController from "../controllers/product.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { requireAuth, requireRole } from "../middlewares/auth.middleware.js";
import {
  createProductSchema,
  deleteProductSchema,
  getByIdProductSchema,
  updateProductSchema,
} from "../validations/product.validation.js";

const productRouter = express.Router();

// Public (lecture)
productRouter.get("/paginated", ProductController.getAllWithPagination);
productRouter.get("/", ProductController.getAll);
productRouter.get(
  "/:id",
  validate(getByIdProductSchema),
  ProductController.getById,
);

// Admin (création / édition / suppression)
productRouter.post(
  "/",
  requireAuth,
  requireRole("ADMIN"),
  validate(createProductSchema),
  ProductController.create,
);
productRouter.put(
  "/:id",
  requireAuth,
  requireRole("ADMIN"),
  validate(updateProductSchema),
  ProductController.update,
);
productRouter.patch(
  "/:id/availability",
  requireAuth,
  requireRole("ADMIN"),
  ProductController.toggleAvailability,
);
productRouter.delete(
  "/:id",
  requireAuth,
  requireRole("ADMIN"),
  validate(deleteProductSchema),
  ProductController.delete,
);

export default productRouter;
