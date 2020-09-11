import React, { useState } from "react";
import classes from "../../App.module.scss";
const TransferDetails = (props) => {
  const categorie = props.match.params.cat;
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className={classes.transferDetails}>
      <h4>{categorie}</h4>
      <h4>{title}</h4>
      <h4>{amount}</h4>
      <form onSubmit={handleSubmit} className={classes.transferDetails__form}>
        <input
          type="text"
          id="title"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <input
          type="number"
          id="amount"
          placeholder="Amount"
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
        />
      </form>
    </div>
  );
};

export default TransferDetails;
