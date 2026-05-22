import ResponseHandler from "../helpers/responses.js";
import { prisma } from "../models/index.js";
import express from "express";

class RegionController {
  static async getAll(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const regions = await prisma.region.findMany();
      return ResponseHandler.success(
        res,
        regions,
        "récupération des régions éffectuée avec succès",
      );
    } catch (error: any) {
      console.log(error);
      next(error);
    }
  }
}

export default RegionController;
