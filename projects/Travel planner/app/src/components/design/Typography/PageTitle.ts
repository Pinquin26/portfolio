import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { defaultStyles } from "@styles/styles";

@customElement("app-page-title")
class PageTitle extends LitElement {
  render() {
    return html`<h1><slot></slot></h1>`;
  }

  static styles = [
    defaultStyles,
    css`
      h1 {
        color: var(--text-color-gold);
        font-size: 2rem;
        font-weight: 700;
        margin: 0 0 2rem 0;
      }
    `,
  ];
}

export default PageTitle;
