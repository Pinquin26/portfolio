import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import { defaultStyles } from "@styles/styles";
import { createActivity } from "@core/modules/activities/Activity.api";

import "@components/pages/activities/from/ActivityForm";
import "@components/design/Typography/PageTitle";
import "@components/design/Card/Card";

@customElement("activity-create")
class ActivityCreate extends LitElement {
  render() {
    return html` <app-page-title>Activiteit toevoegen</app-page-title>
      <app-card
        ><activity-form .method=${createActivity}></activity-form
      ></app-card>`;
  }

  static styles = [defaultStyles];
}

export default ActivityCreate;
