import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { defaultStyles, tableStyles } from "@styles/styles";
import "@components/design/LoadingIndicator";
import "@components/design/ErrorView";
import "@components/design/Button/Button";
import "@components/design/Typography/PageTitle";
import "@components/design/Header/PageHeader";
import "@components/design/Grid/Grid";
import "@components/design/Card/AmountCard";
import { getExpenses } from "@core/modules/expenses/Expense.api";
import { Expense } from "@core/modules/expenses/Expense.types";


@customElement("expense-overview")
class ExpenseOverview extends LitElement {
  @property()
  isLoading: boolean = false;
  @property()
  expenses: Array<Expense> | null = null;
  @property()
  error: string | null = null;

  // called when the element is first connected to the document’s DOM
  connectedCallback(): void {
    super.connectedCallback();
    this.fetchItems();
  }

  fetchItems() {
    this.isLoading = true;
    // todo in api
    getExpenses()
      .then(({ data }) => {
        this.expenses = data;
        this.isLoading = false;
      })
      .catch((error) => {
        this.error = error.message;
        this.isLoading = false;
      });
  }

  render() {
    const { isLoading, expenses, error } = this;
    const url = window.location.pathname;
    const tripIdFromUrl = url.split("/")[2];
    let totaleUitgave = 0;
    let content = html``;
    if (error) {
      content = html`<error-view error=${error} />`;
    } else if (isLoading || !expenses) {
      content = html`<loading-indicator></loading-indicator>`;
    } else if (expenses.length === 0) {
      content = html`<p>Nog geen uitgaven</p>`;
    }
    else {
      content = html`
        ${expenses.map((c) => {
          if (c.tripId == tripIdFromUrl) {
            totaleUitgave += c.cost;
            return html`<tr class="table__row">
              <td class="table__item">${c.title}</td>
              <td class="table__item">€ ${c.cost}</td>
              <td class="table__item">
                <a href="${tripIdFromUrl}/expenses/${c._id}"">Detail</a>
                <a href="${tripIdFromUrl}/expenses/${c._id}/delete"">Verwijderen</a>
              </td>
            </tr>`;
          }
      })}
      `;
    }
  
    return html` <app-page-header>
        <app-page-title>Uitgaven</app-page-title>
        <app-button href="/trips/${tripIdFromUrl}/expenses" color="secondary"
          >Uitgave toevoegen</app-button
        >
      </app-page-header>
      <h3>Totaal uitgegeven = € ${totaleUitgave}</h3>
      <table class="table">
          <tr class="table__row">
            <th class="table__head">Uitgave</th>
            <th class="table__head">kost</th>
            <th class="table__head">Meer</th>
          </tr>
          ${content}
        </table>`;
  }

  static styles = [defaultStyles, tableStyles];
}

export default ExpenseOverview;
