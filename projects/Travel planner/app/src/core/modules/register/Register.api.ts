import { API } from "@core/network/api";
import { NewUser } from "./Register.types";

type NewUserBody = {
  firstName: string;
  name: string;
  dateOfBirth: string;
  email: string;
  password: string;
};

export const newUser = (body: NewUserBody) => {
  return API.post<NewUser>("/register", body);
};