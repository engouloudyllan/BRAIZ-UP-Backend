import express from "express";
import RoleController from "../controllers/role.controller.js";
import PermissionController from "../controllers/permission.controller.js";
import { requireAuth, requireRole } from "../middlewares/auth.middleware.js";

const roleRouter = express.Router();

roleRouter.get("/", requireAuth, requireRole("ADMIN"), RoleController.getAll);
roleRouter.get(
  "/:id",
  requireAuth,
  requireRole("ADMIN"),
  RoleController.getById,
);
roleRouter.post("/", requireAuth, requireRole("ADMIN"), RoleController.create);
roleRouter.put(
  "/:id",
  requireAuth,
  requireRole("ADMIN"),
  RoleController.update,
);
roleRouter.delete(
  "/:id",
  requireAuth,
  requireRole("ADMIN"),
  RoleController.delete,
);

const permissionRouter = express.Router();
permissionRouter.get(
  "/",
  requireAuth,
  requireRole("ADMIN"),
  PermissionController.getAll,
);

export { roleRouter, permissionRouter };
