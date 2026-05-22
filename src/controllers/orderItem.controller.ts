import express from "express";

class OrderController {
  static async addOrderItem(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
   static async updateOrderItem(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
   static async removeOrderItem(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

export default OrderController;
