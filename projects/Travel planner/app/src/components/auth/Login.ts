import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

import "@components/design/LoadingIndicator";
import "@components/design/ErrorView";
import "@components/design/Logo/Logo";
import { login } from "@core/modules/auth/Auth.api";
import * as Storage from "@core/storage";
import { Router } from "@vaadin/router";
import { buttonStyles, defaultStyles, formStyles, inputStyles, loginsStyle } from "@styles/styles";


@customElement("login-page")
class Login extends LitElement {
  @property()
  isLoading: boolean = false;
  @property()
  error: string | null = null;

  handleSubmit(event: Event) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    this.isLoading = true;

    login({ email, password })
      .then(({ data }) => {
        this.isLoading = false;
        Storage.saveAuthToken(data.token);
        Router.go("/");
      })
      .catch((error) => {
        this.isLoading = false;
        this.error = error.message;
      });
  }

  render() {
    const { isLoading, error, handleSubmit } = this;

    return html`
      <div class="split">
        <div class="split__left">
          <div class="left__title">De plek om uw trip te plannen !</div>
          <div class="left__background"></div>
        </div>
        <div class="split__right">
          <div class="logo-title">
            <app-logo></app-logo>
            <h1>Tracky</h1>
          </div>
          ${error ? html`<error-view error=${error} />` : ""}
          <form @submit=${handleSubmit}>
            <div class="form-control">
              <label class="form-control__label" for="email">Email</label>
              <input
                class="form-control__input-small"
                type="email"
                name="email"
                id="email"
                placeholder="Pieter.jan@gmail.com"
                ?disabled=${isLoading}
                required
              />
            </div>
            <div class="form-control">
              <label class="form-control__label" for="password">Passwoord</label>
              <input
                class="form-control__input-small"
                type="password"
                name="password"
                id="password"
                ?disabled=${isLoading}
                required
              />
            </div>
            <div class="spacer">
              <button class="btn-tertiary" type="submit" ?disabled=${isLoading}>
                Login
              </button>
              <a class="a-secondary" href="register"> Registeren </a>
            </div>
          </form>
        </div>
      </div>
    `;
  }
  static styles = [
    defaultStyles,
    inputStyles,
    formStyles,
    buttonStyles,
    loginsStyle,
    css`
      .logo-title {
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin: 1rem 0;
      }
      h1 {
        display: flex;
        font-size: 4rem;
      }
      
    `,
  ];
}

export default Login;
