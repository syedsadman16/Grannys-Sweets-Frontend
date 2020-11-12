import React from "react";
import Menu from "./pages/Menu";
import Chefs from "./pages/Chefs/Chefs";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Dashboard from "./pages/Employee/Home";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import Layout from "./layouts";

const Routes = () => {
  const userRole = useSelector(({ user }) => user.role);
  return (
    <Switch>
      {/* Customer Routes */}

      <Route
        exact
        path="/"
        render={(props) => <Layout page={Home} {...props} />}
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
        path="/signup" 
        render={(props) => <Layout page={Signup} {...props} />} 
      />
      <Route
        exact
        path="/account"
        render={(props) => (
          <Layout
            isPrivate={true}
            page={() => <div>Customer Account</div>}
            {...props}
          />
        )}
      />

      {/* Employee Routes */}

      <Route
        exact
        path="/employee"
        render={(props) => (
          <Layout
            isPrivate={true}
            type="employee"
            page={Dashboard}
            {...props}
          />
        )}
      />
      <Route
        render={() => (
          <Redirect to={userRole !== "CUSTOMER" ? "/employee" : "/"} />
        )}
      />
    </Switch>
  );
};

export default Routes;
