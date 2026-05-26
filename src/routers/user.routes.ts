import express from "express";
import UserController from "../controllers/user.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

// Admin (à protéger avec un middleware rôle quand on aura les rôles)
userRouter.get("/", UserController.getAll);

// Utilisateur connecté
userRouter.put("/me", requireAuth, UserController.updateMe);
userRouter.put("/me/password", requireAuth, UserController.changePassword);

export default userRouter;
