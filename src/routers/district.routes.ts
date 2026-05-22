import express from "express";
import DistrictController from "../controllers/district.controller.js";

const districtRouter = express.Router();

districtRouter.get("/", DistrictController.getAll);

export default districtRouter;