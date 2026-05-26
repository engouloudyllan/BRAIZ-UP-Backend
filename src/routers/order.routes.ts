import express from "express";
import OrderController from "../controllers/order.controller.js";
import { optionalAuth } from "../middlewares/auth.middleware.js";

const orderRouter = express.Router();

// Suivi public par token (placé AVANT /:id pour éviter le conflit)
orderRouter.get("/track/:token", OrderController.getByTrackingToken);

// optionalAuth : si token JWT présent → req.user attaché (?my=true / lier la commande)
orderRouter.get("/", optionalAuth, OrderController.getAll);
orderRouter.post("/", optionalAuth, OrderController.create);
orderRouter.get("/:id", OrderController.getById);
orderRouter.patch("/:id/status", OrderController.updateStatusOrder);
orderRouter.patch("/:id/cancel", OrderController.cancelOrder);

export default orderRouter;
