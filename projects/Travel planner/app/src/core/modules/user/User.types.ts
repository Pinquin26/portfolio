export type User = {
  _id: string;
  email: string;
  firstName: string;
  name: string;
  dateOfBirth: string;
};

export type DashboardData = {
  activities: number;
  trips: number;
  notes: number;
};

export type UserBody = Omit<User, "_id">;