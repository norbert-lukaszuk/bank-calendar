import React, { useState } from "react";
import classes from "../../App.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const gapi = window.gapi;

const TransferDetails = (props) => {
  const categorie = props.match.params.cat;
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState(props.location.state.titlePrefill);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [bankDefault, setBankDefault] = useState(
    props.location.state.bankDefault
  );
  const [linkToEvent, setLinkToEvent] = useState("");
  console.log(bankDefault);
  console.log(props);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title, amount, typeof date);
    console.log(`${date}T14:30:00+02:00`);
    gapi.client.calendar.events
      .insert({
        calendarId: "afqpdpcef0fvv5o39r3rvujte0@group.calendar.google.com",
        resource: {
          summary: `${categorie} - ${bankDefault}`,
          description: `${amount} zł@${title}`,
          start: {
            // dateTime: "2020-09-23T13:00:00+02:00",
            dateTime: `${date}T13:00:00+02:00`,
          },
          end: {
            // dateTime: "2020-09-23T14:30:00+02:00",
            dateTime: `${date}T14:30:00+02:00`,
          },
          reminders: {
            useDefault: false,
            overrides: [
              { method: "popup", minutes: 120 },
              { method: "popup", minutes: 240 },
            ],
          },
        },
      })
      .then((resp) => {
        console.log(resp.result);
        setLinkToEvent(resp.result.htmlLink);
        // forcess update of EventsInCalendar with added event
        props.getEventsFromCalendar();
        props.history.push("/");
      });
  };
  return (
    <div className={classes.transferDetails}>
      <Link to="/add" className={classes.transferDetails__categorieWraper}>
        <FontAwesomeIcon icon={faChevronLeft} size="2x" />
        <h2>{categorie}</h2>
      </Link>
      <p>{props.location.state.categorieId}</p>
      <form onSubmit={handleSubmit} className={classes.transferDetails__form}>
        <div className={classes.transferDetails__bankSelectWraper}>
          <div className={classes.transferDetails__radioButtonWraper}>
            <input
              type="radio"
              name="bankSelect"
              id="mbank"
              value="mbank"
              checked={bankDefault === "mbank"}
              onChange={(e) => setBankDefault(e.target.value)}
            />
            <label htmlFor="mbank">{props.location.state.bankName[0]}</label>
          </div>
          <div className={classes.transferDetails__radioButtonWraper}>
            <input
              type="radio"
              name="bankSelect"
              id="pko"
              value="pko"
              checked={bankDefault === "pko"}
              onChange={(e) => setBankDefault(e.target.value)}
            />
            <label htmlFor="pko">{props.location.state.bankName[1]}</label>
          </div>
        </div>
        <label htmlFor="date">Date of paymant</label>
        <input
          type="date"
          id="date"
          defaultValue={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <label htmlFor="title">Transfer title</label>
        <input
          type="text"
          id="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <label htmlFor="amount">Amanunt to transfer (zł)</label>
        <input
          type="number"
          id="amount"
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
        />
        <button type="submit">Add transfer</button>
      </form>
      {linkToEvent ? <a href={linkToEvent}>See event in calendar</a> : null}
    </div>
  );
};

export default TransferDetails;
