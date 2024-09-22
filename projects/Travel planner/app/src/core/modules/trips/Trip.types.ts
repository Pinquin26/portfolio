export type Trip = {
  _id: string;
  name: string;
  land: string;
  city: string;
  date: {
    startDate: string;
    endDate: string;
  };
};
export type TripBody = Omit<Trip, "_id">;