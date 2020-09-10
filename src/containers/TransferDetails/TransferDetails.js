import React, { useState } from "react";

const TransferDetails = (props) => {
  const categorie = props.match.params.cat;
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <h4>{categorie}</h4>
      <h4>{title}</h4>
      <h4>{amount}</h4>
      <form onSubmit={handleSubmit}>
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
