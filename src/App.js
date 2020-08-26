import React, { useEffect, useState } from "react";
import "./App.css";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  console.log(isLoggedIn, isLoggedOut);
  const gapi = window.gapi;
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const API_KEY = process.env.REACT_APP_API_KEY;
  const DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ];
  const SCOPES = "https://www.googleapis.com/auth/calendar.events";

  // function to control witch button apear
  function flipButtonStates(status) {
    console.log(status);
    if (status) {
      setIsLoggedIn(false);
      setIsLoggedOut(true);
    } else {
      setIsLoggedIn(true);
      setIsLoggedOut(false);
    }
  }
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
        .then(() =>
          flipButtonStates(gapi.auth2.getAuthInstance().isSignedIn.get())
        )
        // add listener for signin stautus change
        .then(() => {
          gapi.auth2.getAuthInstance().isSignedIn.listen(flipButtonStates);
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
  useEffect(gapiLoad, []);

  return (
    <div className="App">
      <LoginButton isLoggedIn={isLoggedIn} signIn={signIn} />
      <LogoutButton isLoggedOut={isLoggedOut} signOut={signOut} />
    </div>
  );
}

export default App;
