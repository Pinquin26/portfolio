import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { defaultStyles } from "@styles/styles";

import "@components/design/Typography/PageTitle";
import { consume } from "@lit/context";
import { ExpenseContext, expenseContext } from "./ExpenseDetailContainer";
import { ExpenseBody } from "@core/modules/expenses/Expense.types";
import { updateExpense } from "@core/modules/expenses/Expense.api";
import "@components/pages/expenses/form/ExpenseForm";
import "@components/design/Card/Card";
@customElement("expense-edit")
class ExpenseEdit extends LitElement {
  @consume({ context: expenseContext, subscribe: true })
  @property({ attribute: false })
  public expenseContextValue?: ExpenseContext | null;

  handleSuccess = () => {
    const { expenseContextValue } = this;

    if (expenseContextValue) {
      expenseContextValue.refresh();
    }
  };

  render() {
    const { expenseContextValue, handleSuccess } = this;

    if (!expenseContextValue || !expenseContextValue.expense) {
      return html``;
    }

    const { expense } = expenseContextValue;

    return html` <app-card> <app-page-title>Uitgave aanpassen</app-page-title>
      <expense-form
        submitLabel="Aanpassen"
        .data=${expense}
        .onSuccess=${handleSuccess}
        .method=${(body: ExpenseBody) => updateExpense(expense._id, body)}
      ></expense-form>
      <a href="delete">Uitgave verwijderen</a></app-card>`;
  }

  static styles = [defaultStyles];
}

export default ExpenseEdit;
