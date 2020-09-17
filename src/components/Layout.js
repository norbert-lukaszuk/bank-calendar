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
  const [categories, setCategories] = useState([]);
  const gapi = window.gapi;
  const DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ];
  const SCOPES = "https://www.googleapis.com/auth/calendar.events";
  const db = window.firebase.firestore();
  // const auth = window.firebase.auth();
  console.log(events);
  console.log(categories);

  // test firestore
  // get categories from firestore and put it in categories state
  const categoriesFromDB = () => {
    db.collection("categoriesReact")
      .get()
      .then((resp) => {
        let arr = [];
        resp.docs.forEach((doc) => {
          // arr.push(doc.data().categorieName);
          arr.push({ categorieName: doc.data().categorieName, id: doc.id });
        });
        return arr;
      })
      .then((catArray) => setCategories(catArray))
      .catch((err) => console.log(err));
  };
  // load google api client
  const gapiLoad = () => {
    gapi.load("client:auth2", () => {
      gapi.client
        .init({
          apiKey: process.env.REACT_APP_API_KEY,
          clientId: process.env.REACT_APP_CLIENT_ID,
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
  // get the events from calendar and put it in events state
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
  // load gaopi client, categories, events when app is loading
  useEffect(categoriesFromDB, []);
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
        <Route
          path="/add"
          exact
          render={(props) => <AddTransfer {...props} categories={categories} />}
        />
        <Route
          path="/"
          exact
          component={() => (
            <TransfersInCalendar isSignedIn={gapiSignedIn} events={events} />
          )}
        />
        <Route
          path="/add/details/:cat"
          exact
          render={(props) => (
            <TransferDetails
              {...props}
              getEventsFromCalendar={getEventsFromCalendar}
            />
          )}
        />
        <Route
          path="/event/:id"
          exact
          render={(props) => (
            <EventDetails
              {...props}
              getEventsFromCalendar={getEventsFromCalendar}
            />
          )}
        />
      </Aux>
    </BrowserRouter>
  );
};

export default Layout;
