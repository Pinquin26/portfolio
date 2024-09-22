import { defaultStyles } from "@styles/styles";
//import { defaultStyles } from "../../style/styles";
import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";


@customElement("app-logo")
class Logo extends LitElement {
  render() {
    return html`<img class="logo" src="/logo2.png" alt="Tracky" />`;
  }

  static styles = [
    defaultStyles,
    css`
      .logo {
        width: 10rem;
        display:flex;
      }
    `,
  ];
}

export default Logo;
