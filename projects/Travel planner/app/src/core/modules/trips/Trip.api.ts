import { API } from "@core/network/api";
import { Trip, TripBody } from "./Trip.types";

const getTrips = () => {
  return API.get<Trip[]>("/trips");
};

const getTripById = (id: string) => {
  return API.get<Trip>(`/trips/${id}`);
};

const createTrip = (trip: TripBody) => {
  return API.post<Trip>("/trips", trip);
};

const updateTrip = (id: string, trip: TripBody) => {
  return API.patch<Trip>(`/trips/${id}`, trip);
};

const deleteTrip = (id: string) => {
  return API.delete<Trip>(`/trips/${id}`);
}
export { getTripById, getTrips, createTrip, updateTrip, deleteTrip };
