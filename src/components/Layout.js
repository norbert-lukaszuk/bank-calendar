import React from "react";
import Aux from "../components/wraper";
import { BrowserRouter, Route, Link } from "react-router-dom";
import AddTransfer from "../containers/AddTransfer/AddTransfer";
import TransferDetails from "../containers/TransferDetails/TransferDetails";
const Layout = (props) => {
  return (
    <BrowserRouter>
      <Aux>
        <div>
          Toolbar SideDrawer, Backdrop, <Link to="/add">Add</Link>
        </div>
        {/* {props.children} */}
        <Route path="/add" exact component={AddTransfer} />
        <Route path="/add/details/:cat" component={TransferDetails} />
      </Aux>
    </BrowserRouter>
  );
};

export default Layout;
