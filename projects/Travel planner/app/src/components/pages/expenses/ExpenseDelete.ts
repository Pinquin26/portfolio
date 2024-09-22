import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { buttonStyles, defaultStyles } from "@styles/styles";
import { consume } from "@lit/context";
import { Router } from "@vaadin/router";

import "@components/design/Typography/PageTitle";
import "@components/design/Header/PageHeader";
import "@components/design/Grid/Grid";
import "@components/design/Button/Button";

import "@components/design/Card/AmountCard";
import { ExpenseContext, expenseContext } from "./ExpenseDetailContainer";
import { deleteExpense } from "@core/modules/expenses/Expense.api";

@customElement("expense-delete")
class ExpenseDelete extends LitElement {
  @consume({ context: expenseContext, subscribe: true })
  @property({ attribute: false })
  public expenseContextValue?: ExpenseContext | null;

  handleSuccess = () => {
    const { expenseContextValue } = this;
    if (expenseContextValue) {
      expenseContextValue.refresh();
    }
  };
  deleteHandler = () => {
    const { expenseContextValue } = this;
    if (!expenseContextValue || !expenseContextValue.expense) {
      return;
    }
    const { expense } = expenseContextValue;
    deleteExpense(expense._id).then(() => this.handleSuccess());
    const url = window.location.pathname;
    const tripIdFromUrl = url.split("/")[2];
    Router.go(`/trips/${tripIdFromUrl}`);
  };
  goBackHandler = () => {
    window.history.back();
  };

  render() {
    const { expenseContextValue } = this;

    if (!expenseContextValue || !expenseContextValue.expense) {
      return html``;
    }

    const { expense } = expenseContextValue;

    if (!expense) {
      return html``;
    }

    return html`
      <app-page-header>
        <app-page-title>Uitgave verwijderen</app-page-title>
      </app-page-header>
      <p>Ben je zeker dat je deze uitgave ${expense.title} wilt verwijderen?</p>

      <button class="btn-tertiary" @click="${this.deleteHandler}">Verwijderen</button>
      <app-button @click="${this.goBackHandler}">Annuleren</app-button>
    `;
  }

  static styles = [defaultStyles, buttonStyles];
}

export default ExpenseDelete;
