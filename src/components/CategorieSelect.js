import React, { useState } from "react";

const CategorieSelect = ({ categories }) => {
  const [show, setShow] = useState(true);
  if (show) {
    return (
      <div onClick={() => setShow(!show)}>
        <h3>Catergories</h3>
        {categories.map((cat) => {
          return <h3 key={cat}>{cat}</h3>;
        })}
      </div>
    );
  } else {
    return (
      <div onClick={() => setShow(!show)}>
        <h3>Catergories</h3>
      </div>
    );
  }
};

export default CategorieSelect;
