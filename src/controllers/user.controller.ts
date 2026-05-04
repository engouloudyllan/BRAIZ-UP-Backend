import { prisma } from "../models/index.js";
import express from "express";

class UserController {
  static async getAll(req: express.Request, res: express.Response) {
    try {
      const users = await prisma.user.findMany();
      res.json(users);
      console.log("Fetched users:", users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default UserController;
