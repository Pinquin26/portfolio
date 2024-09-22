import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { defaultStyles } from "@styles/styles";

import "@components/pages/notes/form/NoteForm";
import "@components/design/Typography/PageTitle";
import { createNote } from "@core/modules/notes/Note.api";
import "@components/design/Card/Card";


@customElement("note-create")
class NoteCreate extends LitElement {
  render() {
    return html` <app-page-title>Notitie toevoegen</app-page-title>
      <app-card><note-form .method=${createNote}></note-form></app-card>`;
  }

  static styles = [defaultStyles];
}

export default NoteCreate;
