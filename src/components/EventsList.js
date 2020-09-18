import React from "react";
<<<<<<< HEAD
import "./EventsList.css";
const EventsList = ({ events, isLoggedIn }) => {
  if (!isLoggedIn) {
    const list = events.map((event) => {
      return (
        <div className="singleEvent" key={event.id}>
          <h3>{event.summary}</h3>
          <h5>{event.start.dateTime.slice(0, 10)}</h5>
        </div>
      );
    });
    return <div>{list}</div>;
=======
import { Link } from "react-router-dom";
import classes from "../App.module.scss";
const EventsList = ({ events }) => {
  if (events) {
    return (
      <div>
        {events.map((element) => {
          console.log(element);
          const sliceTo = element.description.indexOf(" ");
          return (
            <Link
              className={classes.eventsFromCalendar__event}
              to={"/event/" + element.id}
              key={element.id}
            >
              <p>{element.summary}</p>
              <p>{parseFloat(element.description.slice(0, sliceTo))}</p>
              <p>{element.start.dateTime.slice(0, 10)}</p>
              <p>Reminders times </p>
              {element.reminders.overrides.map((reminder, index) => {
                return (
                  <span key={`${element.id}${index}`}>
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
>>>>>>> freshStart
  } else {
    return null;
  }
};

export default EventsList;
