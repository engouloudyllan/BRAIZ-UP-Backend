import express from "express";
import OrderController from "../controllers/order.controller.js";

const orderRouter = express.Router();

orderRouter.get("/", OrderController.create);
orderRouter.get("/", OrderController.getAll);
orderRouter.get("/:id", OrderController.getById);
orderRouter.get("/:id", OrderController.cancelOrder);
orderRouter.get("/:id", OrderController.updateStatusOrder);

export default orderRouter;
