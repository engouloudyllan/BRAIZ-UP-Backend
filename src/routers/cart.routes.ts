import express from "express";
import CartController from "../controllers/cart.controller.js";

const cartRouter = express.Router();

cartRouter.get("/", CartController.getCurrentCart);

export default cartRouter;
