import React, { useState } from "react";
import classes from "../App.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronUp,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const CategoriesList = ({ categoriesList, categoryItemClickHandler }) => {
  const [categoriesShow, setCategoriesShow] = useState(true);
  return (
    <div className={classes.categories}>
      <h4 className={classes.categories__clickOn}>Categories</h4>
      <ul className={classes.categoriesList}>
        {categoriesList.map((item) => {
          return (
            <Link to={"/add/details/" + item} key={item}>
              <li
                className={classes.listItem}
                onClick={(e) => {
                  categoryItemClickHandler(e.target.textContent);
                  setCategoriesShow(false);
                }}
              >
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
