import ApiResponse from "../helpers/responses.js";
import Utils from "../helpers/Utils.js";
import express from "express";
import type { UploadedFile } from "express-fileupload";

class UploadController {
  static uploadFile = async (req: express.Request, res: express.Response) => {
    try {
      // Typer req.files correctement
      const files = req.files as
        | { [fieldname: string]: UploadedFile | UploadedFile[] }
        | undefined;

      if (!files || Object.keys(files).length === 0) {
        return ApiResponse.error(res, null, "No files downloaded", 400);
      }

      const file = files.file as UploadedFile; // ← fichier unique

      let fileType = "document";
      if (file.mimetype.startsWith("image/")) {
        fileType = "image";
      } else if (file.mimetype.startsWith("video/")) {
        fileType = "video";
      }

      const fileUrl = Utils.resolveFileUrl(req, file as unknown as string); 

      return ApiResponse.success(
        res,
        {
          fileUrl,
          fileName: file.name,
          fileType: fileType,
        },
        "File download successful.",
      );
    } catch (error) {
      return ApiResponse.error(res, null, "Error downloading file.", 500);
    }
  };
}

export default UploadController;
