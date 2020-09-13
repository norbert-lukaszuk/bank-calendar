import React from "react";
import { Link } from "react-router-dom";
import classes from "../App.module.scss";
const EventsList = ({ events }) => {
  if (events) {
    return (
      <div>
        {events.map((element) => {
          return (
            <Link
              className={classes.eventsFromCalendar__event}
              to={"/event/" + element.id}
              key={element.id}
            >
              <p>{element.summary}</p>;
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
