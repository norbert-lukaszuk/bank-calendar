import React from "react";
import "./EventsList.css";
const EventsList = ({ events, isLoggedIn }) => {
  if (!isLoggedIn) {
    const list = events.map((event) => {
      return (
        <div className="singleEvent" key={event.id}>
          <h3>{event.summary}</h3>
          <h5>{event.start.dateTime.slice(0, 10)}</h5>
        </div>
      );
    });
    return <div>{list}</div>;
  } else {
    return null;
  }
};

export default EventsList;
