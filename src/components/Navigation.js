import React from "react";
import classes from "../App.module.scss";
import { NavLink } from "react-router-dom";

function Navigation({ showMenu }) {
  return (
    <div>
      <nav
        className={classes.navigation}
        style={{ transform: showMenu ? "translateX(0)" : "translateX(-100%)" }}
      >
        <ul className={classes.navigationList}>
          <NavLink
            exact
            className={classes.navigationList__item}
            activeClassName={classes.navigationList__item__active}
            to="/add"
          >
            <li>Add</li>
          </NavLink>
          <NavLink
            exact
            className={classes.navigationList__item}
            activeClassName={classes.navigationList__item__active}
            to="/"
          >
            <li>Home</li>
          </NavLink>
        </ul>
      </nav>
    </div>
  );
}

export default Navigation;
