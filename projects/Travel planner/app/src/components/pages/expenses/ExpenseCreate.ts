import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { defaultStyles } from "@styles/styles";

import "@components/pages/expenses/form/ExpenseForm";
import "@components/design/Typography/PageTitle";
import { createExpense } from "@core/modules/expenses/Expense.api";

@customElement("expense-create")
class ExpenseCreate extends LitElement {
  render() {
    return html` <app-page-title>Uitgave toevoegen</app-page-title>
      <app-card><expense-form .method=${createExpense}></expense-form></app-card>`;
  }

  static styles = [defaultStyles];
}

export default ExpenseCreate;
