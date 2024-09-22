import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { defaultStyles } from "@styles/styles";
import { consume } from "@lit/context";
import * as ics from "ics";
import { ActivityContext, activityContext } from "./ActivityDetailContainer";
import "@components/design/Typography/PageTitle";
import "@components/design/Button/Button";
import "@components/design/Header/PageHeader";
import "@components/design/Card/Card";
import { Activity } from "@core/modules/activities/Activity.types";
import { format, parseISO } from "date-fns";


@customElement("activity-detail")
class ActivityDetail extends LitElement {
  @consume({ context: activityContext, subscribe: true })
  @property({ attribute: false })
  public activityContextValue?: ActivityContext | null;

  //-----------------------
  onClick = (activity: Activity) => {
    ics.createEvent(
      {
        start: this.getStartDate(activity.date, activity.startTime),
        duration: this.calculateDuration(activity.startTime , activity.endTime),
        title: activity.name,
        description: activity.description,
        location: activity.location,
        url: activity.link,
        status: "CONFIRMED",
        busyStatus: "BUSY",
      },
      (error, value) => {
        if (error) {
          console.log(error);
        }
        this.download(`${activity.name}.ics`, value);
      }
    );
  };
  //-----------------------
  download = (filename: string, content: string) => {
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(content)
    );
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };
  //-----------------------
  getStartDate = (date: string, time: string) => {
    const dateTimeString = `${date}T${time}:00`;
    return (dateTimeString);
  };
  //-----------------------
  calculateDuration = (startTime: string, endTime: string) => {
  // Split the time strings
  const startArray = startTime.split(":");
  const endArray = endTime.split(":");

  // Convert the string parts to numbers
  const startMinutes = parseInt(startArray[0]) * 60 + parseInt(startArray[1]);
  const endMinutes = parseInt(endArray[0]) * 60 + parseInt(endArray[1]);

  // Calculate the duration in minutes
  let durationMinutes = endMinutes - startMinutes;

  // Handle negative durations (crossing midnight)
  if (durationMinutes < 0) {
    durationMinutes += 24 * 60;
  }

  // Calculate hours and minutes from total minutes
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;

  // Create an object with hours and minutes
  const resultObject = {
    hours: hours,
    minutes: minutes
  };

  return resultObject;
}
  //-----------------------
  render() {
    const { activityContextValue } = this;
    if (!activityContextValue || !activityContextValue.activity) {
      return html``;
    }

    const { activity } = activityContextValue;

    return html`
      <app-card>
        <app-page-header>
          <app-page-title>${activity.name}</app-page-title>
          <app-button href="/activities/${activity._id}/edit" color="secondary"
            >Aanpassen</app-button
          >
        </app-page-header>
        <h3>Datum activiteit</h3>
        <p>${format(parseISO(activity.date), "dd-MM-yyyy")}</p>
        <h3>Start uur activiteit</h3>
        <p>${activity.startTime}</p>
        <h3>Eind uur activiteit</h3>
        <p>${activity.endTime}</p>
        <h3>locatie activiteit</h3>
        <p>${activity.location}</p>
        <h3>kost van de activiteit</h3>
        <p>€ ${activity.cost}</p>
        <h3>link voor meer info</h3>
        <a href="${activity.link}" target="_blank">${activity.link}</a>
        <h3>Omschrijving</h3>
        <p>${activity.description}</p>

        <app-button color="secondary" @click=${() => this.onClick(activity)}
          >exporteren</app-button
        >
      </app-card>
    `;
  }

  static styles = [defaultStyles];
}

export default ActivityDetail;
