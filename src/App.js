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

  function flipButtonStates(status) {
    if (status) {
      setIsLoggedIn(false);
      setIsLoggedOut(true);
    } else {
      setIsLoggedIn(true);
      setIsLoggedOut(false);
    }
  }
  const gapiLoad = () => {
    gapi.load("client:auth2", () => {
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        })
        .then(() =>
          gapi.auth2.getAuthInstance().isSignedIn.listen(flipButtonStates)
        )
        .then(console.log("client initieted"))
        .then(gapi.client.load("calendar", "v3", () => {}));
    });
  };

  const signIn = () => {
    gapi.auth2.getAuthInstance().signIn();
    setIsLoggedIn(true);
  };

  useEffect(gapiLoad, []);
  return (
    <div className="App">
      <LoginButton isLoggedIn={isLoggedIn} signIn={signIn} />
      <LogoutButton isLoggedOut={isLoggedOut} />
    </div>
  );
}

export default App;
