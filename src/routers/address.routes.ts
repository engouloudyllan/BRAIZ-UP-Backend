import express from "express";
import AddressController from "../controllers/address.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const addressRouter = express.Router();

// Toutes les routes adresses nécessitent une authentification
addressRouter.use(requireAuth);

addressRouter.get("/", AddressController.getMine);
addressRouter.post("/", AddressController.create);
addressRouter.put("/:id", AddressController.update);
addressRouter.delete("/:id", AddressController.delete);

export default addressRouter;
