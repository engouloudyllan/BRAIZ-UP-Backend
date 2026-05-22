import express from "express";
import CartItemController from "../controllers/cartItem.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { addCartItemSchema, removeCartItemSchema, updateCartItemSchema } from "../validations/cartItem.validation.js";

const cartItemRouter = express.Router();

cartItemRouter.post("/", validate(addCartItemSchema), CartItemController.addItem);
cartItemRouter.patch("/:productId", validate(updateCartItemSchema), CartItemController.updateItem);
cartItemRouter.delete("/:productId", validate(removeCartItemSchema), CartItemController.removeItem);


export default cartItemRouter;