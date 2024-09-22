import { Document } from "mongoose";

export type UserMethods = {
  comparePassword: (password: string) => Promise<boolean>;
  generateToken: () => string;
};

export type User = Document &
  UserMethods & {
    _id?: string;
    email: string;
    password: string;
    firstname: string;
    name: string;
    dateOfBirth: string;
};
