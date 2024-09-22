import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { getTrips } from "@core/modules/trips/Trip.api";
import { Trip } from "@core/modules/trips/Trip.types";
import { cardStyles, defaultStyles } from "@styles/styles";
import "@components/design/LoadingIndicator";
import "@components/design/ErrorView";
import "@components/design/Button/Button";
import "@components/design/Grid/Grid";
import "@components/design/Card/Card";
import { format, parseISO } from "date-fns";
import "@components/design/Header/PageHeader";
import "@components/design/Typography/PageTitle";

@customElement("trip-overview")
class TripOverview extends LitElement {
  @property()
  isLoading: boolean = false;
  @property()
  trips: Array<Trip> | null = null;
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
    getTrips()
      .then(({ data }) => {
        this.trips = data;
        this.isLoading = false;
      })
      .catch((error) => {
        this.error = error.message;
        this.isLoading = false;
      });
  }

  render() {
    const { isLoading, trips, error } = this;

    let content = html``;
    if (error) {
      content = html`<error-view error=${error} />`;
    } else if (isLoading || !trips) {
      content = html`<loading-indicator></loading-indicator>`;
    } else if (trips.length === 0) {
      content = html`<p>Nog geen trips</p>`;
    } else {
      content = html`
        ${trips.map((c) => {
          return html`
            <app-card href="/trips/${c._id}">
              <div>${c.name}</div>
              <div><img class="icon"src="/calendar.png"> ${format(parseISO(c.date.startDate), "dd-MM-yyyy")}</div>
            </app-card>
          `;
        })}
      `;
    }

    return html` <app-page-header>
        <app-page-title>Trips</app-page-title>
        <app-button href="/trips/create">Trip toevoegen</app-button>
      </app-page-header>
      <app-grid>${content}</app-grid>`;
  }

  static styles = [
    cardStyles,
    defaultStyles,
  ];
}


export default TripOverview;
