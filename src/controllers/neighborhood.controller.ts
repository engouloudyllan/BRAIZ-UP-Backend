import ResponseHandler from "../helpers/responses.js";
import { prisma } from "../models/index.js";
import express from "express";

class NeighborhoodController {
  static async getAll(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const neighborhoods = await prisma.neighborhood.findMany();
      return ResponseHandler.success(
        res,
        neighborhoods,
        "récupération des quartiers éffectuée avec succès",
      );
    } catch (error: any) {
      console.log(error);
      next(error);
    }
  }
}

export default NeighborhoodController;
