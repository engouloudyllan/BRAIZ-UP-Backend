import express from "express";
import { prisma } from "../models/index.js";
import ApiResponse from "../helpers/responses.js";

class PermissionController {
  static async getAll(
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const permissions = await prisma.permission.findMany({
        orderBy: { title: "asc" },
      });
      return ApiResponse.success(res, permissions, "Liste des permissions");
    } catch (err) {
      next(err);
    }
  }
}

export default PermissionController;
