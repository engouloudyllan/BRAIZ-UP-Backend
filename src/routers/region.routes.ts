import express from "express";
import RegionController from "../controllers/region.controller.js";

const regionRouter = express.Router();

regionRouter.get("/", RegionController.getAll);

export default regionRouter;