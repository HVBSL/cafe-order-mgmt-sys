import express from "express";
import { placeOrder, updateOrderStatus, getOrders } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/place-order", placeOrder);
router.get("/get", getOrders);
router.put("/update-status", updateOrderStatus);

export default router;