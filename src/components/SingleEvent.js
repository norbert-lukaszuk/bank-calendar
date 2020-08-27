import React from "react";
import "./SingleEvent.css";
const SingleEvent = ({ event, EventClickHandler }) => {
  return (
    <div className="singleEvent" key={event.id} onClick={EventClickHandler}>
      <h3>{event.summary}</h3>
      <h5>{event.start.dateTime.slice(0, 10)}</h5>
    </div>
  );
};

export default SingleEvent;
