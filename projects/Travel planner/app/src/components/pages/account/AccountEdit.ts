import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { defaultStyles } from "@styles/styles";

import "@components/pages/activities/from/ActivityForm";
import "@components/design/Typography/PageTitle";
import "@components/design/Card/Card";
import "@components/pages/account/form/AccountForm";
import { consume } from "@lit/context";
import userContext from "@components/auth/UserContext";
import { User, UserBody } from "@core/modules/user/User.types";
import { Router } from "@vaadin/router";

import { getCurrentUser, updateUser } from "@core/modules/user/User.api";

@customElement("account-edit")
class AccountEdit extends LitElement {
  @consume({ context: userContext, subscribe: true })
  @property({ attribute: false })
  public user?: User | null;
  @property()
  isLoading: boolean = false;
  @property()
  error: string | null = null;

  connectedCallback(): void {
    super.connectedCallback();
    this.fetchData();
  }

  fetchData() {
    this.isLoading = true;
    getCurrentUser()
      .then(({ data }) => {
        this.user = data;
        this.isLoading = false;
      })
      .catch((error) => {
        this.error = error.message;
        this.isLoading = false;
      });
  }
  handleSuccess = () => {
    Router.go("/account");
  };
  render() {
    const { user, handleSuccess } = this;
    if (!user) {
      return html``;
    }

    return html` <app-card>
      <app-page-title>Account aanpassen</app-page-title>
      <user-form
        submitLabel="Aanpassen"
        .data=${user}
        .onSuccess=${handleSuccess}
        .method=${(body: UserBody) => updateUser(user._id, body)}
      ></user-form>
    </app-card>`;
  }

  static styles = [defaultStyles];
}

export default AccountEdit;
