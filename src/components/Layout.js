import React from "react";
import Aux from "../components/wraper";
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import AddTransfer from "../containers/AddTransfer/AddTransfer";
import TransferDetails from "../containers/TransferDetails/TransferDetails";
import classes from "../App.module.scss";
const Layout = (props) => {
  const gapi = window.gapi;
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const API_KEY = process.env.REACT_APP_API_KEY;
  const DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ];
  const SCOPES = "https://www.googleapis.com/auth/calendar.events";
  return (
    <BrowserRouter>
      <Aux>
        <nav className={classes.navigation}>
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
              <li>List</li>
            </NavLink>
          </ul>
        </nav>

        {/* {props.children} */}
        <Route path="/add" exact component={AddTransfer} />
        <Route path="/" exact render={() => <h2>The list</h2>} />
        <Route path="/add/details/:cat" exact component={TransferDetails} />
      </Aux>
    </BrowserRouter>
  );
};

export default Layout;
