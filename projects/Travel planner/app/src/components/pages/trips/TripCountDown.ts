import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { TripContext, tripContext } from "./TripDetailContainer";
import { consume } from "@lit/context";
import { countdownStyles, defaultStyles } from "@styles/styles";

@customElement("trip-countdown")
class Countdown extends LitElement {
  @consume({ context: tripContext, subscribe: true })
  @property({ attribute: false })
  public tripContextValue?: TripContext | null;
  @property()
  public isLoading: boolean = false;
  @property()
  public error: string | null = null;
  @property()
  public years: number = 0;
  @property()
  public months: number = 0;
  @property()
  public days: number = 0;
  @property()
  public hours: number = 0;
  @property()
  public minutes: number = 0;
  @property()
  public seconds: number = 0;

  private countdownTimer: ReturnType<typeof setInterval> | undefined;

  connectedCallback() {
    super.connectedCallback();
    this.startCountdown();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.clearTimer();
  }

    clearTimer() {
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
    }
  }

    startCountdown() {
    if (!this.tripContextValue || !this.tripContextValue.trip) {
      return;
    }

    const { trip } = this.tripContextValue;

    if (!trip || !trip.date || !trip.date.startDate) {
      return;
    }

    const countDownDate: number = new Date(trip.date.startDate).getTime();

    this.countdownTimer = setInterval(() => {
      const now: number = new Date().getTime();
      const distance: number = countDownDate - now;

      this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
      this.hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        this.clearTimer();
        console.log("Countdown is afgelopen!");
      }
    }, 1000);
  }

  render() {
    const { tripContextValue } = this;

    if (!tripContextValue || !tripContextValue.trip) {
      return html``;
    }

    const { trip } = tripContextValue;

    if (!trip || !trip.date || !trip.date.startDate) {
      return html``;
    }
    if (this.days < 0 && this.hours < 0 && this.minutes < 0 && this.seconds < 0) {
      return html`Oeps, het lijkt erop dat je al genoten hebt van deze trip :)`;
    }
    return html`
      <div>
        <p class="countdown">
          Tijd tot de trip: ${this.days} dagen, ${this.hours} uren,
          ${this.minutes} minuten en ${this.seconds} seconden
        </p>
      </div>
    `;
  }

  static styles = [defaultStyles, countdownStyles];
}

export default Countdown;
