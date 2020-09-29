import React, { useState } from "react";
import classes from "../../App.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const db = window.firebase.firestore();

function NewCategorie(props) {
  const [categorieName, setCategorieName] = useState("");
  const [titlePrefill, setTitlePrefill] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankDefault, setBankDefault] = useState("");
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(categorieName, titlePrefill, accountNumber);
    db.collection("categoriesReact")
      .add({
        bankName: ["mbank", "pko"],
        // use [] to set object key from variable or state
        bankAccount: { [bankDefault]: accountNumber },
        bankDefault: bankDefault,
        calendarId: "afqpdpcef0fvv5o39r3rvujte0@group.calendar.google.com",
        categorieName: categorieName,
        color: "",
        reminderTimes: [120, 1440],
        titlePrefill: titlePrefill,
      })
      .then((resp) => console.log(resp.id))
      .then(() => props.getCategories())
      .then(() => props.history.push("/add"))
      .catch((err) => console.log(err));
    setCategorieName("");
    setTitlePrefill("");
    setAccountNumber("");
  };
  return (
    <div className={classes.newCategorie}>
      <div className={classes.newCategorie__headerWraper}>
        <Link to="/add">
          <FontAwesomeIcon icon={faChevronLeft} size="2x" />
        </Link>
        <h2>Add new categorie</h2>
      </div>
      <form onSubmit={handleFormSubmit} className={classes.newCategorie__form}>
        <div className={classes.transferDetails__bankSelectWraper}>
          <div className={classes.transferDetails__radioButtonWraper}>
            <input
              type="radio"
              name="bankSelect"
              id="mbank"
              value="mbank"
              checked={true}
              onChange={(e) => setBankDefault(e.target.value)}
            />
            <label htmlFor="mbank">mbank</label>
          </div>
          <div className={classes.transferDetails__radioButtonWraper}>
            <input
              type="radio"
              name="bankSelect"
              id="pko"
              value="pko"
              onChange={(e) => setBankDefault(e.target.value)}
            />
            <label htmlFor="pko">pko</label>
          </div>
        </div>
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
        <button type="submit" className={classes.newCategorie__submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default NewCategorie;
