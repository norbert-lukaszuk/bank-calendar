import React from "react";
import classes from "../App.module.scss";
import { NavLink } from "react-router-dom";
import Backdrop from "./Backdrop";
const gapi = window.gapi;
const auth = window.firebase.auth;
function Navigation({
  showMenu,
  backdropClickHandler,
  gapiSignedIn,
  provider,
}) {
  return (
    <div>
      <nav
        className={classes.navigation}
        style={{
          transform: showMenu ? "translateX(0)" : "translateX(-100%)",
          opacity: showMenu ? 1 : 0,
        }}
      >
        <ul className={classes.navigationList}>
          <NavLink
            exact
            className={classes.navigationList__item}
            activeClassName={classes.navigationList__item__active}
            to="/"
            onClick={backdropClickHandler}
          >
            <li>Home</li>
          </NavLink>
          <NavLink
            exact
            className={classes.navigationList__item}
            activeClassName={classes.navigationList__item__active}
            to="/add"
            onClick={backdropClickHandler}
          >
            <li>Add</li>
          </NavLink>
          {gapiSignedIn ? (
            <li
              className={classes.navigationList__item}
              onClick={() => {
                gapi.auth2.getAuthInstance().signOut();
                auth().signOut();
                backdropClickHandler();
              }}
            >
              Sign out
            </li>
          ) : (
            <li
              className={classes.navigationList__item}
              onClick={() => {
                auth()
                  .signInWithPopup(provider)
                  .then(() => gapi.auth2.getAuthInstance().signIn());

                backdropClickHandler();
              }}
            >
              Sign in
            </li>
          )}
        </ul>
      </nav>
      <Backdrop
        showMenu={showMenu}
        backdropClickHandler={backdropClickHandler}
      />
    </div>
  );
}

export default Navigation;
