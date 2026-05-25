import express from "express";
import OrderController from "../controllers/order.controller.js";

const orderRouter = express.Router();

orderRouter.get("/", OrderController.getAll);
orderRouter.post("/", OrderController.create);
// Suivi public par token (ne nécessite pas d'auth) — placé AVANT /:id pour éviter le conflit
orderRouter.get("/track/:token", OrderController.getByTrackingToken);
orderRouter.get("/:id", OrderController.getById);
orderRouter.patch("/:id/status", OrderController.updateStatusOrder);
orderRouter.patch("/:id/cancel", OrderController.cancelOrder);

export default orderRouter;
