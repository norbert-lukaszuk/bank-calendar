import React from "react";
import "./LoginButton.css";

const LoginButton = ({ isLoggedIn, signIn }) => {
  if (isLoggedIn) {
    return (
      <div className="loginButton">
        <span onClick={signIn}>Login</span>
      </div>
    );
  } else {
    return null;
  }
};

export default LoginButton;
