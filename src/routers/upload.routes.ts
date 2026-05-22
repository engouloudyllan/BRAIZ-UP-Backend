import express from "express";
import UploadController from "../controllers/upload.controller.js";

const uploadRouter = express.Router();

uploadRouter.post("/", UploadController.uploadFile);

export default uploadRouter;
