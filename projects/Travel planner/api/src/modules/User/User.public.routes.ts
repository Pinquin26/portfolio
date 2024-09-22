import { Router } from "express";
import { authLocal } from "../../middleware/auth/authMiddleware";
import { createNewUser, login } from "./User.controller";

const router = Router();
router.post("/login", authLocal, login);
router.post("/register", createNewUser);

export default router;