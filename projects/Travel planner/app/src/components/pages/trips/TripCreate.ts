import { LitElement, html } from "lit";
import "@components/design/Typography/PageTitle";
import "@components/pages/trips/from/TripForm";
import { customElement } from "lit/decorators.js";
import { createTrip } from "@core/modules/trips/Trip.api";
import { defaultStyles } from "@styles/styles";
import "@components/design/Card/Card";


@customElement("trip-create")
class TripCreate extends LitElement {
  render() {
    return html`<app-page-title>Trip Toevoegen</app-page-title>
      <app-card><trip-form .method=${createTrip}><trip-form></trip-form></app-card>`;
  }
  static styles = [defaultStyles];
}
export default TripCreate;