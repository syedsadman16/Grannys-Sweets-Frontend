import React from "react";
import { Container, Grid} from "@material-ui/core";

import LatestOrders from "../../components/LatestOrders";
import TotalCustomers from "../../components/TotalCustomers";
import TotalProfit from "../../components/TotalProfit";
import { useSelector } from "react-redux";

const ManagerDashboard = () => {
  const role = useSelector(({ user }) => user.role);
  const username = useSelector(({ user }) => user.username);

  return (
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
};

export default ManagerDashboard;