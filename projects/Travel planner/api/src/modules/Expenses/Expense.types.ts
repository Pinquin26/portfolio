import { Document } from "mongoose";
import mongoose from "mongoose";
import { Trip } from "../Trips/Trip.types";

export type Expense = Document & {
  _id?: string;
  title: string;
  description: string;
  cost: number;
  ownerId: mongoose.Schema.Types.ObjectId;
  tripId: mongoose.Schema.Types.ObjectId;
  trip?: Trip;
};
