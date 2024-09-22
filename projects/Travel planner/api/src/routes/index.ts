import { Express, Router } from "express";
import tripRoutes from "../modules/Trips/Trip.routes";
import activityRoutes from "../modules/Activity/Activity.routes";
import noteRoutes from "../modules/Notes/Note.routes";
import expenseRoutes from "../modules/Expenses/Expense.routes";
import { errorHandler } from "../middleware/error/errorHandlerMiddleware";
import userPublicRoutes from "../modules/User/User.public.routes";
import userPrivateRoutes from "../modules/User/User.private.routes";
import { authJwt } from "../middleware/auth/authMiddleware";

const registerRoutes = (app: Express) => {
  app.use("/", userPublicRoutes);

  const authRoutes = Router();
  authRoutes.use("/", userPrivateRoutes);
  authRoutes.use("/", tripRoutes);
  authRoutes.use("/", activityRoutes);
  authRoutes.use("/", noteRoutes);
  authRoutes.use("/", expenseRoutes);

  app.use(authJwt, authRoutes);

  //should be placed after all routes
  app.use(errorHandler);
};

export { registerRoutes };
