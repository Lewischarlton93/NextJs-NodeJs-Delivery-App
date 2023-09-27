import express from "express";
import {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
} from "../controllers/restaurant-controller";

const router = express.Router();

// Create
router.post("/restaurants", createRestaurant);

// Get
router.get("/restaurants", getAllRestaurants);
router.get("/restaurants/:restaurantId", getRestaurantById);

// Update
router.put("/restaurants/:restaurantId", updateRestaurant);

// Delete
router.delete("/restaurants/:restaurantId", deleteRestaurant);

export default router;
