import React from "react";
import classes from "../App.module.scss";
import Aux from "./wraper";

function Backdrop({ showMenu, backdropClickHandler }) {
  return (
    <Aux>
      {showMenu ? (
        <div className={classes.backdrop} onClick={backdropClickHandler}></div>
      ) : null}
    </Aux>
  );
}

export default Backdrop;
