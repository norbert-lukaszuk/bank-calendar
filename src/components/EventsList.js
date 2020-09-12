import React from "react";

const EventsList = ({ events }) => {
  if (events) {
    return (
      <div>
        {events.map((element) => {
          return <p key={element.id}>{element.summary}</p>;
        })}
      </div>
    );
  } else {
    return <p>nothing</p>;
  }
};

export default EventsList;
