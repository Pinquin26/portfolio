import { logout } from "@components/auth/AuthContainer";
import { User } from "@core/modules/user/User.types";
import { consume } from "@lit/context";
import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { buttonStyles, defaultStyles } from "@styles/styles";
import userContext from "@components/auth/UserContext";

import "@components/design/Logo/Logo";
import { router } from "@core/router";
import { getCurrentUser } from "@core/modules/user/User.api";

@customElement("app-navigation")
class Navigation extends LitElement {
  @consume({ context: userContext, subscribe: true })
  @property({ attribute: false })
  public user?: User | null;
  @property()
  isLoading: boolean = false;
  @property()
  error: string | null = null;
  @property({ type: Object }) location = router.location;

  connectedCallback(): void {
    super.connectedCallback();
    this.fetchData();
    window.addEventListener(
      "vaadin-router-location-changed",
      this.handleRouteChange
    );
  }

  handleRouteChange = () => {
    // location update to trigger re-render
    this.location = router.location;
  };

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener(
      "vaadin-router-location-changed",
      this.handleRouteChange
    );
  }

  handleLogout = () => {
    logout();
  };

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
  render() {
    const { location, user, error, isLoading } = this;
    const { pathname } = location;

    if (error) {
      return html`<error-view error=${error} />`;
    } else if (isLoading) {
      return html`<loading-indicator></loading-indicator>`;
    } else {
      return html`<header class="header">
        <a class="header__logo" href="/"><app-logo /></a>
        <nav class="header__nav">
          <ul class="main-nav">
            <li
              class="main-nav__item ${pathname === "/"
                ? "main-nav__item--active"
                : ""}"
            >
              <a href="/">Home</a>
            </li>
            <li
              class="main-nav__item ${pathname.includes("activities")
                ? "main-nav__item--active"
                : ""}"
            >
              <a href="/activities">Activiteiten</a>
            </li>
            <li
              class="main-nav__item ${pathname.includes("trips")
                ? "main-nav__item--active"
                : ""}"
            >
              <a href="/trips">Trips</a>
            </li>
            <li
              class="main-nav__item ${pathname.includes("account")
                ? "main-nav__item--active"
                : ""}"
            >
              <a href="/account">Account</a>
            </li>
          </ul>
        </nav>
        <a href="/account" class="header__user">${user?.name} ${user?.firstName}</a>
        <button
          class="header__logout btn-secondary"
          @click=${this.handleLogout}
        >
          Uitloggen
        </button>
      </header>`;
    }
  }

  static styles = [
    defaultStyles,
    buttonStyles,
    css`
      .header {
        display: flex;
        flex-direction: column;
        background: var(--primary900);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        color: var(--text-color-white);
        padding: 2rem 1rem;
        height: 100%;
        width: 14rem;

        position: fixed;
      }

      .header__logo {
        width: 5.406rem;
      }

      .header__nav {
        margin-top: 2rem;
      }

      .header__user {
        margin-top: auto;
        overflow-wrap: break-word;
        word-wrap: break-word;
        text-decoration: none;
      }

      .main-nav {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .main-nav__item {
        margin-bottom: 0.5rem;
      }

      .main-nav__item a {
        text-decoration: none;
        color: var(--text-color-gold);
      }

      .main-nav__item--active a {
        font-weight: var(--font-weight-bold);
      }
    `,
  ];
}

export default Navigation;
