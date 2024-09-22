import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { buttonStyles, defaultStyles, formStyles, inputStyles } from "@styles/styles";
import { Router } from "@vaadin/router";
import { Activity, ActivityBody } from "@core/modules/activities/Activity.types";
import { AxiosResponse } from "axios";

import "@components/design/LoadingIndicator";
import "@components/design/ErrorView";
import { getTrips } from "@core/modules/trips/Trip.api";
import { Trip } from "@core/modules/trips/Trip.types";

@customElement("activity-form")
class ActivityForm extends LitElement {
  @property()
  isLoading: boolean = false;
  @property()
  error: string | null = null;
  @property()
  data: ActivityBody = {
    name: "",
    date: "",
    startTime: "",
    endTime: "",
    cost: 0,
    description: "",
    location: "",
    link: "",
    tripId: "",
  };
  @property()
  trips: Array<Trip> | null = null;
  @property()
  submitLabel: String = "Toevoegen";
  @property()
  method:
    | ((activity: ActivityBody) => Promise<AxiosResponse<Activity>>)
    | null = null;
  @property()
  onSuccess: (() => void) | null = null;
  
  // called when the element is first connected to the document’s DOM
  connectedCallback(): void {
    super.connectedCallback();
    this.fetchTrips();
  }

  fetchTrips() {
    getTrips()
      .then(({ data }) => {
        this.trips = data;
      })
      .catch((error) => {
        this.error = error;
      });
  }

  handleSubmit = (event: Event) => {
    if (!this.method) {
      return;
    }

    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const activity = {
      name: formData.get("name") as string,
      date: formData.get("date") as string,
      startTime: formData.get("startTime") as string,
      endTime: formData.get("endTime") as string,
      cost: formData.get("cost") as unknown as number,
      description: formData.get("description") as string,
      location: formData.get("location") as string,
      link: (formData.get("link") as string) || "https://example.org",
      tripId: formData.get("tripId") as string,
    };

    this.isLoading = true;

    this.method(activity)
      .then(({ data }) => {
        if (this.onSuccess) {
          this.onSuccess();
        }
        Router.go(`/activities/${data._id}`);
      })
      .catch((error) => {
        this.isLoading = false;
        this.error = error.message;
      });
  };

  render() {
    const { isLoading, error, submitLabel, handleSubmit, data } = this;
    return html` ${error ? html`<error-view error=${error} />` : ""}
      <form @submit=${handleSubmit}>
        <div class="form-control">
          <label class="form-control__label" for="name">Activiteit naam</label>
          <input
            class="form-control__input"
            type="text"
            name="name"
            id="name"
            .value=${data.name}
            placeholder="Activiteit awesome"
            ?disabled=${isLoading}
            required
          />
          <div class="form-control">
        <label class="form-control__label" for="date">Datum activiteit</label>
        <input
          class="form-control__input"
          type="date"
          name="date"
          id="date"
          .value=${data.date}
          placeholder="dd/mm/yy"
          ?disabled=${isLoading}
          required
        />
        </div>
        <div class="form-control">
        <label class="form-control__label" for="startTime">Start uur acitiviteit</label>
        <input
          class="form-control__input"
          type="time"
          name="startTime"
          id="startTime"
          .value=${data.startTime}
          placeholder="uu:mm"
          ?disabled=${isLoading}
          required
        />
        </div>
        <div class="form-control">
        <label class="form-control__label" for="endTime">Eind uur acitiviteit</label>
        <input
          class="form-control__input"
          type="time"
          name="endTime"
          id="endTime"
          .value=${data.endTime}
          placeholder="uu:mm"
          ?disabled=${isLoading}
          required
        />
        <div class="form-control">
          <label class="form-control__label" for="cost">Kost activiteit</label>
          <input
            class="form-control__input"
            name="cost"
            id="cost"
            type="number"
            .value=${data.cost}
            placeholder="Kost"
            ?disabled=${isLoading}
            required
          ></input>
        </div>
        <div class="form-control">
          <label class="form-control__label" for="description">Omschrijving</label>
          <textarea
            class="form-control__input"
            name="description"
            id="description"
            .value=${data.description}
            placeholder="omschrijving"
            ?disabled=${isLoading}
            required
          ></textarea>
        </div>
        <div class="form-control">
          <label class="form-control__label" for="location">Locatie</label>
          <textarea
            class="form-control__input"
            name="location"
            id="location"
            .value=${data.location}
            placeholder="omschrijving"
            ?disabled=${isLoading}
            required
          ></textarea>
        </div>
        <div class="form-control">
          <label class="form-control__label" for="link">Link voor meer</label>
          <textarea
            class="form-control__input"
            name="link"
            id="link"
            .value=${data.link}
            placeholder="https://example.org"
            ?disabled=${isLoading}
          ></textarea>
        </div>
        </div>
        <div class="form-control">
          <label class="form-control__label" for="name">Bij welke trip hoort deze activiteit?</label>
          <select
            class="form-control__input"
            type="text"
            name="tripId"
            id="tripId"
            .value=${data.tripId}
            ?disabled=${isLoading}
            required
          >
            <option>--</option>
            ${this.trips?.map((c) => {
              return html`<option
                value=${c._id}
                .selected=${c._id === data.tripId}
              >
                ${c.name}
              </option>`;
            })}
          </select>
        </div>
        <button class="btn-primary" type="submit" ?disabled=${isLoading}>
          ${submitLabel}
        </button>
      </form>`;
  }

  static styles = [defaultStyles, inputStyles, buttonStyles, formStyles];
}

export default ActivityForm;
