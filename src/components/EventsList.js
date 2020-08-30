import React from "react";
import "./EventsList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
const EventsList = ({ events, isLoggedIn, eventClickHandler }) => {
  if (!isLoggedIn) {
    const list = events.map((event, index) => {
      return (
        <div
          className="singleEvent"
          key={index}
          onClick={(e) => eventClickHandler(e, index)}
          id={event.id}
        >
          <div className="descriptionContainer">
            <h3>{event.summary}</h3>
            <h5>{event.start.dateTime.slice(0, 10)}</h5>
          </div>
          <div className="arrowContainer">
            <FontAwesomeIcon icon={faArrowRight} size="3x" />
          </div>
        </div>
      );
    });
    return <div>{list}</div>;
  } else {
    return null;
  }
};

export default EventsList;
