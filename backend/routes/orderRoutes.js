// backend/routes/orderRoutes.js
import express from "express";
import { createOrder, getOrders, getOrderById } from "../controllers/orderController.js";
import { validate } from "../middleware/validateRequest.js";
import { orderSchema } from "../validation/orderSchema.js";

const router = express.Router();

router.post("/", validate(orderSchema), createOrder);
router.get("/", getOrders);
router.get("/:id", getOrderById);

export default router;
