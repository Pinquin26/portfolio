import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import {  buttonStyles, defaultStyles } from "@styles/styles";
import { consume } from "@lit/context";
import { TripContext, tripContext } from "./TripDetailContainer";

import "@components/design/LoadingIndicator";
import "@components/design/ErrorView";
import "@components/design/Typography/PageTitle";
import "@components/design/Header/PageHeader";
import "@components/design/Button/Button";
import "@components/design/Grid/Grid";
import "@components/pages/notes/NoteOverView";
import "@components/pages/activities/ActivityOverview";
import "@components/pages/trips/TripCountDown";
import "@components/pages/expenses/ExpenseOverView";
import { format, parseISO } from "date-fns";

@customElement("trip-detail")
class TripDetail extends LitElement {
  @consume({ context: tripContext, subscribe: true })
  @property({ attribute: false })
  public tripContextValue?: TripContext | null;

  render() {
    const { tripContextValue } = this;

    if (!tripContextValue || !tripContextValue.trip) {
      return html``;
    }

    const { trip } = tripContextValue;

    if (!trip) {
      return html``;
    }

    return html`
      <app-page-header>
        <app-page-title>${trip.land}</app-page-title>
        <app-button href="/trips/${trip._id}/edit" color="secondary"
          >Aanpassen</app-button
        >
      </app-page-header>
      <trip-countdown></trip-countdown>
      <h3>Start datum:</h3>
      <p>${format(parseISO(trip.date.startDate), "dd-MM-yyyy")}</p>
      <h3>Eind datum:</h3>
      <p>${format(parseISO(trip.date.endDate), "dd-MM-yyyy")}</p>

      <note-overview></note-overview>
      <activity-overview></activity-overview>
      <expense-overview></expense-overview>
    `;
  }

  static styles = [defaultStyles, buttonStyles];
}

export default TripDetail;
