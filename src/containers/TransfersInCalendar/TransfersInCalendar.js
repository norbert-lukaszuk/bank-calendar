import React from "react";
import EventsList from "../../components/EventsList";
import classes from "../../App.module.scss";
const TransfersInCalendar = ({ isSignedIn, events }) => {
  console.log(events);
  if (isSignedIn) {
    return (
      <div className={classes.eventsFromCalendar}>
        <EventsList events={events} />
      </div>
    );
  } else {
    return (
      <div className={classes.eventsFromCalendar}>
        <h4>Loading please wait ...</h4>
      </div>
    );
  }
};

export default TransfersInCalendar;
