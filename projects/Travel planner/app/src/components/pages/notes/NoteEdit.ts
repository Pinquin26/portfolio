import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { defaultStyles } from "@styles/styles";

import "@components/pages/notes/form/NoteForm";
import "@components/design/Typography/PageTitle";
import "@components/design/Card/Card";

import { consume } from "@lit/context";
import { NoteContext, noteContext } from "./NoteDetailContainer";
import { NoteBody } from "@core/modules/notes/Note.types";
import { updateNote } from "@core/modules/notes/Note.api";

@customElement("note-edit")
class NoteEdit extends LitElement {
  @consume({ context: noteContext, subscribe: true })
  @property({ attribute: false })
  public noteContextValue?: NoteContext | null;
  
  handleSuccess = () => {
    const { noteContextValue } = this;

    if (noteContextValue) {
      noteContextValue.refresh();
    }
  };

  render() {
    const { noteContextValue, handleSuccess } = this;

    if (!noteContextValue || !noteContextValue.note) {
      return html``;
    }

    const { note } = noteContextValue;
    
    return html` <app-card> <app-page-title>Note aanpassen</app-page-title>
      <note-form
        submitLabel="Aanpassen"
        .data=${note}
        .onSuccess=${handleSuccess}
        .method=${(body: NoteBody) => updateNote(note._id, body)}
      ></note-form>
      <a href="delete">Note verwijderen</a></app-card>`;
  }

  static styles = [defaultStyles];
}

export default NoteEdit;
