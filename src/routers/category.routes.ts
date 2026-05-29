import express from "express";
import CategoryController from "../controllers/category.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { requireAuth, requireRole } from "../middlewares/auth.middleware.js";
import {
  createCategorySchema,
  deleteCategorySchema,
  updateCategorySchema,
} from "../validations/category.validation.js";

const categoryRouter = express.Router();

// Public
categoryRouter.get("/", CategoryController.getAll);
categoryRouter.get("/:id", CategoryController.getById);

// Admin
categoryRouter.post(
  "/",
  requireAuth,
  requireRole("ADMIN"),
  validate(createCategorySchema),
  CategoryController.create,
);
categoryRouter.put(
  "/:id",
  requireAuth,
  requireRole("ADMIN"),
  validate(updateCategorySchema),
  CategoryController.update,
);
categoryRouter.delete(
  "/:id",
  requireAuth,
  requireRole("ADMIN"),
  validate(deleteCategorySchema),
  CategoryController.delete,
);

export default categoryRouter;
