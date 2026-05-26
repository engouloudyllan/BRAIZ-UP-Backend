import express from "express";
import ProductController from "../controllers/product.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createProductSchema,
  deleteProductSchema,
  getByIdProductSchema,
  updateProductSchema,
} from "../validations/product.validation.js";

const productRouter = express.Router();

productRouter.get("/paginated", ProductController.getAllWithPagination);
productRouter.get("/", ProductController.getAll);
productRouter.get(
  "/:id",
  validate(getByIdProductSchema),
  ProductController.getById,
);
productRouter.post(
  "/",
  validate(createProductSchema),
  ProductController.create,
);
productRouter.put(
  "/:id",
  validate(updateProductSchema),
  ProductController.update,
);
productRouter.patch("/:id/availability", ProductController.toggleAvailability);
productRouter.delete(
  "/:id",
  validate(deleteProductSchema),
  ProductController.delete,
);

export default productRouter;
