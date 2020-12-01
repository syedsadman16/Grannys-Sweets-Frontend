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
import TrackJob from "./pages/Employee/InProgress";
import DishForm from "./pages/Employee/DishForm";
import ChefJob from "./pages/Employee/ChefJob";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import UserWarningCount from "./components/UserWarningCount";

import Layout from "./layouts";
import Users from "./pages/Users";
import Customer from "./pages/Customer";
import Taboo from "./pages/Taboo";
import Complaints from "./pages/Complaints";
import ManagerOrders from "./pages/ManagerOrders";
import CustomerOrders from "./pages/CustomerOrders";
import CustomerInfo from "./pages/Customer/CustomerInfo";
import Reservations from "./pages/Reservations";

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
          <Layout isPrivate={true} type="authUser" page={CustomerInfo} {...props}/>
        )}
      />

      <Route
        exact
        path="/customer/balance"
        render={(props) => (
          <Layout isPrivate={true} type="authUser" page={Balance} {...props} />
        )}
      />

      <Route
        exact
        path="/customer/orders"
        render={(props) => (
          <Layout isPrivate={true} type="authUser" page={CustomerOrders} {...props} />
        )}
      />

      <Route
        exact
        path="/customer/reservations"
        render={(props) => (
          <Layout isPrivate={true} type="authUser" page={Reservations} {...props} />
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
        path="/employee/currentJobs"
        render={(props) => (
          <Layout
            isPrivate={true}
            type="authUser"
            page={TrackJob}
            {...props}
          />
        )}
      />

      <Route
        exact
        path="/employee/createDish"
        render={(props) => (
          <Layout
            isPrivate={true}
            type="authUser"
            page={DishForm}
            {...props}
          />
        )}
      />

      <Route
        exact
        path="/employee/CookJobs"
        render={(props) => (
          <Layout
            isPrivate={true}
            type="authUser"
            page={ChefJob}
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
        exact
        path="/employee/taboo"
        render={(props) => (
          <Layout isPrivate={true} type="authUser" page={Taboo} {...props} />
        )}
      />

      <Route
        exact
        path="/employee/complaints"
        render={(props) => (
          <Layout isPrivate={true} type="authUser" page={Complaints} {...props} />
        )}
      />

      <Route
        exact
        path="/employee/managerorders"
        render={(props) => (
          <Layout isPrivate={true} type="authUser" page={ManagerOrders} {...props} />
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
