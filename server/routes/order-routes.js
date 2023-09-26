import express from "express";
import {
  createOrder,
  getOrderById,
  getAllOrders,
  updateOrder,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/order-controller";

const router = express.Router();

// Create
router.post("/orders", createOrder);

// Get
router.get("/orders/", getAllOrders);
router.get("/orders/:id", getOrderById);

// Update
router.put("/orders/:id", updateOrder);
router.put("/orders/:id/status", updateOrderStatus);

// Delete
router.delete("/orders/:id", deleteOrder);

export default router;
