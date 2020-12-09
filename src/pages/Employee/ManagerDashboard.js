import React from "react";
import { Container, Grid } from "@material-ui/core";
import Users from "../Users";

const ManagerDashboard = () => {
  return (
    <Container maxWidth={false}>
      <Users />
    </Container>
  );
};

export default ManagerDashboard;
