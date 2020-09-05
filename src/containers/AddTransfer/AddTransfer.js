import React, { useState } from "react";
import Aux from "../../hoc/Aux";
import CategoriesList from "../../components/CategoriesList";

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
      <form>
        <CategoriesList
          categoriesList={categoriesList}
          categoryItemClickHandler={categoryItemClickHandler}
        />
      </form>
    </Aux>
  );
}

export default AddTransfer;
