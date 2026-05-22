import express from "express";
import DistrictController from "../controllers/district.controller.js";
import NeighborhoodController from "../controllers/neighborhood.controller.js";

const neighborhoodRouter = express.Router();

neighborhoodRouter.get("/", NeighborhoodController.getAll);

export default neighborhoodRouter;
