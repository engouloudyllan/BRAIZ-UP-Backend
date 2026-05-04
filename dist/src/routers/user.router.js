import espress from "express";
import UserController from "../controllers/user.controller.js";
const userRouter = espress.Router();
userRouter.get("/", UserController.getAll);
export default userRouter;
//# sourceMappingURL=user.router.js.map