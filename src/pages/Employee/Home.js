import React from "react";
import { makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import ManagerDashboard from "./ManagerDashboard";
import ChefDashboard from "./ChefDashboard";
import DelivererDashboard from "./DelivererDashboard";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const role = useSelector(({ user }) => user.role);
  const username = useSelector(({ user }) => user.username);

  return (
    <div className={classes.root}>
      {
        role === "MANAGER" ?
        <ManagerDashboard/>
        :
        role === "DELIVERER" ? 
        <DelivererDashboard/>
        :
        role === "CHEF" ? 
        <ChefDashboard/>
        :
        null
      }  
    </div>
  );
};

export default Dashboard;
