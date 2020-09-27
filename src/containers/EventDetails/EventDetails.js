import React, { useEffect, useState } from "react";
import classes from "../../App.module.scss";

const EventDetails = (props) => {
  const gapi = window.gapi;
  const [event, setEvent] = useState();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [eventId, setEventId] = useState("");
  const [date, setDate] = useState("");
  console.log("EventDetails -> date", date);
  const [reminder1, setReminder1] = useState({});
  const [reminder2, setReminder2] = useState({});
  console.log("EventDetails -> reminder1", reminder1);
  console.log("EventDetails -> reminder2", reminder2);
  console.log("EventDetails -> event", event);
  // set the reminders state
  const handleReminder1Change = (e) => {
    const newReminder = { ...reminder1 };
    newReminder.minutes = parseInt(e.target.value);
    setReminder1(newReminder);
  };
  function handleReminder2Change(e) {
    const newReminder = { ...reminder2 };
    newReminder.minutes = parseInt(e.target.value);
    setReminder2(newReminder);
  }
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
        setDate(resp.result.start.dateTime.slice(0, 10));
        setTitle(resp.result.description.slice(sliceFrom + 1));
        setAmount(parseFloat(resp.result.description.slice(0, sliceTo)));
        setEventId(resp.result.id);
        setReminder1(resp.result.reminders.overrides[0]);
        setReminder2(resp.result.reminders.overrides[1]);
      });
  };
  // handle submit to update selected event
  const handleSubmit = (e) => {
    e.preventDefault();
    gapi.client.calendar.events
      .update({
        calendarId: "afqpdpcef0fvv5o39r3rvujte0@group.calendar.google.com",
        eventId: eventId,
        resource: {
          summary: event.result.summary,
          description: `${amount} zł@${title}`,
          start: {
            dateTime: `${date}T13:00:00+02:00`,
          },
          end: {
            dateTime: `${date}T14:30:00+02:00`,
          },
          reminders: {
            useDefault: false,
            overrides: [reminder1, reminder2],
          },
        },
      })
      .then((resp) => {
        console.log(resp.result);
        props.getEventsFromCalendar();
      })
      .catch((err) => console.error(err));
  };
  const handleDeleteEvent = () => {
    gapi.client.calendar.events
      .delete({
        calendarId: "afqpdpcef0fvv5o39r3rvujte0@group.calendar.google.com",
        eventId: eventId,
      })
      .then(() => props.getEventsFromCalendar())
      .then(() => props.history.push("/"));
  };
  useEffect(getEvent, []);
  if (event) {
    console.log(event.result.start.dateTime);
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
            id="reminder1"
            value={reminder1.minutes}
            onChange={handleReminder1Change}
          >
            <option value="120">2h</option>
            <option value="180">3h</option>
          </select>
          <select
            name="reminders"
            id="reminder2"
            value={reminder2.minutes}
            onChange={handleReminder2Change}
          >
            <option value="1440">1d</option>
            <option value="2880">2d</option>
          </select>
          <button type="submit">Update</button>
        </form>
        <button onClick={handleDeleteEvent}>Delete transfer</button>
      </div>
    );
  } else {
    return <h3 className={classes.transferDetails__loading}>Loading...</h3>;
  }
};

export default EventDetails;
