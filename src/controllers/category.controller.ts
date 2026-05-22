import express from "express";
import { prisma } from "../models/index.js";
import ApiResponse from "../helpers/responses.js";
import Utils from "../helpers/Utils.js";
import type { Category } from "@prisma/client";

class CategoryController {
  static async create(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const data = req.body;

    let imagePath = null;
    try {
      if (!req.files?.image) {
        return ApiResponse.error(res, null, "Image file is required", 400);
      }

      imagePath = await Utils.saveFile(req.files.image, "category");
      data.image = imagePath;

      const category = await prisma.category.create({
        data: {
          name: data.name,
          description: data.description,
          image: data.image,
        },
        select: {
          id: true,
          name: true,
          image: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      category.image = Utils.resolveFileUrl(req, category.image);

      return ApiResponse.success(
        res,
        category,
        "Category created successfully !!!",
        201,
      );
    } catch (error: any) {
      if (imagePath) {
        await Utils.deleteFile(imagePath as string);
      }

      if (error.errno === 1062) {
        return ApiResponse.error(
          res,
          null,
          "Duplicata de nom de categorie.",
          400,
        );
      }

      next(error);
    }
  }
  static async getAll(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const categories = await prisma.category.findMany({
        include: {
          products: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      const data = categories.map((item: Category) => {
        item.id = item.id;
        if (item.image) {
          item.image = Utils.resolveFileUrl(req, item.image);
          return item;
        } else {
          return item;
        }
      });

      return ApiResponse.success(res, data, "Category list");
    } catch (error) {
      throw error;
    }
  }
  static async getById(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const { id } = req.params;

    try {
      const category = await prisma.category.findFirst({
        include: {
          products: true,
        },
        where: { id: +id! },
      });

      if (!category) {
        return ApiResponse.notFound(
          res,
          `Category not found with this ID: ${id}`,
        );
      }

      category.image = Utils.resolveFileUrl(req, category.image);

      return ApiResponse.success(
        res,
        category,
        "Category retrieved successfully !!!",
      );
    } catch (error) {
      next(error);
    }
  }
  static async update(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const data = req.body;
    const { id } = req.params;

    try {
      const existingCategory = await prisma.category.findFirst({
        where: { id: +id! },
      });

      if (!existingCategory) {
        return ApiResponse.notFound(
          res,
          `Category not found with this ID: ${id}`,
        );
      }

      if (req.files && req.files.image) {
        const imagePath = await Utils.updateFile(
          req.files.image,
          "category",
          existingCategory.image,
        );
        data.image = imagePath;
      }

      const category = await prisma.category.update({
        where: { id: +id! },
        data: {
          name: data.name,
          description: data.description,
          image: data.image,
        },
      });

      category.image = Utils.resolveFileUrl(req, category.image);

      return ApiResponse.success(
        res,
        category,
        "Category updated successfully !!!",
        201,
      );
    } catch (error: any) {
      if (error.errno === 1062) {
        return ApiResponse.success(
          res,
          null,
          "Duplicata de nom de categorie.",
          500,
        );
      }

      next(error);
    }
  }
  static async delete(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { id } = req.params;

    try {
      const existingCategory = await prisma.category.findFirst({
        where: { id: +id! },
      });

      if (!existingCategory) {
        return ApiResponse.notFound(
          res,
          `Category not found with this ID: ${id}`,
        );
      }

      const category = await prisma.category.delete({ where: { id: +id! } });

      if (category && category.image) {
        await Utils.deleteFile(existingCategory.image);
      }

      return ApiResponse.success(
        res,
        category,
        "Category deleted successfully !!!",
      );
    } catch (error) {
      next(error);
    }
  }
}

export default CategoryController;
