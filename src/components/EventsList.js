import React from "react";
import { Link } from "react-router-dom";
import classes from "../App.module.scss";
import DaysLeft from "./DaysLeft";
const EventsList = ({ events }) => {
  if (events) {
    return (
      <div>
        {events.map((element) => {
          console.log(element);
          const date = element.start.dateTime.slice(0, 10);
          return (
            <div className={classes.eventsFromCalendar__event} key={element.id}>
              <span className={classes.eventsFromCalendar__icon}>
                {element.summary[0]}
              </span>
              <Link to={"/event/" + element.id}>
                <h4>{element.summary}</h4>
              </Link>
              <DaysLeft date={date} />
            </div>
          );
        })}
      </div>
    );
  } else {
    return null;
  }
};

export default EventsList;
