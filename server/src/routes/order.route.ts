import express from "express";
import { createOrder, getOrderById, getMyOrders } from "../controllers/order.controller";
import { protect } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/myorders", protect, getMyOrders);
router.get("/:id", protect, getOrderById);

export default router;
