import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { buttonStyles, defaultStyles, inputStyles, formStyles } from "@styles/styles";
import { Router } from "@vaadin/router";
import { Note, NoteBody } from "@core/modules/notes/Note.types";
import "@components/design/LoadingIndicator";
import "@components/design/ErrorView";
import "@components/design/Typography/PageTitle";
import "@components/design/Header/PageHeader";
import "@components/design/Grid/Grid";
import "@components/design/Card/AmountCard";
import { AxiosResponse } from "axios";
import { getTrips } from "@core/modules/trips/Trip.api";
import { Trip } from "@core/modules/trips/Trip.types";

@customElement("note-form")
class NoteForm extends LitElement {
  @property()
  isLoading: boolean = false;
  @property()
  error: string | null = null;
  @property()
  data: NoteBody = {
    title: "",
    content: "",
    tripId: "",
  };
  @property()
  trips: Array<Trip> | null = null;
  @property()
  submitLabel: String = "Toevoegen";
  @property()
  method: ((note: NoteBody) => Promise<AxiosResponse<Note>>) | null = null;
  connectedCallback(): void {
    super.connectedCallback();   
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

    const url = window.location.pathname;
    const tripIdFromUrl = url.split("/")[2];

    const formData = new FormData(event.target as HTMLFormElement);
    const note = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      tripId: tripIdFromUrl,
    };

    this.isLoading = true;
    

    this.method(note)
      .then(() => {
        Router.go(`/trips/${tripIdFromUrl}`);
      })
      .catch((error) => {
        this.isLoading = false;
        this.error = error.message;
      });
  };

  render() {
    const { isLoading, error, data, submitLabel, handleSubmit } = this;

    return html` ${error ? html`<error-view error=${error} />` : ""}
      <form @submit=${handleSubmit}>
        <div class="form-control">
          <label class="form-control__label" for="title">Titel</label>
          <input
            class="form-control__input"
            type="text"
            name="title"
            id="title"
            .value=${data.title}
            placeholder="Notitie titel"
            ?disabled=${isLoading}
            required
          />
        </div>
        <div class="form-control">
          <label class="form-control__label" for="content">Inhoud</label>
          <textarea
            class="form-control__input"
            name="content"
            id="content"
            .value=${data.content}
            placeholder="Notitie inhoud"
            ?disabled=${isLoading}
            required
          ></textarea>
        </div>
        <button class="btn-primary" type="submit" ?disabled=${isLoading}>
          ${submitLabel}
        </button>
      </form>`;
  }

  static styles = [defaultStyles, inputStyles, buttonStyles, formStyles];
}

export default NoteForm;
