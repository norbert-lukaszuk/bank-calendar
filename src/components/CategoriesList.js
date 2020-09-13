import React from "react";
import classes from "../App.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const CategoriesList = ({ categoriesList }) => {
  return (
    <div className={classes.categories}>
      <h4 className={classes.categories__clickOn}>Categories</h4>
      <ul className={classes.categoriesList}>
        {categoriesList.map((item) => {
          return (
            <Link
              to={{
                pathname: `/add/details/${item}`,
              }}
              key={item}
              className={classes.categoriesList__link}
            >
              <li className={classes.listItem}>
                {item}
                <FontAwesomeIcon icon={faChevronRight} color="#bcb8b1" />
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default CategoriesList;
