import express from "express";
import ShippingZoneController from "../controllers/shippingZone.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createShippingZoneSchema,
  getByIdShippingZoneSchema,
  deleteShippingZoneSchema,
  updateShippingZoneSchema,
} from "../validations/shippingZone.validation.js";

const shippingZoneRouter = express.Router();

shippingZoneRouter.post(
  "/",
  validate(createShippingZoneSchema),
  ShippingZoneController.create,
);
shippingZoneRouter.get("/", ShippingZoneController.getAll);
shippingZoneRouter.get(
  "/:id",
  validate(getByIdShippingZoneSchema),
  ShippingZoneController.getById,
);
shippingZoneRouter.put(
  "/:id",
  validate(updateShippingZoneSchema),
  ShippingZoneController.update,
);
shippingZoneRouter.delete(
  "/:id",
  validate(deleteShippingZoneSchema),
  ShippingZoneController.delete,
);

export default shippingZoneRouter;
