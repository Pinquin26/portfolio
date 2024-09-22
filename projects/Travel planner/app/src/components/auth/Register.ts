import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import {
  buttonStyles,
  defaultStyles,
  formStyles,
  inputStyles,
  loginsStyle,
} from "@styles/styles";

import "@components/pages/activities/from/ActivityForm";
import "@components/design/LoadingIndicator";
import "@components/design/ErrorView";
import "@components/design/Header/PageHeader";
import "@components/design/Typography/PageTitle";
import "@components/design/Card/Card";
import { newUser } from "@core/modules/register/Register.api";
import { NewUserBody } from "@core/modules/register/Register.types";
import { Router } from "@vaadin/router";

@customElement("register-page")
class RegisterPage extends LitElement {
  @property()
  isLoading: boolean = false;
  @property()
  error: string | null = null;
  @property()
  data: NewUserBody = {
    firstName: "",
    name: "",
    dateOfBirth: "",
    email: "",
    password: "",
  };
  @property()
  submitLabel: String = "Toevoegen";

  handleSubmit = (event: Event) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const firstName = formData.get("firstName") as string;
    const name = formData.get("name") as string;
    const dateOfBirth = formData.get("dateOfBirth") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    this.isLoading = true;

    newUser({ firstName, name,dateOfBirth, email, password })
      .then(() => {
        this.isLoading = false;
        Router.go("/");
      })
      .catch((error) => {
        this.isLoading = false;
        this.error = error.message;
      });
  };
  render() {
    const { isLoading, error, submitLabel, handleSubmit, data } = this;

    return html`${error ? html`<error-view error=${error} />` : ""}
    <div class="split">
        <div class="split__left">
          <div class="left__title">De plek om uw trip te plannen !</div>
          <div class="left__background"></div>
        </div>
        <div class="split__right">
      <app-page-header
        ><app-page-title>Een account aanmaken</app-page-title>
      </app-page-header>
      <app-card>
      <form @submit=${handleSubmit}>
        <div class="form-control">
          <label class="form-control__label" for="firstName">Voor naam</label>
          <input
            class="form-control__input"
            type="text"
            name="firstName"
            id="firstName"
            .value=${data.firstName}
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
            .value=${data.name}
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
            .value=${data.email}
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
            .value=${data.dateOfBirth}
            ?disabled=${isLoading}
            required
          />
          <div class="form-control">
        <div class="form-control">
          <label class="form-control__label" for="password">Passwoord</label>
          <input
            class="form-control__input"
            type="password"
            name="password"
            id="password"
            .value=${data.password}
            placeholder="voorbeeldWachtWoord123"
            ?disabled=${isLoading}
            required
          />
          <div class="form-control">
        <div class="spacer">
          <a >
            <button class="btn-primary" type="submit" ?disabled=${isLoading}>
              ${submitLabel}
            </button>
          </a>
          <a href="/" class="spacer__link">Terug</a>
        </div>
      </form>
      </app-card>
    </div>`;
  }

  static styles = [
    defaultStyles,
    inputStyles,
    buttonStyles,
    formStyles,
    loginsStyle,
    css`
      .spacer__link {
        margin: 0.5rem 0 0.75rem 0;
        padding: 0.75rem 1rem;
        font-weight: var(--font-weight-bold);
        cursor: pointer;
      }
    `,
  ];
}

export default RegisterPage;
