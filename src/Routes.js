import React from "react";
import Menu from "./pages/Menu";
import VIPMenu from "./pages/VipMenu";
import Chefs from "./pages/Chefs/Chefs";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Discussions from "./pages/Discussions";
import Comments from "./pages/Comments";
import Balance from "./pages/Balance";
import Dashboard from "./pages/Employee/Home";
import Jobs from "./pages/Employee/Jobs";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import UserWarningCount from "./components/UserWarningCount";

import Layout from "./layouts";
import Users from "./pages/Users";
import Customer from "./pages/Customer";

const Routes = () => {
  const userRole = useSelector(({ user }) => user.role);
  return (
    <Switch>
      {/* Surfer Routes */}

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
        path="/discussions"
        render={(props) => <Layout page={Discussions} {...props} />}
      />

          <Route
        exact
        path="/discussions/:id"
        render={(props) => <Layout page={Comments} {...props} />}
      />
   {/*   
   <Route
        exact
        path="/'warningcount"
        render={(props) => <Layout page={UserWarningCount} {...props} />}
      />

      {/* Customer Routes */}

      <Route
        exact
        path="/customer"
        render={(props) => (
          <Layout isPrivate={true} type="authUser" page={Customer} {...props} />
        )}
      />
      <Route
        exact
        path="/customer/info"
        render={(props) => (
          <Layout
            isPrivate={true}
            type="authUser"
            page={() => (
              <div>
                Customer Account Extra Stuff to edit ((customerInfo model))
              </div>
            )}
            {...props}
          />
        )}
      />

      <Route
        exact
        path="/customer/balance"
        render={(props) => (
          <Layout isPrivate={true} type="authUser" page={Balance} {...props} />
        )}
      />

        
      {/* VIP Routes */}

      <Route
        exact
        path="/vipMenu"
        render={(props) => (
          <Layout isPrivate={true} page={VIPMenu} {...props} />
        )}
      />   

      {/* Employee Routes */}

      <Route
        exact
        path="/employee"
        render={(props) => (
          <Layout
            isPrivate={true}
            type="authUser"
            page={Dashboard}
            {...props}
          />
        )}
      />

      
      <Route
        exact
        path="/employee/jobs"
        render={(props) => (
          <Layout
            isPrivate={true}
            type="authUser"
            page={Jobs}
            {...props}
          />
        )}
      />

      <Route
        exact
        path="/employee/users"
        render={(props) => (
          <Layout isPrivate={true} type="authUser" page={Users} {...props} />
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
