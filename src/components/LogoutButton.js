import React from "react";
import "./LogoutButton.css";
const LogoutButton = ({ isLoggedOut, signOut }) => {
  console.log(isLoggedOut);
  if (isLoggedOut) {
    return (
      <div className="logoutButton">
        <button onClick={signOut}>Logout</button>
      </div>
    );
  } else {
    return null;
  }
};

export default LogoutButton;
