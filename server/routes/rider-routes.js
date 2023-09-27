import express from "express";
import {
  createRider,
  getAllRiders,
  getRiderById,
  updateRider,
  deleteRider,
} from "../controllers/rider-controller";

const router = express.Router();

// Create
router.post("/riders", createRider);

// Get
router.get("/riders", getAllRiders);
router.get("/riders/:riderId", getRiderById);

// Update
router.put("/riders/:riderId", updateRider);

// Delete
router.delete("/riders/:riderId", deleteRider);

export default router;
