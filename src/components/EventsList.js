import React from "react";
import { Link } from "react-router-dom";
import classes from "../App.module.scss";
const EventsList = ({ events }) => {
  if (events) {
    return (
      <div>
        {events.map((element) => {
          console.log(element.reminders.overrides[0]);
          return (
            <Link
              className={classes.eventsFromCalendar__event}
              to={"/event/" + element.id}
              key={element.id}
            >
              <p>{element.summary}</p>
              <p>{element.start.dateTime.slice(0, 10)}</p>
              <p>Reminders times </p>
              {element.reminders.overrides.map((reminder) => {
                return (
                  <span key={reminder.method}>
                    {" "}
                    {Math.round(reminder.minutes / 60)} h
                  </span>
                );
              })}
              <hr />
            </Link>
          );
        })}
      </div>
    );
  } else {
    return null;
  }
};

export default EventsList;
