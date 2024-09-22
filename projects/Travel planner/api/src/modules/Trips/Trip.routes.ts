import express from "express";
import { createTrips, deleteTrip, getTripById, getTrips, updateTrip } from "./Trip.controller";

const router = express.Router();

router.get("/trips", getTrips);
router.get("/trips/:id", getTripById);
router.post("/trips", createTrips);
router.patch("/trips/:id", updateTrip);
router.delete("/trips/:id", deleteTrip);

export default router;
