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
          const sliceTo = element.description.indexOf(" ");
          return (
            <div className={classes.eventsFromCalendar__event} key={element.id}>
              <span className={classes.eventsFromCalendar__icon}>
                {element.summary[0]}
              </span>
              <Link to={"/event/" + element.id}>
                <h4>{element.summary}</h4>
                {/* <p>{element.summary}</p>
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
                })} */}
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
