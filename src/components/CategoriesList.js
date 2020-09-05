import React from "react";

const CategoriesList = ({ categoriesList, categoryItemClickHandler }) => {
  return (
    <div>
      <h4>Categories</h4>
      {categoriesList.map((item) => {
        return (
          <p
            onClick={(e) => categoryItemClickHandler(e.target.textContent)}
            key={item}
          >
            {item}
          </p>
        );
      })}
    </div>
  );
};

export default CategoriesList;
