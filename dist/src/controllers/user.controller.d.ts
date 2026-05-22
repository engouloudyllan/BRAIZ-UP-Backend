import express from "express";
declare class UserController {
    static getAll(req: express.Request, res: express.Response, next: express.NextFunction): Promise<express.Response<any, Record<string, any>> | undefined>;
}
export default UserController;
//# sourceMappingURL=user.controller.d.ts.map