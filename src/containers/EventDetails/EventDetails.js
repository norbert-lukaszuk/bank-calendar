import React, { useEffect, useState } from "react";
const EventDetails = (props) => {
  const gapi = window.gapi;
  const [event, setEvent] = useState();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [eventId, setEventId] = useState("");
  const [date, setDate] = useState("");
  console.log("EventDetails -> date", date);
  // get the single event from calendar
  const getEvent = () => {
    gapi.client.calendar.events
      .get({
        calendarId: "afqpdpcef0fvv5o39r3rvujte0@group.calendar.google.com",
        eventId: props.match.params.id,
      })
      .then((resp) => {
        const sliceFrom = resp.result.description.indexOf("@");
        const sliceTo = resp.result.description.indexOf(" ");
        setEvent(resp);
        setTitle(resp.result.description.slice(sliceFrom + 1));
        setAmount(parseFloat(resp.result.description.slice(0, sliceTo)));
        setEventId(resp.result.id);
        setDate(resp.result.start.dateTime);
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
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="date"
          id="date"
          defaultValue={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <p>{event.result.summary}</p>
        <p>{event.result.start.dateTime.slice(0, 10)}</p>
        <p>Reminder {hours} houres before</p>
        <button type="submit">Update</button>
      </form>
    );
  } else {
    return <h3>Loading...</h3>;
  }
};

export default EventDetails;
