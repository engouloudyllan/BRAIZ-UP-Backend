import express from "express";
import OrderController from "../controllers/order.controller.js";

const orderRouter = express.Router();

orderRouter.get("/", OrderController.getAll);
orderRouter.post("/", OrderController.create);
orderRouter.get("/:id", OrderController.getById);
orderRouter.patch("/:id/status", OrderController.updateStatusOrder);
orderRouter.patch("/:id/cancel", OrderController.cancelOrder);

export default orderRouter;
