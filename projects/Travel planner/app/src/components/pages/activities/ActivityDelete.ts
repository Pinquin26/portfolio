import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { buttonStyles, defaultStyles } from "@styles/styles";
import { consume } from "@lit/context";
import { ActivityContext, activityContext } from "./ActivityDetailContainer";
import { deleteActivity } from "@core/modules/activities/Activity.api";
import { Router } from "@vaadin/router";

import "@components/design/Typography/PageTitle";
import "@components/design/Header/PageHeader";
import "@components/design/Grid/Grid";
import "@components/design/Card/AmountCard";
import "@components/design/Button/Button";


@customElement("activity-delete")
class ActivityDelete extends LitElement {
  @consume({ context: activityContext, subscribe: true })
  @property({ attribute: false })
  public activityContextValue?: ActivityContext | null;
  handleSuccess = () => {
    const { activityContextValue } = this;
    if (activityContextValue) {
      activityContextValue.refresh();
    }
  };
  deleteHandler = () => {
    const { activityContextValue } = this;
    if (!activityContextValue || !activityContextValue.activity) {
      return;
    }
    const { activity } = activityContextValue;
    deleteActivity(activity._id, ).then(() => this.handleSuccess());
    Router.go("/activities");
  };
  goBackHandler = () => {
    Router.go("/activities");
  };

  render() {
    const { activityContextValue } = this;

    if (!activityContextValue || !activityContextValue.activity) {
      return html``;
    }

    const { activity } = activityContextValue;

    if (!activity) {
      return html``;
    }

    return html`
      <app-page-header>
        <app-page-title>Activiteit verwijderen</app-page-title>
      </app-page-header>
      <p>Ben je zeker dat je de activiteit ${activity.name} wilt verwijderen?</p>
      

      <button class="btn-tertiary" @click="${this.deleteHandler}">Verwijderen</button>
      <app-button @click="${this.goBackHandler}">Annuleren</app-button>
    `;
  }

  static styles = [defaultStyles, buttonStyles];
}

export default ActivityDelete;
