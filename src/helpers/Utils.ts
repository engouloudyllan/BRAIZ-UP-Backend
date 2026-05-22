import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import url from "node:url";
import express from "express";
import type { UploadedFile } from "express-fileupload";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(path.dirname(import.meta.url));
const projectRoot = path.resolve(process.cwd());
const publicDir = path.join(projectRoot, "public");

class Utils {
  static convertBigIntToString(obj: any): any {
    if (typeof obj === "bigint") {
      return obj.toString();
    }

    if (Array.isArray(obj)) {
      return obj.map(this.convertBigIntToString);
    }

    if (obj !== null && typeof obj === "object") {
      return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [
          key,
          this.convertBigIntToString(value),
        ]),
      );
    }

    return obj;
  }

  static formatErrorValidation = (error: any) => {
    const errors = error.inner.reduce((acc: any, err: any) => {
      if (err.path && !acc[err.path]) {
        acc[err.path] = err.message;
      }
      return acc;
    }, {});
    return errors;
  };

  static async saveFile(file: any, saveRelatifPath: string) {
    if (!file) {
      throw new Error("No file provided");
    }

    const name = `${Date.now()}.${file.mimetype.split("/")[1]}`;
    const absolutePath = path.join(publicDir, "uploads", saveRelatifPath);

    if (!fs.existsSync(absolutePath)) {
      await fsp.mkdir(absolutePath, { recursive: true });
    }

    return new Promise((resolve, reject) => {
      file.mv(path.join(absolutePath, name), (err: any) => {
        if (err) return reject(err);
        return resolve(`/uploads/${saveRelatifPath}/${name}`);
      });
    });
  }

  static async saveFiles(
    files: UploadedFile | UploadedFile[],
    saveRelatifPath: string,
  ) {
    const _files = Array.isArray(files) ? files : [files];

    const promises = _files.map((file) => {
      return this.saveFile(file, saveRelatifPath);
    });

    return Promise.all(promises);
  }

  static async updateFile(
    file: any,
    relativeFilePath: string,
    oldRelativeFilePath: string = "",
  ) {
    const name = `${Date.now()}.${file.mimetype.split("/")[1]}`;
    const oldAbsolutePath = path.join(publicDir, oldRelativeFilePath);
    const absolutePath = path.join(publicDir, "uploads", relativeFilePath);

    // Vérifie si le fichier existe
    if (!fs.existsSync(absolutePath)) {
      await fsp.mkdir(absolutePath, { recursive: true });
    }

    return new Promise((resolve, reject) => {
      file.mv(path.join(absolutePath, name), async (err: any) => {
        if (err) return reject(err);

        if (
          oldRelativeFilePath &&
          fs.existsSync(oldAbsolutePath) &&
          !/default\.[^/\\]+$/i.test(oldAbsolutePath)
        ) {
          // Supprime l'ancien fichier
          await fsp.unlink(oldAbsolutePath);
        }

        return resolve(`/uploads/${relativeFilePath}/${name}`);
      });
    });
  }

  static async updateFiles(
    files: UploadedFile | UploadedFile[],
    saveRelatifPath: string,
    oldRelativeFilePaths: string[] = [],
  ) {
    const _files = Array.isArray(files) ? files : [files];

    const isDeleted = await this.deleteFiles(oldRelativeFilePaths);

    if (!isDeleted) {
      throw new Error("Failed to deleted old files");
    }

    const promises = _files.map((file) => {
      return this.updateFile(file, saveRelatifPath);
    });

    return Promise.all(promises);
  }

  static async deleteFile(relativeFilePath: string) {
    try {
      const absolutePath = path.join(publicDir, relativeFilePath);

      await fsp.access(absolutePath);
      await fsp.unlink(absolutePath);

      return true;
    } catch (err: any) {
      console.error(
        "An error occured went we are tried to delete file :",
        err.message,
      );
      return false;
    }
  }

  static async deleteFiles(saveRelatifPath: string | string[]) {
    const paths = Array.isArray(saveRelatifPath)
      ? saveRelatifPath
      : [saveRelatifPath];

    const promises = paths.map((path) => {
      return this.deleteFile(path);
    });

    await Promise.all(promises);
    return true;
  }

  static resolveFileUrl(req: express.Request, relativePath: string) {
    if (
      relativePath.startsWith("data:") ||
      relativePath.startsWith("http://") ||
      relativePath.startsWith("https://")
    ) {
      return relativePath;
    }

    const cleanPath = relativePath.startsWith("/")
      ? relativePath
      : `/${relativePath}`;

    return `${req.protocol}://${req.get("host")}/static${cleanPath}`;
  }

  static resolveFileUrls(
    req: express.Request,
    relativePaths: string | string[],
  ) {
    const paths = Array.isArray(relativePaths)
      ? relativePaths
      : [relativePaths];

    const _paths = paths.map((path) => {
      return this.resolveFileUrl(req, path);
    });

    return _paths;
  }
}

export default Utils;
