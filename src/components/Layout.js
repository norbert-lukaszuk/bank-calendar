import React, { useState, useEffect } from "react";
import Aux from "../components/wraper";
import { BrowserRouter, Route } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import AddTransfer from "../containers/AddTransfer/AddTransfer";
import TransferDetails from "../containers/TransferDetails/TransferDetails";
import TransfersInCalendar from "../containers/TransfersInCalendar/TransfersInCalendar";
import EventDetails from "../containers/EventDetails/EventDetails";
import classes from "../App.module.scss";
import Navigation from "./Navigation";

const Layout = (props) => {
  const [gapiSignedIn, setGapiSignedIn] = useState(false);
  const [firestoreSignedIn, setFirestoreSignedIn] = useState(false);
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const gapi = window.gapi;
  const DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ];
  const SCOPES = "https://www.googleapis.com/auth/calendar.events";
  const db = window.firebase.firestore();
  const auth = window.firebase.auth;
  // const firebase = window.firebase;
  const provider = new auth.GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  console.log(provider);
  console.log(categories);

  // get categories from firestore if signed in and put it in categories state

  const getCategories = () => {
    auth().onAuthStateChanged((user) => {
      if (user) {
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
      } else {
        setCategories([]);
      }
    });
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
  // click on bars to open sliding menu
  const barCLickHandler = (e) => {
    setShowMenu(!showMenu);
    console.log(e);
  };
  // click on backdrop to close sliding menu && passed it down to Backdrop component trough Navigation
  const backdropClickHandler = () => {
    setShowMenu(false);
  };
  // load gaopi client, categories, events when app is loading
  // useEffect(categoriesFromDB, []);
  useEffect(getCategories, [gapiSignedIn]);
  useEffect(gapiLoad, []);
  useEffect(getEventsFromCalendar, [gapiSignedIn]);
  return (
    <BrowserRouter>
      <Aux>
        <FontAwesomeIcon
          icon={faBars}
          size="2x"
          onClick={barCLickHandler}
          className={classes.navigationButton}
        />
        <Navigation
          showMenu={showMenu}
          backdropClickHandler={backdropClickHandler}
          gapiSignedIn={gapiSignedIn}
          provider={provider}
        />

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
