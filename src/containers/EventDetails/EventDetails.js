import React, { useEffect, useState } from "react";
const EventDetails = (props) => {
  const gapi = window.gapi;
  const [event, setEvent] = useState();
  const [title, setTitle] = useState("");
  // get the single event from calendar
  const getEvent = () => {
    gapi.client.calendar.events
      .get({
        calendarId: "afqpdpcef0fvv5o39r3rvujte0@group.calendar.google.com",
        eventId: props.match.params.id,
      })
      .then((resp) => {
        setEvent(resp);
        setTitle(resp.result.description);
      });
  };
  // handle submit
  const handleSubmit = () => {};
  useEffect(getEvent, []);
  if (event) {
    console.log(event.result);
    // setTitle(event.result.summary);
    const hours = event.result.reminders.overrides[1].minutes / 60;
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        <p>{event.result.summary}</p>
        <p>{event.result.start.dateTime.slice(0, 10)}</p>
        <p>Reminder {hours} houres before</p>
      </form>
    );
  } else {
    return <h3>Loading...</h3>;
  }
};

export default EventDetails;
