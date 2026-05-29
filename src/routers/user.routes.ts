import express from "express";
import UserController from "../controllers/user.controller.js";
import { requireAuth, requireRole } from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

// Utilisateur connecté
userRouter.put("/me", requireAuth, UserController.updateMe);
userRouter.put("/me/password", requireAuth, UserController.changePassword);

// Admin
userRouter.get("/", requireAuth, requireRole("ADMIN"), UserController.getAll);
userRouter.post("/", requireAuth, requireRole("ADMIN"), UserController.create);
userRouter.get(
  "/:id",
  requireAuth,
  requireRole("ADMIN"),
  UserController.getById,
);
userRouter.put(
  "/:id",
  requireAuth,
  requireRole("ADMIN"),
  UserController.update,
);
userRouter.patch(
  "/:id/active",
  requireAuth,
  requireRole("ADMIN"),
  UserController.toggleActive,
);
userRouter.put(
  "/:id/roles",
  requireAuth,
  requireRole("ADMIN"),
  UserController.assignRoles,
);
userRouter.delete(
  "/:id",
  requireAuth,
  requireRole("ADMIN"),
  UserController.delete,
);

export default userRouter;
