import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { buttonStyles, defaultStyles } from "@styles/styles";
import { consume } from "@lit/context";
import { Router } from "@vaadin/router";

import "@components/design/Typography/PageTitle";
import "@components/design/Header/PageHeader";
import "@components/design/Grid/Grid";
import "@components/design/Button/Button";
import "@components/design/Card/AmountCard";
import { NoteContext, noteContext } from "./NoteDetailContainer";
import { deleteNote } from "@core/modules/notes/Note.api";

@customElement("note-delete")
class NoteDelete extends LitElement {
  @consume({ context: noteContext, subscribe: true })
  @property({ attribute: false })
  public noteContextValue?: NoteContext | null;
  
  handleSuccess = () => {
    const { noteContextValue } = this;
    if (noteContextValue) {
      noteContextValue.refresh();
    }
  };
  deleteHandler = () => {
    const { noteContextValue } = this;
    if (!noteContextValue || !noteContextValue.note) {
      return;
    }
    const { note } = noteContextValue;
    deleteNote(note._id).then(() => this.handleSuccess());
    const url = window.location.pathname;
    const tripIdFromUrl = url.split("/")[2];
    Router.go(`/trips/${tripIdFromUrl}`);
  };
  goBackHandler = () => {
    window.history.back()
  };

  render() {
    const { noteContextValue } = this;

    if (!noteContextValue || !noteContextValue.note) {
      return html``;
    }

    const { note } = noteContextValue;

    if (!note) {
      return html``;
    }

    return html`
      <app-page-header>
        <app-page-title>Note verwijderen</app-page-title>
      </app-page-header>
      <p>Ben je zeker dat je deze notitie ${note.title} wilt verwijderen?</p>

      <button class="btn-tertiary" @click="${this.deleteHandler}">Verwijderen</button>
      <app-button @click="${this.goBackHandler}">Annuleren</app-button>
    `;
  }

  static styles = [defaultStyles, buttonStyles];
}

export default NoteDelete;
