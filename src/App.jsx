import React from "react";
import { HashRouter as Router } from "react-router-dom";
import Routes from "./Routes";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      loggedInStatus: false,
    };
  }

  render() {
    return (
      <Router>
        <Routes />
      </Router>
    );
  }
}
