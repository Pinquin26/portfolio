import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { defaultStyles } from "@styles/styles";
import { consume } from "@lit/context";

import "@components/design/Typography/PageTitle";
import "@components/design/Card/Card";

import { ExpenseContext, expenseContext } from "./ExpenseDetailContainer";

@customElement("expense-detail")
class ExpenseDetail extends LitElement {
  @consume({ context: expenseContext, subscribe: true })
  @property({ attribute: false })
  public expenseContextValue?: ExpenseContext | null;

  render() {
    const { expenseContextValue } = this;

    if (!expenseContextValue || !expenseContextValue.expense) {
      return html``;
    }

    const { expense } = expenseContextValue;

    return html`
      <app-card>
        <app-page-header>
          <app-page-title>${expense.title}</app-page-title>
          <app-button href="${expense._id}/edit" color="secondary">Aanpassen</app-button>
        </app-page-header>
        <p>Kost: €${expense.cost} </p>
        <h3>Beschrijving: </h3>
        <p>${expense.description}</p>
      </app-card>
    `;
  }

  static styles = [defaultStyles];
}

export default ExpenseDetail;
