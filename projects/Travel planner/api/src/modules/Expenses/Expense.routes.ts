import { Router } from "express";
import {
  getExpenseById,
  getExpenses,
  updateExpense,
  deleteExpense,
  createExpense,
} from "./Expense.controller";

const router: Router = Router();

router.get("/expenses", getExpenses);
router.get("/expenses/:id", getExpenseById);
router.post("/expenses", createExpense);
router.patch("/expenses/:id", updateExpense);
router.delete("/expenses/:id", deleteExpense);

export default router;
