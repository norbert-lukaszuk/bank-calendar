import React from "react";
import "./LoginButton.css";

const LoginButton = ({ isLoggedIn, signIn }) => {
  if (isLoggedIn) {
    return (
      <div className="loginButton">
        <button onClick={signIn}>Login</button>
      </div>
    );
  } else {
    return null;
  }
};

export default LoginButton;
