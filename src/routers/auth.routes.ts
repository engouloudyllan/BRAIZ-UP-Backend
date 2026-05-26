import express from "express";
import AuthController from "../controllers/auth.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

// Public
authRouter.post("/register", AuthController.register);
authRouter.post("/verify-email", AuthController.verifyEmail);
authRouter.post("/resend-otp", AuthController.resendOtp);
authRouter.post("/login", AuthController.login);
authRouter.post("/forgot-password", AuthController.forgotPassword);
authRouter.post("/reset-password", AuthController.resetPassword);
authRouter.post("/logout", AuthController.logout);

// Protégée
authRouter.get("/me", requireAuth, AuthController.me);

export default authRouter;
