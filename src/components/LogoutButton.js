import React from "react";

const LogoutButton = ({ isLoggedOut, signOut }) => {
  console.log(isLoggedOut);
  if (isLoggedOut) {
    return (
      <div>
        <button onClick={signOut}>Logout</button>
      </div>
    );
  } else {
    return null;
  }
};

export default LogoutButton;
