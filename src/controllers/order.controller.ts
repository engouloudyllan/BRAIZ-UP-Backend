import express from "express";

class OrderController {
    static async create(req: express.Request, res: express.Response, next: express.NextFunction) {
      const data = req.body;
        try {
            
        } catch (error) {
            console.log(error);
      next(error);
        }
    }
     static async getAll(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            
        } catch (error) {
            console.log(error);
      next(error);
        }
    }
      static async getById(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            
        } catch (error) {
            console.log(error);
      next(error);
        }
    }
      static async cancelOrder(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            
        } catch (error) {
            console.log(error);
      next(error);
        }
    }
      static async updateStatusOrder(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            
        } catch (error) {
            console.log(error);
      next(error);
        }
    }
}

export default OrderController;
