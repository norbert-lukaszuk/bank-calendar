import React from "react";

const LogoutButton = ({ isLoggedOut }) => {
  if (isLoggedOut) {
    return (
      <div>
        <button>Logout</button>
      </div>
    );
  } else {
    return null;
  }
};

export default LogoutButton;
