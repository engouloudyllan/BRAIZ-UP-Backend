import express from "express";
import userRouter from "./user.routes.js";
import authRouter from "./auth.routes.js";
import uploadRouter from "./upload.routes.js";
import orderRouter from "./order.routes.js";
import categoryRouter from "./category.routes.js";
import productRouter from "./product.routes.js";
import shippingZoneRouter from "./shippingZone.routes.js";
import cartRouter from "./cart.routes.js";
import cartItemRouter from "./cartItem.routes.js";
import regionRouter from "./region.routes.js";
import cityRouter from "./city.routes.js";
import districtRouter from "./district.routes.js";
import neighborhoodRouter from "./neighborhood.routes.js";
import addressRouter from "./address.routes.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/order", orderRouter);
router.use("/categories", categoryRouter);
router.use("/upload", uploadRouter);
router.use("/products", productRouter);
router.use("/shippingZones", shippingZoneRouter);
router.use("/cart", cartRouter);
router.use("/cart/items", cartItemRouter);
router.use("/regions", regionRouter);
router.use("/cities", cityRouter);
router.use("/districts", districtRouter);
router.use("/neighborhoods", neighborhoodRouter);
router.use("/addresses", addressRouter);

export default router;
