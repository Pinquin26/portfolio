import { Trip } from "../trips/Trip.types";

export type Activity = {
  _id: string;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  cost: number;
  description: string;
  location: string;
  link: string;
  tripId: string;
  trip?: Trip;
};

export type ActivityBody = Omit<Activity, "_id">;
