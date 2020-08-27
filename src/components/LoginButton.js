import React from "react";

const LoginButton = ({ isLoggedIn, signIn }) => {
  console.log(isLoggedIn);
  if (isLoggedIn) {
    return (
      <div>
        <button onClick={signIn}>Login</button>
      </div>
    );
  } else {
    return null;
  }
};

export default LoginButton;
