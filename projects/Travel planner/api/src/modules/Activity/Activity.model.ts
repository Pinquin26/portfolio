
import mongoose from "mongoose";
import { Activity } from "./Activity.types";
import validateModel from "../../validation/validateModel";

const activitySchema = new mongoose.Schema<Activity>(
  {
    name: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    tripId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
activitySchema.virtual("trip", {
  ref: "Trip",
  localField: "tripId",
  foreignField: "_id",
  justOne: true,
});
activitySchema.pre("save", function (next) {
  validateModel(this);
  next();
});

const ActivityModel = mongoose.model<Activity>("Activity", activitySchema);

export default ActivityModel;