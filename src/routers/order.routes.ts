import express from "express";
import OrderController from "../controllers/order.controller.js";
import {
  optionalAuth,
  requireAuth,
  requireRole,
} from "../middlewares/auth.middleware.js";

const orderRouter = express.Router();

// Suivi public par token (placé AVANT /:id pour éviter le conflit)
orderRouter.get("/track/:token", OrderController.getByTrackingToken);

// Lecture : admin et order_manager pour tout, sinon optionalAuth (?my=true → ses commandes)
orderRouter.get("/", optionalAuth, OrderController.getAll);

// Création : optionalAuth (guest OK, user → order.userId lié auto)
orderRouter.post("/", optionalAuth, OrderController.create);

// Détail : public (suivi via id)
orderRouter.get("/:id", optionalAuth, OrderController.getById);

// Changement de statut : ADMIN + ORDER_MANAGER + DELIVERY
orderRouter.patch(
  "/:id/status",
  requireAuth,
  requireRole("ADMIN", "ORDER_MANAGER", "DELIVERY"),
  OrderController.updateStatusOrder,
);

// Annulation : ADMIN + ORDER_MANAGER (le client peut annuler la sienne via route séparée plus tard)
orderRouter.patch(
  "/:id/cancel",
  requireAuth,
  requireRole("ADMIN", "ORDER_MANAGER"),
  OrderController.cancelOrder,
);

export default orderRouter;
