import React from "react";
import Aux from "../../components/wraper";
import CategoriesList from "../../components/CategoriesList";
import classes from "../../App.module.scss";

function AddTransfer() {
  const categoriesList = [
    "Czynsz",
    "Internet",
    "Kredyt",
    "Księgowość",
    "Orange",
    "Rachunki - gaz",
    "Rachunki - prąd",
  ];
  return (
    <Aux>
      <form className={classes.addTransferForm}>
        <CategoriesList categoriesList={categoriesList} />
      </form>
    </Aux>
  );
}

export default AddTransfer;
