import ResponseHandler from "../helpers/responses.js";
import { prisma } from "../models/index.js";
import express from "express";

class UserController {
  static async getAll(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const users = await prisma.user.findMany();
      return ResponseHandler.success(
        res,
        users,
        "récupération des users éffectuée avec succès",
      );
    } catch (error: any) {
      console.log(error);
      next(error);
    }
  }
}

export default UserController;
