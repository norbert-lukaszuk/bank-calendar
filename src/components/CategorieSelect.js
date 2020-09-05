import React, { useState } from "react";
import "./CategoriesSelect.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleDown,
  faArrowAltCircleUp,
  faArrowCircleUp,
} from "@fortawesome/free-solid-svg-icons";
const CategorieSelect = ({ categories }) => {
  const [show, setShow] = useState(false);
  const [categorieSelected, setCategoriesSelected] = useState();
  console.log(categorieSelected);
  const getCategorie = (event) => {
    console.log(event.target.value);
  };

  if (show) {
    return (
      <div onClick={() => setShow(!show)} className="categoriesDropdown">
        <h3 className="categorieHeader">Catergories</h3>
        <FontAwesomeIcon
          icon={faArrowCircleUp}
          size="1x"
          className="dropdownArowIcon"
        />
        {categories.map((cat) => {
          return (
            <h3
              key={cat}
              onClick={(e) => {
                setCategoriesSelected(e.target.textContent);
              }}
            >
              {cat}
            </h3>
          );
        })}
      </div>
    );
  } else {
    return (
      <div onClick={() => setShow(!show)} className="categoriesDropdown">
        <h3 className="categorieHeader">Catergorie selected</h3>
        <FontAwesomeIcon
          icon={faArrowCircleDown}
          size="1x"
          className="dropdownArowIcon"
        />
        <h3>{categorieSelected}</h3>
      </div>
    );
  }
};

export default CategorieSelect;
