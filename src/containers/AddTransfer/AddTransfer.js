import React, { useState } from "react";
import Aux from "../../components/wraper";
import CategoriesList from "../../components/CategoriesList";
import classes from "../../App.module.scss";

function AddTransfer() {
  const [showCategories, setShowCategories] = useState(false);
  const [slectedCategorie, setSelectedCategorie] = useState();
  console.log(slectedCategorie);

  const categoryItemClickHandler = (categorie) => {
    setSelectedCategorie(categorie);
  };

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
        <CategoriesList
          categoriesList={categoriesList}
          categoryItemClickHandler={categoryItemClickHandler}
        />
      </form>
    </Aux>
  );
}

export default AddTransfer;
