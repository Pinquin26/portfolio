import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../../middleware/auth/authMiddleware";
import ActivityModel from "../Activity/Activity.model";
import TripModel from "../Trips/Trip.model";
import NoteModel from "../Notes/Note.model";
import UserModel from "./User.model";
import NotFoundError from "../../middleware/error/NotFoundError";

const login = (req: Request, res: Response, next: NextFunction) => {
  const { user } = req as AuthRequest;

  res.json({
    token: user.generateToken(),
  });
};

const getCurrentUser = (req: Request, res: Response, next: NextFunction) => {
  const { user } = req as AuthRequest;
  res.json(user);
};

const getDashboard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req as AuthRequest;

    // how many activities?
    const activities = await ActivityModel.countDocuments({ ownerId: user._id });
    // how many clients?
    const trips = await TripModel.countDocuments({ ownerId: user._id });
    // how many notes?
    const notes = await NoteModel.countDocuments({ ownerId: user._id });

    res.json({
      activities,
      trips,
      notes
    });
  } catch (e) {
    next(e);
  }
};

const createNewUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userEmail = await UserModel.findOne({
    email: req.body.email,
  });
  try {
    if (userEmail) {
      throw new NotFoundError("Email already in use");
    }
    const user = new UserModel({
      ...req.body,
    });
    const result = await user.save();

    res.json(result);
  } catch (e) {
    next(e);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    // { new: true } om ge-update versie terug te krijgen
    const userUpdate = await UserModel.findOneAndUpdate(
      {
        _id: id,
      },
      req.body,
      { new: true, runValidators: true }
    );
    if (!userUpdate) {
      throw new NotFoundError("User not found");
    }
    
    res.json(userUpdate);
  } catch (e) {
    next(e);
  }
};


export {login, getCurrentUser, createNewUser, getDashboard, updateUser};