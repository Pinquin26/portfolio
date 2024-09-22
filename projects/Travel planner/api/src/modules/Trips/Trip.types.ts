import { Document } from "mongoose";
import mongoose from "mongoose";

export type Trip = Document & {
  _id?: string;
  name: string;
  land: string;
  city: string;
  ownerId: mongoose.Schema.Types.ObjectId;
  date: {
    startDate: string;
    endDate: string;
  };
};
