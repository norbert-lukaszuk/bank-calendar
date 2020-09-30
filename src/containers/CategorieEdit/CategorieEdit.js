import React, { useState, useEffect } from "react";
import classes from "../../App.module.scss";
const db = window.firebase.firestore();

function CategorieEdit(props) {
  // const [editedCategorie, setEditedCategorie] = useState(null);
  const [categorieName, setCategorieName] = useState("");
  const [bankDefault, setBankDefault] = useState("");
  const [bankName, setBankName] = useState([]);
  const [titlePrefill, setTitlePrefill] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  console.log(accountNumber);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    db.collection("categoriesReact")
      .doc(props.match.params.id)
      .update({
        bankAccount: {
          [bankDefault]: accountNumber,
        },
      })
      .catch((err) => console.error(err));
  };
  const getCategorieToEdit = () => {
    db.collection("categoriesReact")
      .doc(props.match.params.id)
      .get()
      .then((resp) => resp.data())
      .then((data) => {
        setCategorieName(data.categorieName);
        setBankName(data.bankName);
        setBankDefault(data.bankDefault);
        setTitlePrefill(data.titlePrefill);
        setAccountNumber(data.bankAccount);
      })
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
        {/* {bankName.map((e) => {
          return <p>{e}</p>;
        })} */}
        <label htmlFor="accountNumber">Account number</label>
        <input
          type="text"
          id="accountNumber"
          onChange={(e) =>
            setAccountNumber(
              (prevState) => (prevState[bankDefault] = e.target.value)
            )
          }
          value={accountNumber[bankDefault]}
        />
        <button type="submit" className={classes.newCategorie__submitButton}>
          Submit change
        </button>
      </form>
    </div>
  );
}

export default CategorieEdit;
