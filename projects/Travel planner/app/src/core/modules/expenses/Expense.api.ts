import { Expense, ExpenseBody } from "./Expense.types";
import { API } from "@core/network/api";

const getExpenses = () => {
  return API.get<Expense[]>("/expenses");
};

const getExpenseById = (id: string) => {
  return API.get<Expense>(`/expenses/${id}`);
};

const createExpense = (expense: ExpenseBody) => {
  return API.post<Expense>("/expenses", expense);
};

const updateExpense = (id: string, expense: ExpenseBody) => {
  return API.patch<Expense>(`/expenses/${id}`, expense);
};

const deleteExpense = (id: string) => {
  return API.delete<Expense>(`/expenses/${id}`);
};


export {
  getExpenseById,
  getExpenses,
  updateExpense,
  deleteExpense,
  createExpense,
};
