import React from "react";
import "./AddEvent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import CategorieSelect from "./CategorieSelect";
import { TextField } from "@material-ui/core";
const AddEvent = () => {
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(e.target);
  };
  const categories = [
    "Czynsz",
    "Internet",
    "Kredyt",
    "Księgowość",
    "Orange",
    "Rachunki - gaz",
    "Rachunki - prąd",
  ];
  return (
    <div>
      <form onSubmit={submitHandler} className="addEvent__form">
        <CategorieSelect categories={categories} />
        <input type="text" placeholder="Event title" />
        <input type="text" placeholder="Amount" />
        <TextField
          id="date"
          label="Paymant due"
          type="date"
          defaultValue={new Date().toISOString().slice(0, 10)}
          className="datePicker"
        />
        <button type="submit">
          Add <FontAwesomeIcon icon={faArrowRight} />{" "}
        </button>
      </form>
    </div>
  );
};

export default AddEvent;
