import React from "react";
import EventsList from "../../components/EventsList";
import classes from "../../App.module.scss";
const gapi = window.gapi;
const TransfersInCalendar = ({ isSignedIn, events }) => {
  console.log(events);
  if (isSignedIn) {
    return (
      <div className={classes.eventsFromCalendar}>
        {/* <button onClick={() => gapi.auth2.getAuthInstance().signOut()}>
          Sign Out
        </button> */}
        <EventsList events={events} />
      </div>
    );
  } else {
    return (
      <div className={classes.eventsFromCalendar}>
        <h4>Loading please wait ...</h4>
        {/* <button onClick={() => gapi.auth2.getAuthInstance().signIn()}>
          Sign In
        </button> */}
      </div>
    );
  }
};

export default TransfersInCalendar;
