import React from "react";
import classes from "../../App.module.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

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
  const Categories = categoriesList.map((categorie) => {
    return (
      <Link
        to={{
          pathname: `/add/details/${categorie}`,
        }}
        key={categorie}
        className={classes.categoriesList__link}
      >
        <li className={classes.listItem}>
          {categorie}
          <FontAwesomeIcon icon={faChevronRight} color="#bcb8b1" />
        </li>
      </Link>
    );
  });
  return (
    <div className={classes.categories}>
      <h4 className={classes.categories__clickOn}>Categories</h4>
      <ul className={classes.categoriesList}>
        {/* <CategoriesList categoriesList={categoriesList} /> */}
        {Categories}
      </ul>
    </div>
  );
}

export default AddTransfer;
