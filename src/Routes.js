import React from "react";
import Menu from "./pages/Menu";
import Chefs from "./pages/Chefs";
import Signin from "./pages/Signin";
import { Switch, Route, Redirect } from "react-router-dom";
import Layout from "./layouts";

const Routes = () => {
  return (
    <Switch>
      {/* Customer Routes */}

      <Route
        exact
        path="/"
        render={(props) => <Layout page={() => <div>Home</div>} {...props} />}
      />
      <Route
        exact
        path="/menu"
        render={(props) => <Layout page={Menu} {...props} />}
      />
      <Route
        exact
        path="/chefs"
        render={(props) => <Layout page={Chefs} {...props} />}
      />
      <Route
        exact
        path="/signin"
        render={(props) => <Layout page={Signin} {...props} />}
      />
      <Route
        exact
        path="/balance"
        render={(props) => (
          <Layout
            isPrivate={true}
            page={() => <div>Customer balance</div>}
            {...props}
          />
        )}
      />

      {/* Employee Routes */}

      <Route
        exact
        path="/employees"
        render={(props) => (
          <Layout
            isPrivate={true}
            type="employee"
            page={() => <div>Employees HOmes</div>}
            {...props}
          />
        )}
      />
      <Route render={() => <Redirect to="/" />} />
    </Switch>
  );
};

export default Routes;
