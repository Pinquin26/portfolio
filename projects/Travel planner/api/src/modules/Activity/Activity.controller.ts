import { NextFunction, Response, Request } from "express";
import NotFoundError from "../../middleware/error/NotFoundError";
import { AuthRequest } from "../../middleware/auth/authMiddleware";
import ActivityModel from "./Activity.model";
import TripModel from "../Trips/Trip.model";

const getActivities = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req as AuthRequest;
    const activities = await ActivityModel.find({
      ownerId: user._id,
    })
      .lean()
      .populate("trip", ["land", "_id"]);

    res.json(activities);
  } catch (e) {
    next(e);
  }
};

const getActivityDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req as AuthRequest;
    const { id } = req.params;
    const activity = await ActivityModel.findOne({
      _id: id,
      ownerId: user._id,
    })
      .lean()
      .populate("trip");

    if (!activity) {
      throw new NotFoundError("Activity not found");
    }
    res.json(activity);
  } catch (e) {
    next(e);
  }
};

const createActivity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req as AuthRequest;

    const trip = await TripModel.findOne({
      _id: req.body.tripId,
      ownerId: user._id,
    });

    if (!trip) {
      throw new NotFoundError("Trip not found");
    }

    const activity = new ActivityModel({
      ...req.body,
      ownerId: user._id,
    });
    const result = await activity.save();

    res.json(result);
  } catch (e) {
    next(e);
  }
};

const updateActivity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req as AuthRequest;
    const { id } = req.params;

    // make sure trip exists AND that the trip belongs to the user
    if (req.body.tripId) {
      const trip = await TripModel.findOne({
        _id: req.body.tripId,
        ownerId: user._id,
      });

      if (!trip) {
        throw new NotFoundError("Trip not found");
      }
    }

    // { new: true } om ge-update versie terug te krijgen
    const activity = await ActivityModel.findOneAndUpdate(
      {
        _id: id,
        ownerId: user._id,
      },
      req.body,
      { new: true, runValidators: true }
    );
    if (!activity) {
      throw new NotFoundError("Activity not found");
    }
    res.json(activity);
  } catch (e) {
    next(e);
  }
};

const deleteActivity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req as AuthRequest;
    const { id } = req.params;
    const activity = await ActivityModel.findOneAndDelete({
      _id: id,
      ownerId: user._id,
    });
    if (!activity) {
      throw new NotFoundError("Activity not found");
    }
    res.json({});
  } catch (e) {
    next(e);
  }
};

export {
  getActivities,
  getActivityDetail,
  createActivity,
  updateActivity,
  deleteActivity,
};
