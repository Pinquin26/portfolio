import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { buttonStyles, defaultStyles } from "@styles/styles";
import { consume } from "@lit/context";
import { TripContext, tripContext } from "./TripDetailContainer";
import { deleteTrip } from "@core/modules/trips/Trip.api";
import { Router } from "@vaadin/router";

import "@components/design/Typography/PageTitle";
import "@components/design/Header/PageHeader";
import "@components/design/Grid/Grid";
import "@components/design/Card/AmountCard";
import "@components/design/Button/Button";




@customElement("trip-delete")
class TripDelete extends LitElement {
  @consume({ context: tripContext, subscribe: true })
  @property({ attribute: false })
  public tripContextValue?: TripContext | null;
  handleSuccess = () => {
      const { tripContextValue } = this;
      if (tripContextValue) {
        tripContextValue.refresh();
    }
    };
  deleteHandler = () => {
    const { tripContextValue } = this;
    if (!tripContextValue || !tripContextValue.trip) {
      return;
    }
    const { trip } = tripContextValue;
    deleteTrip(trip._id).then(() => this.handleSuccess());
    Router.go("/trips");
  };
  goBackHandler = () => {
    Router.go("/trips");
  }

  render() {
    const { tripContextValue } = this;

    if (!tripContextValue || !tripContextValue.trip) {
      return html``;
    }

    const { trip } = tripContextValue;

    if (!trip) {
      return html``;
    }

    return html` <app-page-header>
        <app-page-title>Trip verwijderen</app-page-title>
      </app-page-header>
      <p>Ben je zeker dat je de trip naar ${trip.land} wilt verwijderen?</p>

      <button class="btn-tertiary" @click="${this.deleteHandler}">Verwijderen</button>
      <app-button @click="${this.goBackHandler}">Annuleren</app-button>
      `
  }

  static styles = [defaultStyles, buttonStyles];
}

export default TripDelete;
