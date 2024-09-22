import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { defaultStyles, tableStyles } from "@styles/styles";
import { consume } from "@lit/context";
import { DashboardData, User } from "@core/modules/user/User.types";
import { getCurrentUser } from "@core/modules/user/User.api";

import "@components/design/Typography/PageTitle";
import "@components/design/Header/PageHeader";
import "@components/design/Grid/Grid";
import "@components/design/Card/AmountCard";
import userContext from "@components/auth/UserContext";
import { format, parseISO } from "date-fns";

@customElement("app-account")
class Home extends LitElement {
  @consume({ context: userContext, subscribe: true })
  @property({ attribute: false })
  public user?: User | null;
  @property()
  isLoading: boolean = false;
  @property()
  data: DashboardData | null = null;
  @property()
  error: string | null = null;

  connectedCallback(): void {
    super.connectedCallback();
    this.fetchData();
  }

  fetchData() {
    this.isLoading = true;
    getCurrentUser()
      .then(({ data }) => {
        this.user = data;
        this.isLoading = false;
      })
      .catch((error) => {
        this.error = error.message;
        this.isLoading = false;
      });
  }

  render() {
    const { user, isLoading, error } = this;

    if (!user) {
      return html ``;
    }

    let content = html``;
    if (error) {
      content = html`<error-view error=${error} />`;
    } else if (isLoading) {
      content = html`<loading-indicator></loading-indicator>`;
    } else {
      content = html`
        <table class="table">
          <tr class="table__row">
            <td>Voornaam:</td>
            <td>${user.firstName}</td>
          </tr>
          <tr class="table__row">
            <td>Naam:</td>
            <td>${user.name}</td>
          </tr>
          <tr class="table__row">
            <td>Email:</td>
            <td>${user.email}</td>
          </tr>
          <tr class="table__row">
            <td>Geboortedatum:</td>
            <td>${format(parseISO(user.dateOfBirth), "dd-MM-yyyy")}</td>
          </tr>
        </table>
      `;
    }

    return html`
      <app-page-header>
        <app-page-title>Account van ${user?.firstName} ${user?.name}</app-page-title>
      </app-page-header>
      <app-card> ${content} </app-card>
      <a href="account/edit">Gegevens bewerken</a>
    `;
  }

  static styles = [
    defaultStyles,
    tableStyles
  ];
}

export default Home;
