import { NextFunction, Response, Request } from "express";
import NotFoundError from "../../middleware/error/NotFoundError";
import { AuthRequest } from "../../middleware/auth/authMiddleware";
import NoteModel from "./Note.model";
import TripModel from "../Trips/Trip.model";

const getNotes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req as AuthRequest;
    const notes = await NoteModel.find({
      ownerId: user._id,
    })
      .lean()
      .populate("trip", ["land", "_id"]);

    res.json(notes);
  } catch (e) {
    next(e);
  }
};

const getNoteById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req as AuthRequest;
    const { id } = req.params;
    const note = await NoteModel.findOne({
      _id: id,
      ownerId: user._id,
    })
      .lean()
      .populate("trip");

    if (!note) {
      throw new NotFoundError("Note not found");
    }
    res.json(note);
  } catch (e) {
    next(e);
  }
};

const createNote = async (
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

    const note = new NoteModel({
      ...req.body,
      ownerId: user._id,
    });
    const result = await note.save();
    
    res.json(result);
  } catch (e) {
    next(e);
  }
};

const updateNote = async (req: Request, res: Response, next: NextFunction) => {
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
    const note = await NoteModel.findOneAndUpdate(
      {
        _id: id,
        ownerId: user._id,
      },
      req.body,
      { new: true, runValidators: true }
    );
    if (!note) {
      throw new NotFoundError("note not found");
    }
    res.json(note);
  } catch (e) {
    next(e);
  }
};


const deleteNote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req as AuthRequest;
    const { id } = req.params;
    const note = await NoteModel.findOneAndDelete({
      _id: id,
      ownerId: user._id,
    });
    if (!note) {
      throw new NotFoundError("Activity not found");
    }
    res.json({});
  } catch (e) {
    next(e);
  }
};

export {
  getNoteById,
  getNotes,
  updateNote,
  deleteNote,
  createNote,
};
