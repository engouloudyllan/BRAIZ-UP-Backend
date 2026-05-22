import express from "express";
import AuthController from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { registerSchema } from "../validations/auth.validation.js";

const authRouter = express.Router();

authRouter.post("/register", validate(registerSchema), AuthController.register);

export default authRouter;
