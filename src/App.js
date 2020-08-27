import React, { useEffect, useState } from "react";
import "./App.css";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import SingleEvent from "./components/SingleEvent";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [events, setEvents] = useState([]);
  console.log("App -> events", events);
  console.log(isLoggedIn, isLoggedOut);
  const gapi = window.gapi;
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const API_KEY = process.env.REACT_APP_API_KEY;
  const DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ];
  const SCOPES = "https://www.googleapis.com/auth/calendar.events";

  // function to control witch button apear
  const flipLogginStates = (status) => {
    console.log(status);
    if (status) {
      setIsLoggedIn(false);
      setIsLoggedOut(true);
      getEventsFromCalendar();
    } else {
      setIsLoggedIn(true);
      setIsLoggedOut(false);
      setEvents([]);
    }
    return status;
  };
  // gapi initialization
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
          flipLogginStates(gapi.auth2.getAuthInstance().isSignedIn.get());
        })
        // add listener for signin stautus change
        .then(() => {
          gapi.auth2.getAuthInstance().isSignedIn.listen(flipLogginStates);
        });
    });
  };
  // sign in gapi method passed to signin button
  const signIn = () => {
    gapi.auth2.getAuthInstance().signIn();
  };
  // sign out gapi method passed to signout button
  const signOut = () => {
    gapi.auth2.getAuthInstance().signOut();
  };

  const getEventsFromCalendar = () => {
    gapi.client.calendar.events
      .list({
        calendarId: "primary",
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 15,
        orderBy: "startTime",
      })
      .then((response) => {
        const events = response.result.items;
        console.log("EVENTS: ", events);
        setEvents(events);
      });
  };
  const EventClickHandler = (eventIndex) => {
    console.log(eventIndex);
    const eventsToEdit = [...events];
    eventsToEdit.splice(eventIndex, 1);
    setEvents(eventsToEdit);
  };
  useEffect(gapiLoad, []);

  return (
    <div className="App">
      <LoginButton isLoggedIn={isLoggedIn} signIn={signIn} />
      <LogoutButton isLoggedOut={isLoggedOut} signOut={signOut} />
      {events.map((event, index) => {
        if (!isLoggedIn) {
          return (
            <SingleEvent
              event={event}
              key={index}
              EventClickHandler={() => EventClickHandler(index)}
            />
          );
        } else {
          return null;
        }
      })}
    </div>
  );
}

export default App;
