import React from "react";

import { HashRouter as Router } from "react-router-dom";

import NavBar from "./components/NavBar";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Routes from "./Routes";

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      loggedInStatus: false,
    };
  }

  render() {
    return (
      <>
        <Router>
          <NavBar />
          <Routes />
        </Router>
      </>
    );
  }
}
