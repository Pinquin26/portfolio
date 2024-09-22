import { NextFunction, Response, Request } from "express";
import NotFoundError from "../../middleware/error/NotFoundError";
import { AuthRequest } from "../../middleware/auth/authMiddleware";

import TripModel from "../Trips/Trip.model";
import ExpenseModel from "./Expense.model";

const getExpenses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req as AuthRequest;
    const expenses = await ExpenseModel.find({
      ownerId: user._id,
    })
      .lean()
      .populate("trip", ["land", "_id"]);

    res.json(expenses);
  } catch (e) {
    next(e);
  }
};

const getExpenseById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req as AuthRequest;
    const { id } = req.params;
    const expense = await ExpenseModel.findOne({
      _id: id,
      ownerId: user._id,
    })
      .lean()
      .populate("trip");

    if (!expense) {
      throw new NotFoundError("expense not found");
    }
    res.json(expense);
  } catch (e) {
    next(e);
  }
};

const createExpense = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req as AuthRequest;

    const trip = await TripModel.findOne({
      _id: req.body.tripId,
      ownerId: user._id,
    });

    if (!trip) {
      throw new NotFoundError("Trip not found");
    }

    const expense = new ExpenseModel({
      ...req.body,
      ownerId: user._id,
    });
    const result = await expense.save();

    res.json(result);
  } catch (e) {
    next(e);
  }
};

const updateExpense = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req as AuthRequest;
    const { id } = req.params;

    // make sure client exists AND that the client belongs to the user
    if (req.body.tripId) {
      const trip = await TripModel.findOne({
        _id: req.body.tripId,
        ownerId: user._id,
      });

      if (!trip) {
        throw new NotFoundError("trip not found");
      }
    }

    // { new: true } om ge-update versie terug te krijgen
    const expense = await ExpenseModel.findOneAndUpdate(
      {
        _id: id,
        ownerId: user._id,
      },
      req.body,
      { new: true, runValidators: true }
    );
    if (!expense) {
      throw new NotFoundError("expense not found");
    }
    res.json(expense);
  } catch (e) {
    next(e);
  }
};

const deleteExpense = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req as AuthRequest;
    const { id } = req.params;
    const expense = await ExpenseModel.findOneAndDelete({
      _id: id,
      ownerId: user._id,
    });
    if (!expense) {
      throw new NotFoundError("expense not found");
    }
    res.json({});
  } catch (e) {
    next(e);
  }
};

export { getExpenseById, getExpenses, updateExpense, deleteExpense, createExpense };
