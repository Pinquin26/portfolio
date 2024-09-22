import mongoose from "mongoose";
import { Expense } from "./Expense.types";
import validateModel from "../../validation/validateModel";

const expenseSchema = new mongoose.Schema<Expense>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
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
expenseSchema.virtual("trip", {
  ref: "Trip",
  localField: "tripId",
  foreignField: "_id",
  justOne: true,
  
});
expenseSchema.pre("save", function (next) {
  validateModel(this);
  next();
});

const ExpenseModel = mongoose.model<Expense>("Expense", expenseSchema);

export default ExpenseModel;
