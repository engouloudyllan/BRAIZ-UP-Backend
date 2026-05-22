import express from "express";
import type { Prisma } from "@prisma/client";
import { prisma } from "../models/index.js";
import ResponseHandler from "../helpers/responses.js";

class ShippingZoneController {
  static async create(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const data = req.body;

    try {
      const shippingZone = await prisma.shippingZone.create({
        data: {
          name: data.name,
          description: data.description,
          fee: +data.fee,
          districtId: +data.districtId,
          neighborhoodId: +data.neighborhoodId,
        },
        include: {
          district: true,
          neighborhood: true,
        },
      });
      return ResponseHandler.success(
        res,
        shippingZone,
        "ShippingZone created successfully !!!",
        201,
      );
    } catch (error: any) {
      console.log(error);
      next(error);
    }
  }
  static async getAll(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const shippingZones = await prisma.shippingZone.findMany({
        include: {
          district: true,
          neighborhood: true,
        },
      });
      return ResponseHandler.success(res, shippingZones, "ShippingZone list");
    } catch (error: any) {
      console.log(error);
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
      const shippingZone = await prisma.shippingZone.findFirst({
        where: {
          id: +id!,
        },
        include: {
          district: true,
          neighborhood: true,
        },
      });
      if (!shippingZone) {
        return ResponseHandler.notFound(
          res,
          `ShippingZone not found with this ID: ${id}`,
        );
      }
      return ResponseHandler.success(
        res,
        shippingZone,
        "ShippingZone retrieved successfully !!!",
      );
    } catch (error: any) {
      if (error) {
        console.log(error);
        return ResponseHandler.error(res, null, error.message, 500);
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

    try {
      const existiingShippingZone = await prisma.shippingZone.findFirst({
        where: {
          id: +id!,
        },
        include: {
          district: true,
          neighborhood: true,
        },
      });
      if (!existiingShippingZone) {
        return ResponseHandler.notFound(
          res,
          `ShippingZone not found with this ID: ${id}`,
        );
      }
      const shippingZoneUpdate = await prisma.shippingZone.update({
        where: { id: +id! },
        data: {
          name: data.name,
          description: data.description,
          fee: +data.fee,
          districtId: +data.districtId,
          neighborhoodId: +data.neighborhoodId,
        },
        include: {
          district: true,
          neighborhood: true,
        },
      });
      return ResponseHandler.success(
        res,
        shippingZoneUpdate,
        "ShippingZone updated successfully",
      );
    } catch (error: any) {
      console.log(error);
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
      const existiingShippingZone = await prisma.shippingZone.findFirst({
        where: {
          id: +id!,
        },
        include: {
          district: true,
          neighborhood: true,
        },
      });
      if (!existiingShippingZone) {
        return ResponseHandler.notFound(
          res,
          `ShippingZone not found with this ID: ${id}`,
        );
      }
      const deleteShippingZone = await prisma.shippingZone.delete({
        where: {
          id: +id!,
        },
      });
      return ResponseHandler.success(
        res,
        deleteShippingZone,
        "ShippingZone deleted successfully !!!",
      );
    } catch (error: any) {
      console.log(error);
      next(error);
    }
  }
}

export default ShippingZoneController;
