import React from "react";
import EventsList from "../../components/EventsList";
const gapi = window.gapi;
const TransfersInCalendar = ({ isSignedIn, events }) => {
  if (isSignedIn) {
    return (
      <div>
        <button onClick={() => gapi.auth2.getAuthInstance().signOut()}>
          Sign Out
        </button>
        <EventsList events={events} />
      </div>
    );
  } else {
    return (
      <div>
        <p>Not signed in</p>
        <button onClick={() => gapi.auth2.getAuthInstance().signIn()}>
          Sign In
        </button>
      </div>
    );
  }
};

export default TransfersInCalendar;
