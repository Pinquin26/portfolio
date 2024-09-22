import { Document } from "mongoose";
import mongoose from "mongoose";
import { Trip } from "../Trips/Trip.types";

export type Activity = Document & {
  _id?: string;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  cost: number;
  description: string;
  location: string;
  link: string;
  ownerId: mongoose.Schema.Types.ObjectId;
  tripId: mongoose.Schema.Types.ObjectId;
  trip?: Trip;
};
