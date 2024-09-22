import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { cardStyles, defaultStyles } from "@styles/styles";
import "@components/design/LoadingIndicator";
import "@components/design/ErrorView";
import "@components/design/Button/Button";
import "@components/design/Typography/PageTitle";
import "@components/design/Header/PageHeader";
import "@components/design/Grid/Grid";
import "@components/design/Card/AmountCard";
import { Note } from "@core/modules/notes/Note.types";
import { getNotes } from "@core/modules/notes/Note.api";


@customElement("note-overview")
class NoteOverview extends LitElement {
  @property()
  isLoading: boolean = false;
  @property()
  notes: Array<Note> | null = null;
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
    getNotes()
      .then(({ data }) => {
        this.notes = data;
        this.isLoading = false;
      })
      .catch((error) => {
        this.error = error.message;
        this.isLoading = false;
      });
  }

  render() {
    const { isLoading, notes, error } = this;
    const url = window.location.pathname;
    const tripIdFromUrl = url.split("/")[2];
    let content = html``;
    if (error) {
      content = html`<error-view error=${error} />`;
    } else if (isLoading || !notes) {
      content = html`<loading-indicator></loading-indicator>`;
    } else if (notes.length === 0) {
      content = html`<p>Nog geen notities</p>`;
    }
    else {
      content = html` <app-grid>
        ${notes.map((c) => {
          if (c.tripId == tripIdFromUrl) {
            return html`<li>
              <app-card href="${tripIdFromUrl}/notes/${c._id}">${c.title}
              <div class="card--content"><p>${c.content}</p></div>
              </app-card>
            </li>`;
          }
            
      })}
      </app-grid>`;
    }
  

    return html` <app-page-header>
        <app-page-title>Notities</app-page-title>
        <app-button href="/trips/${tripIdFromUrl}/notes" color="secondary">note toevoegen</app-button>
      </app-page-header>
      ${content}`;
  }

  static styles = [defaultStyles, cardStyles];
}

export default NoteOverview;
