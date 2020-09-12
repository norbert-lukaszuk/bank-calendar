import React from "react";
import { Link } from "react-router-dom";
const EventsList = ({ events }) => {
  if (events) {
    return (
      <div>
        {events.map((element) => {
          return (
            <Link to={"/event/" + element.id} key={element.id}>
              <p>{element.summary}</p>;
            </Link>
          );
        })}
      </div>
    );
  } else {
    return null;
  }
};

export default EventsList;
