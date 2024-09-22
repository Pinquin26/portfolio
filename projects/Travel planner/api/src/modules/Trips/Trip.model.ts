import mongoose from "mongoose";
import validateModel from "../../validation/validateModel";
import { Trip } from "./Trip.types";
import ActivityModel from "../Activity/Activity.model";
import NoteModel from "../Notes/Note.model";
import ExpenseModel from "../Expenses/Expense.model";


const tripSchema = new mongoose.Schema<Trip>(
  {
    land: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
    date: {
      startDate: {
        type: String,
        required: true,
      },
      endDate: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

tripSchema.pre("save", function (next) {
  validateModel(this);
  next();
});

tripSchema.pre("deleteOne", { document: true, query: false }, function (next) {
  // delete all that belong to this trip
  ActivityModel.deleteMany({ tripId: this._id }).exec();
  NoteModel.deleteMany({ tripId: this._id }).exec();
  ExpenseModel.deleteMany({ tripId: this._id }).exec();
  next();
});

tripSchema.pre(["findOneAndDelete", "deleteMany"], function (next) {
  // delete all  that belong to this trip
  const id = this.getFilter()["_id"];
  ActivityModel.deleteMany({ tripId: id }).exec();
  NoteModel.deleteMany({ tripId: id }).exec();
  ExpenseModel.deleteMany({ tripId: id }).exec();

  next();
});

const TripModel = mongoose.model<Trip>("Trip", tripSchema);

export default TripModel;
