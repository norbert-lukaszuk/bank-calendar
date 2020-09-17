import React, { useEffect, useState } from "react";
import classes from "../../App.module.scss";
const EventDetails = (props) => {
  const gapi = window.gapi;
  const [event, setEvent] = useState();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [eventId, setEventId] = useState("");
  const [date, setDate] = useState("");
  const [reminder, setReminder] = useState(null);
  console.log("EventDetails -> reminders", reminder);
  console.log("EventDetails -> event", event);
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
        setReminder(resp.result.reminders.overrides[0].minutes);
      });
  };
  // handle submit
  const handleSubmit = () => {};
  useEffect(getEvent, []);
  if (event) {
    console.log(event.result.start.dateTime);
    // setTitle(event.result.summary);
    return (
      <div className={classes.transferDetails}>
        <h2>{event.result.summary}</h2>
        <form onSubmit={handleSubmit} className={classes.transferDetails__form}>
          <label htmlFor="date">Date of payment</label>
          <input
            type="date"
            id="date"
            defaultValue={event.result.start.dateTime.slice(0, 10)}
            onChange={(e) => setDate(e.target.value)}
          />
          <label htmlFor="title">Transfer title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <label htmlFor="amount">Amanunt to transfer (zł)</label>

          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <label htmlFor="reminders">Reminders</label>
          <select
            name="reminders"
            id="reminders"
            value={reminder}
            onChange={(e) => setReminder(e.target.value)}
          >
            <option value={event.result.reminders.overrides[0].minutes}>
              {reminder} min.
            </option>
            <option value="220">220</option>
            <option value="320">320</option>
          </select>
          <button type="submit">Update</button>
        </form>
      </div>
    );
  } else {
    return <h3>Loading...</h3>;
  }
};

export default EventDetails;
