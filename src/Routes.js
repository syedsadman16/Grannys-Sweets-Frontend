import React from "react";
import Menu from "./pages/Menu";
import Chefs from "./pages/Chefs";
import Signin from "./pages/Signin";
import { Switch, Route } from "react-router-dom";
const Routes = (props) => {
  return (
    <Switch>
      <Route exact path="/menu" component={Menu} />
      <Route exact path="/Chefs" component={Chefs} />
      <Route exact path="/Signin" component={Signin} />
    </Switch>
  );
};

export default Routes;
