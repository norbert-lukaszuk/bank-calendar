import React, { Component } from "react";
import classes from "./App.module.scss";
import Layout from "./components/Layout";
import AddTransfer from "./containers/AddTransfer/AddTransfer";

export class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <AddTransfer />
        </Layout>
      </div>
    );
  }
}

export default App;
