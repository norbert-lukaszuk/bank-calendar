import React, { useState, useEffect } from "react";
import Aux from "../components/wraper";
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import AddTransfer from "../containers/AddTransfer/AddTransfer";
import TransferDetails from "../containers/TransferDetails/TransferDetails";
import TransfersInCalendar from "../containers/TransfersInCalendar/TransfersInCalendar";
import EventDetails from "../containers/EventDetails/EventDetails";
import classes from "../App.module.scss";

const Layout = (props) => {
  const [gapiSignedIn, setGapiSignedIn] = useState(false);
  const [events, setEvents] = useState([]);
  const gapi = window.gapi;
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const API_KEY = process.env.REACT_APP_API_KEY;
  const DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ];
  const SCOPES = "https://www.googleapis.com/auth/calendar.events";
  console.log(events);
  const gapiLoad = () => {
    gapi.load("client:auth2", () => {
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        })
        .then(console.log("client initieted"))
        .then(
          gapi.client.load("calendar", "v3", () => {
            console.log("client loaded");
          })
        )
        // flip the buttons in initial signin status
        .then(() => {
          setGapiSignedIn(gapi.auth2.getAuthInstance().isSignedIn.get());
        })
        // add listener for signin stautus change
        .then(() => {
          gapi.auth2.getAuthInstance().isSignedIn.listen(setGapiSignedIn);
        });
    });
  };
  const getEventsFromCalendar = () => {
    if (gapiSignedIn) {
      gapi.client.calendar.events
        .list({
          // calendarId: "primary",
          calendarId: "afqpdpcef0fvv5o39r3rvujte0@group.calendar.google.com",
          timeMin: new Date().toISOString(),
          // timeMin: "2020-10-01T00:00:00.00Z",
          showDeleted: false,
          singleEvents: true,
          maxResults: 25,
          orderBy: "startTime",
        })
        .then((response) => {
          const events = response.result.items;
          setEvents(events);
        });
    } else {
      setEvents([]);
    }
  };
  useEffect(gapiLoad, []);
  useEffect(getEventsFromCalendar, [gapiSignedIn]);
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
              <li>Home</li>
            </NavLink>
          </ul>
        </nav>

        {/* {props.children} */}
        <Route path="/add" exact component={AddTransfer} />
        <Route
          path="/"
          exact
          component={() => (
            <TransfersInCalendar
              isSignedIn={gapiSignedIn}
              events={events}
              getEventsFromCalendar={getEventsFromCalendar}
            />
          )}
        />
        <Route path="/add/details/:cat" exact component={TransferDetails} />
        <Route path="/event/:id" exact component={EventDetails} />
      </Aux>
    </BrowserRouter>
  );
};

export default Layout;
