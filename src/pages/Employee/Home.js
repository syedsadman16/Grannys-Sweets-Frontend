import React from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";

import LatestOrders from "../../components/LatestOrders";
import TotalCustomers from "../../components/TotalCustomers";
import TotalProfit from "../../components/TotalProfit";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const managerDashboard = (
  <Container maxWidth={false}>
    <Grid container spacing={3}>
      <Grid item lg={3} sm={6} xl={3} xs={12}>
        <TotalCustomers />
      </Grid>
      <Grid item lg={3} sm={6} xl={3} xs={12}>
        <TotalProfit />
      </Grid>
      <Grid item lg={8} md={12} xl={9} xs={12}>
        <LatestOrders />
      </Grid>
    </Grid>
  </Container>
);

const chefDashboard = (
  <h1>
    Chef's Dashboard
  </h1>
);

const delivererDashboard = (
  <h1>
    Deliverer Dashboard
  </h1>
);

const Dashboard = () => {
  const classes = useStyles();
  const role = useSelector(({ user }) => user.role);

  return (
    <div className={classes.root}>
      {
        role === "MANAGER" ?
        managerDashboard
        :
        role === "DELIVERER" ? 
        delivererDashboard
        :
        role === "CHEF" ? 
        chefDashboard
        :
        null
      }  
    </div>
  );
};

export default Dashboard;
