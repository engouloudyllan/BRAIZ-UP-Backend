import express from 'express';
import type { RegisterBody } from "../Types/index.js";


class AuthController {
   static async register (req: express.Request<{}, {}, RegisterBody>, res: express.Response, next: express.NextFunction) {

      const data = req.body;


      

   }
}

export default AuthController;