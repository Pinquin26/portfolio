import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { getActivities } from "@core/modules/activities/Activity.api";
import { Activity } from "@core/modules/activities/Activity.types";
import { defaultStyles, tableStyles } from "@styles/styles";
import "@components/design/LoadingIndicator";
import "@components/design/ErrorView";
import "@components/design/Button/Button";
import "@components/design/Typography/PageTitle";
import "@components/design/Header/PageHeader";
import "@components/design/Grid/Grid";
import "@components/design/Card/Card";
import { format, parseISO } from "date-fns";

@customElement("activity-overview")
class ActivityOverview extends LitElement {
  @property()
  isLoading: boolean = false;
  @property()
  activities: Array<Activity> | null = null;
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
    getActivities()
      .then(({ data }) => {
        this.activities = data;
        this.isLoading = false;
      })
      .catch((error) => {
        this.error = error.message;
        this.isLoading = false;
      });
  }

  render() {
    const { isLoading, activities, error } = this;
    const url = window.location.pathname;
    const tripIdFromUrl = url.split("/")[2];
    let activitiesAvailable: boolean = false;
    let content = html``;

    if (error) {
      content = html`<error-view error=${error} />`;
    } else if (isLoading || !activities) {
      content = html`<loading-indicator></loading-indicator>`;
    } else if (activities.length === 0) {
      content = html`<p>Nog geen activiteiten</p>`;
    } else {
      content = html` ${activities.map((c) => {
        if (tripIdFromUrl) {
          if (c.tripId === tripIdFromUrl && c.date) {
            activitiesAvailable = true;
            return html` <tr class="table__row">
              <td class="table__item">${c.name}</td>
              <td class="table__item">
                ${format(parseISO(c.date), "dd-MM-yyyy")} om ${c.startTime}
              </td>
              <td class="table__item">${c.cost}</td>
              <td class="table__item">
                <a href="/activities/${c._id}">Details</a>
              </td>
            </tr>`;
          }
        } else if (!tripIdFromUrl && c.date) {
          return html`<app-card href="/activities/${c._id}">
              <div>${c.name}</div>
              <div><img class="icon"src="/calendar.png"> ${format(parseISO(c.date), "dd-MM-yyyy")}</div>
            </app-card>`;
        }
      })}`;
    }

    if (activitiesAvailable) {
      return html` <app-page-header>
          <app-page-title>Activiteiten</app-page-title>
          <app-button href="/activities/create"
            >Activiteit toevoegen</app-button
          ></app-page-header
        >
        <table class="table">
          <tr class="table__row">
            <th class="table__head">Activiteit</th>
            <th class="table__head">Tijdstip</th>
            <th class="table__head">kost</th>
            <th class="table__head">Meer</th>
          </tr>
          ${content}
        </table>`;
    }

    return html` <app-page-header>
        <app-page-title>Activiteiten</app-page-title>
        <app-button href="/activities/create"
          >Activiteit toevoegen</app-button
        ></app-page-header
      >
      <app-grid>${content}</app-grid>`;
  }

  static styles = [defaultStyles, tableStyles];
}

export default ActivityOverview;
