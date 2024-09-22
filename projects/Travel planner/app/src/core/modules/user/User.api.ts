import { API } from "@core/network/api";
import { DashboardData, User, UserBody } from "./User.types";

export const getCurrentUser = () => {
  return API.get<User>("/users/current");
};
export const updateUser = (id: string, user: UserBody) => {
  return API.patch<User>(`/users/${id}`, user);
};

export const getDashboardData = () => {
  return API.get<DashboardData>("/users/current/dashboard");
};
