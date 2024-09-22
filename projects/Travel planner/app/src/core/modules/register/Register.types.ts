export type NewUser = {
  _id: string;
  firstName: string;
  name: string;
  dateOfBirth: string;
  email: string;
  password: string
}

export type NewUserBody = Omit<NewUser, "_id">;