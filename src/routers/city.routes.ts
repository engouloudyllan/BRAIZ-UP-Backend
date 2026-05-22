import express from "express";
import CityController from "../controllers/city.controller.js";

const cityRouter = express.Router();

cityRouter.get("/", CityController.getAll);

export default cityRouter;