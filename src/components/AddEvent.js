import React from "react";
import "./AddEvent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
const AddEvent = () => {
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(e.target);
  };
  return (
    <div>
      <form onSubmit={submitHandler} className="addEvent__form">
        <input type="text" placeholder="Event title" />
        <input type="text" placeholder="amount" />
        <button type="submit">
          Add <FontAwesomeIcon icon={faArrowRight} />{" "}
        </button>
      </form>
    </div>
  );
};

export default AddEvent;
