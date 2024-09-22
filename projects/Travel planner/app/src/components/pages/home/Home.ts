import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { defaultStyles } from "@styles/styles";
import { consume } from "@lit/context";
import { DashboardData, User } from "@core/modules/user/User.types";
import { getCurrentUser, getDashboardData } from "@core/modules/user/User.api";

import "@components/design/Typography/PageTitle";
import "@components/design/Header/PageHeader";
import "@components/design/Grid/Grid";
import "@components/design/Card/AmountCard";
import userContext from "@components/auth/UserContext";
import { format, parseISO } from "date-fns";

@customElement("app-home")
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
    getDashboardData()
      .then(({ data }) => {
        this.data = data;
        this.isLoading = false;
      })
      .catch((error) => {
        this.error = error.message;
        this.isLoading = false;
      });
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
    const { user, isLoading, error, data } = this;

    let content = html``;
    let today = new Date();
    let month = today.getMonth() + 1; // De maanden zijn 0-geïndexeerd, dus voeg 1 toe
    let day = today.getDate();

    let formattedMonth = month < 10 ? "0" + month : month;
    let formattedDay = day < 10 ? "0" + day : day;

    let todayDayMonth = `${formattedDay}-${formattedMonth}`;
    
    if (error) {
      content = html`<error-view error=${error} />`;
    } else if (isLoading || !data) {
      content = html`<loading-indicator></loading-indicator>`;
    } else {
      content = html`<app-grid>
        <app-amount-card
          title="Trips"
          amount=${data.trips}
          href="/trips"
        ></app-amount-card>
        <app-amount-card
          title="Activiteiten"
          amount=${data.activities}
          href="/activities"
        ></app-amount-card>
        <app-amount-card
          title="Notities"
          amount=${data.notes}
        ></app-amount-card>
      </app-grid>`;
    }

    if (user && todayDayMonth === format(parseISO(user.dateOfBirth), "dd-MM")) {

      return html`
        <app-page-header>
          <app-page-title
            >Fijne verjaardag ${user.firstName}, hopelijk heb je
            iets tofs gepland!</app-page-title
          >
        </app-page-header>
        ${content}
      `;
    }
    return html`
      <app-page-header>
        <app-page-title>Welkom ${user?.firstName} ${user?.name}</app-page-title>
      </app-page-header>
      ${content}
    `;
  }

  static styles = [defaultStyles];
}

export default Home;
