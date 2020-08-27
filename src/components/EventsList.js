import React from "react";
import "./EventsList.css";
const EventsList = ({ events, isLoggedIn, eventClickHandler }) => {
  if (!isLoggedIn) {
    const list = events.map((event, index) => {
      return (
        <div
          className="singleEvent"
          key={event.id}
          onClick={() => eventClickHandler(index)}
        >
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
