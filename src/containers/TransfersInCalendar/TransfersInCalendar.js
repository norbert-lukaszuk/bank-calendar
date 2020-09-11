import React from "react";
const gapi = window.gapi;
const TransfersInCalendar = ({ isSignedIn }) => {
  if (isSignedIn) {
    let events;
    gapi.client.calendar.events
      .list({
        calendarId: "primary",
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 15,
        orderBy: "startTime",
      })
      .then((response) => {
        events = response.result.items;
        console.log("EVENTS: ", events);
        //   setEvents(events);
      });

    return (
      <div>
        {events.map((ev) => {
          return <p key={ev.id}>{ev.created}</p>;
        })}
        <button onClick={() => gapi.auth2.getAuthInstance().signOut()}>
          Sign Out
        </button>
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
