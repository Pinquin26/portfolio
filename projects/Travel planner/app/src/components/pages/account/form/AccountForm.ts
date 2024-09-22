import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { buttonStyles, defaultStyles, formStyles, inputStyles } from "@styles/styles";
import { Router } from "@vaadin/router";
import { AxiosResponse } from "axios";
import { User, UserBody } from "@core/modules/user/User.types";
import { getCurrentUser } from "@core/modules/user/User.api";
import { consume } from "@lit/context";
import userContext from "@components/auth/UserContext";

import "@components/design/LoadingIndicator";
import "@components/design/ErrorView";

@customElement("user-form")
class UserForm extends LitElement {
  @consume({ context: userContext, subscribe: true })
  @property({ attribute: false })
  public user?: User | null;
  @property()
  isLoading: boolean = false;
  @property()
  error: string | null = null;
  @property()
  data: UserBody = {
    firstName: "",
    name: "",
    email: "",
    dateOfBirth: "",
  };
  @property()
  submitLabel: String = "Toevoegen";
  @property()
  method: ((user: UserBody) => Promise<AxiosResponse<User>>) | null = null;
  @property()
  onSuccess: (() => void) | null = null;

  // called when the element is first connected to the document’s DOM
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

  handleSubmit = (event: Event) => {
    if (!this.method) {
      return;
    }

    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const user = {
      firstName: formData.get("firstName") as string,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      dateOfBirth: formData.get("dateOfBirth") as string,
    };

    this.isLoading = true;

    this.method(user)
      .then(() => {
        if (this.onSuccess) {
          this.onSuccess();
        }
        Router.go(`/account`);
      })
      .catch((error) => {
        this.isLoading = false;
        this.error = error.message;
      });
  };

  render() {
    const { isLoading, error, submitLabel, handleSubmit, user } = this;
    return html` ${error ? html`<error-view error=${error} />` : ""}
      <form @submit=${handleSubmit}>
        <div class="form-control">
          <label class="form-control__label" for="firstName">Voor naam</label>
          <input
            class="form-control__input"
            type="text"
            name="firstName"
            id="firstName"
            .value=${user?.firstName}
            placeholder="Pieter"
            ?disabled=${isLoading}
            required
          />
          <div class="form-control">
        <div class="form-control">
          <label class="form-control__label" for="name">Naam</label>
          <input
            class="form-control__input"
            type="text"
            name="name"
            id="name"
            .value=${user?.name}
            placeholder="Jan"
            ?disabled=${isLoading}
            required
          />
          <div class="form-control">
        <div class="form-control">
          <label class="form-control__label" for="mail">Email</label>
          <input
            class="form-control__input"
            type="email"
            name="email"
            id="email"
            .value=${user?.email}
            placeholder="example@gmail.com"
            ?disabled=${isLoading}
            required
          />
          <div class="form-control">
        <div class="form-control">
          <label class="form-control__label" for="dateOfBirth">Geboorte datum</label>
          <input
            class="form-control__input"
            type="date"
            name="dateOfBirth"
            id="dateOfBirth"
            .value=${user?.dateOfBirth}
            ?disabled=${isLoading}
            required
          />
          <div class="form-control">
        <button class="btn-primary" type="submit" ?disabled=${isLoading}>
          ${submitLabel}
        </button>
      </form>`;
  }

  static styles = [defaultStyles, inputStyles, buttonStyles, formStyles];
}

export default UserForm;
