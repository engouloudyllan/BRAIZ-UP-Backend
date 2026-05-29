import express from "express";
import CartController from "../controllers/cart.controller.js";
import { optionalAuth } from "../middlewares/auth.middleware.js";

const cartRouter = express.Router();

// optionalAuth → req.user si JWT présent, sinon undefined (guest via cookie sessionId)
cartRouter.get("/", optionalAuth, CartController.getCurrentCart);
cartRouter.delete("/", optionalAuth, CartController.clearCart);

cartRouter.post("/items", optionalAuth, CartController.addItem);
cartRouter.patch("/items/:productId", optionalAuth, CartController.updateItem);
cartRouter.delete("/items/:productId", optionalAuth, CartController.removeItem);

// Fusion explicite (appelée après login par le front)
cartRouter.post("/merge", optionalAuth, CartController.mergeGuestIntoUser);

export default cartRouter;
