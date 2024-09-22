import { Document } from "mongoose";
import mongoose from "mongoose";
import { Trip } from "../Trips/Trip.types";

export type Note = Document & {
  _id?: string;
  title: string;
  content: string;
  ownerId: mongoose.Schema.Types.ObjectId;
  tripId: mongoose.Schema.Types.ObjectId;
  trip?: Trip;
};
