import express from "express";
import ShippingZoneController from "../controllers/shippingZone.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { requireAuth, requireRole } from "../middlewares/auth.middleware.js";
import {
  createShippingZoneSchema,
  getByIdShippingZoneSchema,
  deleteShippingZoneSchema,
  updateShippingZoneSchema,
} from "../validations/shippingZone.validation.js";

const shippingZoneRouter = express.Router();

// Public (lecture pour le checkout)
shippingZoneRouter.get("/", ShippingZoneController.getAll);
shippingZoneRouter.get(
  "/:id",
  validate(getByIdShippingZoneSchema),
  ShippingZoneController.getById,
);

// Admin
shippingZoneRouter.post(
  "/",
  requireAuth,
  requireRole("ADMIN"),
  validate(createShippingZoneSchema),
  ShippingZoneController.create,
);
shippingZoneRouter.put(
  "/:id",
  requireAuth,
  requireRole("ADMIN"),
  validate(updateShippingZoneSchema),
  ShippingZoneController.update,
);
shippingZoneRouter.delete(
  "/:id",
  requireAuth,
  requireRole("ADMIN"),
  validate(deleteShippingZoneSchema),
  ShippingZoneController.delete,
);

export default shippingZoneRouter;
