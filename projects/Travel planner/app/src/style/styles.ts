import { css } from "lit";

export const defaultStyles = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  * {
    margin: 0;
  }

  a {
    color: inherit;
  }
  .a-secondary {
    margin: 0.5rem 0 0.75rem 0;
    padding: 0.75rem 1rem;
    color: white;
    font-weight: var(--font-weight-bold);
    cursor: pointer;
  }

  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
  }

  input {
    display: block;
  }

  .icon {
    max-width:1.5rem;
    display:inline;
  }
`;

// styles we need for the button and input components since they need to be direct children of form
export const buttonStyles = css`
  .btn-primary {
    display: inline-block;
    margin: 0.5rem 0 0.75rem 0;
    padding: 0.75rem 1rem;

    background-color: var(--primary);
    color: white;
    border: none;
    border-radius: var(--border-radius);
    font-weight: var(--font-weight-bold);

    cursor: pointer;

    text-decoration: none;
  }

  .btn-secondary {
    display: inline-block;
    margin: 0.5rem 0 0.75rem 0;
    padding: 0.75rem 1rem;

    background-color: var(--secondary);
    color: white;
    border: none;
    border-radius: var(--border-radius);
    font-weight: var(--font-weight-bold);

    cursor: pointer;

    text-decoration: none;
  }

  .btn-tertiary {
    display: inline-block;
    margin: 0.5rem 0 0.75rem 0;
    padding: 0.75rem 1rem;

    background-color: #005aa8;
    color: white;
    border: none;
    border-radius: var(--border-radius);
    font-weight: var(--font-weight-bold);

    cursor: pointer;

    text-decoration: none;
  }

  .btn-primary:hover {
    opacity: 0.9;
  }
`;

// styles we need for the button and input components since they need to be direct children of form
export const formStyles = css`
  .form {
    width: 100%;
  }
  .form--inline {
    width: "100%";
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 1rem;
  }
  .form-control {
    margin: 0.5rem 0 0.75rem 0;
  }
  .form-control__label {
    display: block;
    margin-bottom: 0.25rem;
  }
  .form-control__input {
    display: block;
    padding: 0.75rem 1rem;
    width: 100%;
    background-color: var(--background);
    max-width: 36rem;

    border: none;
    border-radius: var(--border-radius);
  }
  .form-control__input-small {
    display: block;
    padding: 0.75rem 1rem;
    background-color: var(--background);
    max-width: 18rem;
    width:100%;
    border: none;
    border-radius: var(--border-radius);
  }
`;

export const tableStyles = css`
  .table {
    width: 100%;
    margin-bottom: 1rem;
    max-width: 100%;
    background-color: white;
    border-radius: var(--border-radius);
    padding: 2px;
    table-layout: fixed;
  }

  .table__row {
    margin: 0;
    border-radius: var(--border-radius);
  }
  .table__row:nth-of-type(even) {
    background: var(--background);
  }

  .table__head {
    padding: 0.5rem;
    text-align: left;
    font-weight: bold;
  }
  th:nth-child(1) {
    width: 30%;
  }

  th:nth-child(2) {
    width: 30%;
  }

  th:nth-child(3) {
    width: 20%;
  }
  th:nth-child(4) {
    width: 20%;
  }

  .table__item {
    padding: 0.5rem;
    text-align: left;
  }
`;

export const inputStyles = css`
  .form-control {
    margin: 0.5rem 0 0.75rem 0;
  }
`;
export const cardStyles = css`
  .card--content {
    background-color: var(--background);
    border-radius: var(--border-radius);
    padding: 0.5rem;
    height: 5rem;
    overflow: hidden;
  }
`;
export const countdownStyles = css`
  .countdown {
    color: var(--text-color-gold);
    font-size: 1.6rem;
  }
`;

export const loginsStyle = css`
  .split {
    display: flex;
    height: 100vh;
    width: 100vw;
    max-width: 100%;
    align-items: center;
    background-size:cover;
    background: var(--primary900);
    color: var(--text-color-gold);
  }
  .left__background {
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 50%;
    object-fit: cover;
    opacity: 0.8;
    background: linear-gradient(
          135deg,
          var(--text-color-gold) 25%,
          transparent 25%
        ) -10px 0/ 20px 20px,
      linear-gradient(225deg, var(--primary900) 25%, transparent 25%) -10px 0/
        20px 20px,
      linear-gradient(315deg, var(--text-color-gold) 25%, transparent 25%) 0px 0/
        20px 20px,
      linear-gradient(45deg, var(--primary900) 25%, var(--primary) 25%) 0px 0/ 20px
        20px;
  }
  .left__title {
    position: absolute;
    top: 30%;
    font-size: 2.8rem;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .split__left {
    position: relative;
    display: inline;
    background-color: #005aa8;
    height: 100%;
    width: 60vw;
  }
  .split__right {
    flex: 1;
    padding: 5rem 2rem;
  }
  .form {
    margin-top: 1rem;
  }
  .spacer {
    justify-content: space-between;
    display: flex;
  }
`;

