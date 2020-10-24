import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Menu from "./pages/Menu";
import Chefs from "./pages/Chefs";
import Signin from "./pages/Signin";
import NavBar from "./components/NavBar";

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
      <>
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/menu" component={Menu} />
            <Route exact path="/Chefs" component={Chefs} />
            <Route exact path="/Signin" component={Signin} />
          </Switch>
        </Router>
      </>
    );
  }
}
