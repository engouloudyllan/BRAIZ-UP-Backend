import express from "express";
import CategoryController from "../controllers/category.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createCategorySchema,
  deleteCategorySchema,
  updateCategorySchema,
} from "../validations/category.validation.js";

const categoryRouter = express.Router();

categoryRouter.get("/", CategoryController.getAll);
categoryRouter.get("/:id", CategoryController.getById);
categoryRouter.post(
  "/",
  validate(createCategorySchema),
  CategoryController.create,
);
categoryRouter.put(
  "/:id",
  validate(updateCategorySchema),
  CategoryController.update,
);
categoryRouter.delete(
  "/:id",
  validate(deleteCategorySchema),
  CategoryController.delete,
);

export default categoryRouter;
