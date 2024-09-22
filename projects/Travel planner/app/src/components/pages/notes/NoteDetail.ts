import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { cardStyles, defaultStyles } from "@styles/styles";
import { consume } from "@lit/context";
import { NoteContext, noteContext } from "./NoteDetailContainer";

import "@components/design/Typography/PageTitle";
import "@components/design/Card/Card";
import "@components/design/Button/Button";
import "@components/design/Header/PageHeader";


@customElement("note-detail")
class NoteDetail extends LitElement {
  @consume({ context: noteContext, subscribe: true })
  @property({ attribute: false })
  public noteContextValue?: NoteContext | null;

  render() {
    
    
    const { noteContextValue } = this;

    if (!noteContextValue || !noteContextValue.note) {
      return html``;
    }

    const { note } = noteContextValue;

    return html`<app-card>
      <app-page-header>
        <app-page-title>${note.title}</app-page-title>
        <app-button href="${note._id}/edit" color="secondary"
          >Aanpassen</app-button
        >
      </app-page-header>
      <p class="card--content">${note.content}</p></app-card>
      
    `;
  }

  static styles = [defaultStyles, cardStyles];
}

export default NoteDetail;
