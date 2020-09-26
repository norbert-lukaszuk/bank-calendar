import React, { useState } from "react";
import classes from "../../App.module.scss";
function NewCategorie() {
  const [categorieName, setCategorieName] = useState("");
  const [titlePrefill, setTitlePrefill] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(categorieName, titlePrefill, accountNumber);
  };
  return (
    <div className={classes.newCategorie}>
      <h2>Add new categorie</h2>
      <form onSubmit={handleFormSubmit} className={classes.newCategorie__form}>
        <label htmlFor="categorieName">New categorie name</label>
        <input
          type="text"
          id="categorieName"
          onChange={(e) => setCategorieName(e.target.value)}
          value={categorieName}
        />
        <label htmlFor="titlePrefill">
          Would You like to add default title text ?
        </label>
        <input
          type="text"
          id="titlePrefill"
          onChange={(e) => setTitlePrefill(e.target.value)}
          value={titlePrefill}
        />
        <label htmlFor="accountNumber">Account number</label>
        <input
          type="text"
          id="accountNumber"
          onChange={(e) => setAccountNumber(e.target.value)}
          value={accountNumber}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default NewCategorie;
