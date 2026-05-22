import type { Prisma } from "@prisma/client";
import type { FileArray, UploadedFile } from "express-fileupload";
import ApiResponse from "../helpers/responses.js";
import Utils from "../helpers/Utils.js";
import { prisma } from "../models/index.js";
import express from "express";

interface UploadRequest extends express.Request {
  files?: {
    images?: UploadedFile | UploadedFile[];
  };
}

class ProductController {
  private static normalizeImages(images: Prisma.JsonValue): string[] {
    if (typeof images === "string") {
      return [images];
    }

    if (Array.isArray(images)) {
      return images.filter((item): item is string => typeof item === "string");
    }

    return [];
  }

  static async getAllWithPagination(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const { limit, page, search, startDate, endDate, categoryId } = req.query;

    const take = limit ? +limit : 10;
    const _page = page ? +page : 1;
    const skip = (_page - 1) * take;

    const where: Prisma.ProductWhereInput = {};
    const filters: Prisma.ProductWhereInput[] = [];

    if (startDate) {
      filters.push({
        createdAt: {
          gte: new Date(startDate as string),
        },
      });
    }

    if (endDate) {
      filters.push({
        createdAt: {
          lte: new Date(endDate as string),
        },
      });
    }

    if (categoryId) {
      filters.push({
        categoryId: +categoryId,
      });
    }

    if (filters.length) {
      where.AND = filters;
    }

    if (search) {
      const cleaned = search.toString().replace(/"/g, "");
      where.OR = [
        {
          name: {
            contains: cleaned,
          },
        },
        {
          description: {
            contains: cleaned,
          },
        },
      ];
    }

    try {
      const products = await prisma.product.findMany({
        skip,
        take,
        include: {
          category: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        where,
      });

      const totalItems = await prisma.product.count({ where });

      const data = products.map((item) => {
        if (item.images) {
          item.images = Utils.resolveFileUrls(
            req,
            item.images as unknown as string | string[],
          );
        }
        return item;
      });

      return ApiResponse.success(
        res,
        {
          data,
          pagination: {
            limit: take,
            previousPage: _page > 1 ? _page - 1 : null,
            currentPage: _page,
            nextPage:
              _page + 1 > Math.ceil(totalItems / take) ? null : _page + 1,
            totalItem: totalItems,
            totalPage: Math.ceil(totalItems / take),
          },
        },
        "Product list",
      );
    } catch (error) {
      next(error);
    }
  }

  static async getAll(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const products = await prisma.product.findMany({
        include: {
          category: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      const data = products.map((item) => {
        if (item.images) {
          item.images = Utils.resolveFileUrls(
            req,
            item.images as unknown as string | string[],
          );
        }
        return item;
      });

      return ApiResponse.success(res, data, "Product list");
    } catch (error) {
      next(error);
    }
  }

  static async getById(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const { id } = req.params;

    try {
      const product = await prisma.product.findFirst({
        where: { id: +id! },
        include: {
          category: true,
        },
      });

      if (!product) {
        return ApiResponse.notFound(
          res,
          `Product not found with this ID: ${id}`,
        );
      }

      product.images = Utils.resolveFileUrls(
        req,
        product.images as unknown as string | string[],
      );

      return ApiResponse.success(
        res,
        product,
        "Product retrieved successfully !!!",
      );
    } catch (error) {
      next(error);
    }
  }

  static async create(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const data = req.body;
    const files = (req as UploadRequest).files?.images;
    const images = Array.isArray(files) ? files : files ? [files] : [];

    if (!images.length) {
      return res.status(422).json({
        message: "Image is required.",
      });
    }

    if (images.length < 2) {
      return res.status(422).json({
        message: "Required minimum two images",
      });
    }

    let imagePaths: string[] = [];
    try {
      imagePaths = (await Utils.saveFiles(images, "product")) as string[];
      data.images = imagePaths;

      const product = await prisma.product.create({
        data: {
          name: data.name,
          description: data.description,
          images: imagePaths.length && imagePaths,
          categoryId: +data.categoryId,
          price: +data.price,
          cookingDuration: +data.cookingDuration || 0,
        },
        include: {
          category: true,
        },
      });

      product.images = Utils.resolveFileUrls(
        req,
        product.images as unknown as string | string[],
      );

      return ApiResponse.success(
        res,
        product,
        "Product created successfully !!!",
        201,
      );
    } catch (error) {
      if (imagePaths.length) {
        await Utils.deleteFiles(imagePaths);
      }

      const prismaError = error as any;
      if (prismaError?.errno === 1062) {
        return ApiResponse.success(
          res,
          null,
          "Duplicata de nom de produit",
          500,
        );
      }

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
    const files = (req as UploadRequest).files?.images;
    const images = Array.isArray(files) ? files : files ? [files] : [];

    try {
      const existingProduct = await prisma.product.findFirst({
        where: { id: +id! },
      });

      if (!existingProduct) {
        return ApiResponse.notFound(
          res,
          `Product not found with this ID: ${id}`,
        );
      }

      if (images.length) {
        if (images.length < 1) {
          return res.status(422).json({
            message: "Required minimum one images",
          });
        }

        const imagePaths = await Utils.updateFiles(
          images,
          "product",
          ProductController.normalizeImages(existingProduct.images),
        );
        data.images = imagePaths;
      }

      const product = await prisma.product.update({
        where: { id: +id! },
        data: {
          name: data.name,
          price: +data.price,
          description: data.description,
          images: data.images,
          categoryId: +data.categoryId,
          cookingDuration: data.cookingDuration
            ? +data.cookingDuration
            : existingProduct.cookingDuration,
        },
        include: {
          category: true,
        },
      });

      product.images = Utils.resolveFileUrls(
        req,
        product.images as unknown as string | string[],
      );

      return ApiResponse.success(
        res,
        product,
        "Product updated successfully !!!",
        201,
      );
    } catch (error) {
      const prismaError = error as any;
      if (prismaError?.errno === 1062) {
        return ApiResponse.success(
          res,
          null,
          "Duplicata de nom de produit",
          500,
        );
      }
      next(error);
    }
  }

  static async delete(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const { id } = req.params;

    try {
      const existingProduct = await prisma.product.findFirst({
        where: { id: +id! },
        include: {
          category: true,
        },
      });

      if (!existingProduct) {
        return ApiResponse.notFound(
          res,
          `Product not found with this ID: ${id}`,
        );
      }

      await Utils.deleteFiles(
        ProductController.normalizeImages(existingProduct.images),
      );

      const product = await prisma.product.delete({ where: { id: +id! } });

      return ApiResponse.success(
        res,
        product,
        "Product deleted successfully !!!",
      );
    } catch (error) {
      next(error);
    }
  }
}

export default ProductController;
