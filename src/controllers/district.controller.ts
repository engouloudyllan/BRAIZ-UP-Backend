import ResponseHandler from "../helpers/responses.js";
import { prisma } from "../models/index.js";
import express from "express";

class DistrictController {
  static async getAll(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const districts = await prisma.district.findMany();
      return ResponseHandler.success(
        res,
        districts,
        "récupération des arrondissements éffectuée avec succès",
      );
    } catch (error: any) {
      console.log(error);
      next(error);
    }
  }
}

export default DistrictController;
