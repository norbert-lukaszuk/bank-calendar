import React, { useEffect, useState } from "react";
const EventDetails = (props) => {
  const gapi = window.gapi;
  const [event, setEvent] = useState();
  // console.log(event.result);
  const getEvent = () => {
    gapi.client.calendar.events
      .get({
        calendarId: "afqpdpcef0fvv5o39r3rvujte0@group.calendar.google.com",
        eventId: props.match.params.id,
      })
      .then((resp) => {
        setEvent(resp);
      });
  };
  useEffect(getEvent, []);
  if (event) {
    console.log(event.result);
    const hours = event.result.reminders.overrides[1].minutes / 60;
    return (
      <div>
        <p>{event.result.summary}</p>
        <p>{event.result.start.dateTime.slice(0, 10)}</p>
        <p>Reminder {hours} houres before</p>
      </div>
    );
  } else {
    return <h3>Loading...</h3>;
  }
};

export default EventDetails;
