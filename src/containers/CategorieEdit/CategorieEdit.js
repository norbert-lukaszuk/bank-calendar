import React, { useState, useEffect } from "react";
import classes from "../../App.module.scss";
const db = window.firebase.firestore();

function CategorieEdit(props) {
  const [editedCategorie, setEditedCategorie] = useState({});
  const [categorieName, setCategorieName] = useState(
    editedCategorie.categorieName
  );
  const [bankDefault, setBankDefault] = useState(editedCategorie.bankDefault);
  const [titlePrefill, setTitlePrefill] = useState(
    editedCategorie.titlePrefill
  );
  const [accountNumber, setAccountNumber] = useState(
    editedCategorie.bankAccount
  );
  console.log(editedCategorie);
  const handleFormSubmit = () => {};
  const getCategorieToEdit = () => {
    db.collection("categoriesReact")
      .doc(props.match.params.id)
      .get()
      .then((resp) => resp.data())
      .then((data) => setEditedCategorie(data))
      .catch((err) => console.log(err));
  };
  useEffect(getCategorieToEdit, []);
  return (
    <div className={classes.newCategorie}>
      <form onSubmit={handleFormSubmit} className={classes.newCategorie__form}>
        <div className={classes.transferDetails__bankSelectWraper}>
          <div className={classes.transferDetails__radioButtonWraper}>
            <input
              type="radio"
              name="bankSelect"
              id="mbank"
              value="mbank"
              checked={bankDefault === "mbank"}
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
              checked={bankDefault === "pko"}
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
        {/* {editedCategorie
          ? editedCategorie.bankName.map((e) => {
              return <p>{e}</p>;
            })
          : null} */}
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

export default CategorieEdit;
