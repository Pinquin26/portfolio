import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { defaultStyles } from "@styles/styles";
import { consume } from "@lit/context";
import { TripContext, tripContext } from "./TripDetailContainer";
import { TripBody } from "@core/modules/trips/Trip.types";
import { updateTrip } from "@core/modules/trips/Trip.api";
import "@components/design/LoadingIndicator";
import "@components/design/ErrorView";
import "@components/design/Button/Button";
import "@components/design/Grid/Grid";
import "@components/design/Header/PageHeader";
import "@components/design/Typography/PageTitle";
import "@components/pages/trips/from/TripForm";


@customElement("trip-edit")
class TripEdit extends LitElement {
  @consume({ context: tripContext, subscribe: true })
  @property({ attribute: false })
  public tripContextValue?: TripContext | null;

  handleSuccess = () => {
    const { tripContextValue } = this;
    if (tripContextValue) {
      tripContextValue.refresh();
    }
  };

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
      <app-card>
        <app-page-header>
          <app-page-title>Trip aanpassen</app-page-title>
        </app-page-header>
        <trip-form
          submitLabel="Aanpassen"
          .onSuccess=${this.handleSuccess}
          .data=${trip}
          .method=${(body: TripBody) => updateTrip(trip._id, body)}
        ></trip-form>
        <a href="/trips/${trip._id}/delete">Trip verwijderen</a>
      </app-card>
    `;
  }

  static styles = [defaultStyles];
}

export default TripEdit;
