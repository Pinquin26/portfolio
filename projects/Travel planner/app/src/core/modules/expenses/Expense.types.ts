import { Trip } from "../trips/Trip.types";

export type Expense = {
  _id: string;
  title: string;
  description: string;
  cost: number;
  tripId: string;
  trip?: Trip;
};

export type ExpenseBody = Omit<Expense, "_id">;
