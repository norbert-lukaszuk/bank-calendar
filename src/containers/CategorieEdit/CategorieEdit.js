import React from "react";
const db = window.firebase.firestore();

function CategorieEdit(props) {
  return (
    <div>
      <p>{props.match.params.id}</p>
    </div>
  );
}

export default CategorieEdit;
