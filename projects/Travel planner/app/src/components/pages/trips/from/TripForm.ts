import { buttonStyles, defaultStyles, formStyles } from "@styles/styles";
import { Trip, TripBody } from "@core/modules/trips/Trip.types";
import { Router } from "@vaadin/router";
import { AxiosResponse } from "axios";
import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import "@components/design/Typography/PageTitle";
import "@components/design/Header/PageHeader";
import "@components/design/Grid/Grid";
import "@components/design/Card/AmountCard";
import "@components/pages/trips/TripCountDown";
import { format, parseISO } from "date-fns";

@customElement("trip-form")
class TripForm extends LitElement {
  @property()
  isLoading: boolean = false;
  @property()
  error: string | null = null;
  @property()
  submitLabel: string = "Toevoegen";
  @property()
  method: ((trip: TripBody) => Promise<AxiosResponse<Trip>>) | null = null;
  @property()
  onSuccess: (() => void) | null = null;
  @property()
  data: TripBody = {
    name: "",
    land: "",
    city: "",
    date: {
      startDate: "",
      endDate: "",
    },
  };




  handleSubmit = (event: Event) => {
    event.preventDefault();

    if (!this.method) {
      return;
    }

    const formData = new FormData(event.target as HTMLFormElement);
    const trip = {
      name: formData.get("name") as string,
      land: formData.get("land") as string,
      city: formData.get("city") as string,
      date: {
        startDate: formData.get("date_startDate") as string,
        endDate: formData.get("date_endDate") as string,
      },
    };

    if (
      format(parseISO(trip.date.endDate), "MM.dd") <
      format(parseISO(trip.date.startDate), "MM.dd")
    ) {
      alert("Eind datum kan niet voor de start datum liggen.");
      return;
    }

    this.isLoading = true;
    this.method(trip)
      .then(({ data }) => {
        if (this.onSuccess) {
          this.onSuccess();
        }
        Router.go(`/trips/${data._id}`);
      })
      .catch((error) => {
        console.log(error)
        this.isLoading = false;
        this.error = error;
      });
  };

  render() {
    const { isLoading, handleSubmit, data, error, submitLabel } = this;
    
    let today = new Date().toISOString().slice(0, 10);
    
    return html`
      ${error ? html` <error-view error=${error} />` : ""}
      <form @submit=${handleSubmit}>
        <h3>Algemeen</h3>
        <div class="form-control">
          <label class="form-control__label" for="name">Naam van uw trip</label>
          <input
            class="form-control__input"
            type="text"
            name="name"
            id="name"
            .value=${data.name}
            placeholder=""
            ?disabled=${isLoading}
            required
          />
        </div>
        <div class="form-control">
          <label class="form-control__label" for="land">Trip land</label>
          <input
            class="form-control__input"
            type="text"
            name="land"
            id="land"
            .value=${data.land}
            placeholder=""
            ?disabled=${isLoading}
            required
          />
        </div>
        <div class="form-control">
          <label class="form-control__label" for="city">Stad</label>
          <input
            class="form-control__input"
            type="text"
            name="city"
            id="city"
            .value=${data.city}
            placeholder=""
            ?disabled=${isLoading}
            required
          />
        </div>
        <h3>Datum</h3>
        <div class="form-control">
          <label class="form-control__label" for="date_startDate"
            >Start datum trip</label
          >
          <input
            class="form-control__input"
            type="date"
            name="date_startDate"
            id="date_startDate"
            min=${today}
            .value=${data.date.startDate}
            placeholder="dd/mm/yy"
            ?disabled=${isLoading}
            required
          />
        </div>
        <div class="form-control">
          <label class="form-control__label" for="date_endDate"
            >Eind datum trip</label
          >
          <input
            class="form-control__input"
            type="date"
            name="date_endDate"
            id="date_endDate"
            min=${today}
            .value=${data.date.endDate}
            placeholder="dd/mm/yy"
            ?disabled=${isLoading}
            required
          />
        </div>
        <button class="btn-primary" type="submit" ?disabled=${isLoading}>
          ${submitLabel}
        </button>
      </form>
    `;
  }

  static styles = [defaultStyles, buttonStyles, formStyles];
}

export default TripForm;