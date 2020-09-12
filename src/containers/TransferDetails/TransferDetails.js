import React, { useState } from "react";
import classes from "../../App.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const gapi = window.gapi;
const TransferDetails = (props) => {
  const categorie = props.match.params.cat;
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className={classes.transferDetails}>
      <Link to="/add" className={classes.transferDetails__categorieWraper}>
        <FontAwesomeIcon icon={faChevronLeft} />
        <h2>{categorie}</h2>
      </Link>

      <form onSubmit={handleSubmit} className={classes.transferDetails__form}>
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
          // placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <label htmlFor="amount">Amanunt to transfer</label>
        <input
          type="number"
          id="amount"
          // placeholder="Amount"
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
        />
        <button type="submit">Add transfer</button>
      </form>
    </div>
  );
};

export default TransferDetails;
