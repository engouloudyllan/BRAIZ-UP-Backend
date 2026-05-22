import ResponseHandler from "../helpers/responses.js";
import { prisma } from "../models/index.js";
import express from "express";

class CityController {
  static async getAll(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const cities = await prisma.city.findMany();
      return ResponseHandler.success(
        res,
        cities,
        "récupération des villes éffectuée avec succès",
      );
    } catch (error: any) {
      console.log(error);
      next(error);
    }
  }
}

export default CityController;
