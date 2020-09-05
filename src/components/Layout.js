import React from "react";
import Aux from "../hoc/Aux";

const Layout = (props) => {
  return (
    <Aux>
      <div>Toolbar SideDrawer, Backdrop</div>
      {props.children}
    </Aux>
  );
};

export default Layout;
