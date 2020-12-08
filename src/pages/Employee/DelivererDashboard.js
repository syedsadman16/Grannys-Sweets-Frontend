import { makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import UserWarnings from "../../components/UserWarningCount";

const DelivererDashboard = () => {
  const role = useSelector(({ user }) => user.role);
  const username = useSelector(({ user }) => user.username);

  const useStyles = makeStyles(() => ({
    root: {
      padding: "2em",
      display: "flex",
      flexDirection: "column",
    },
    info: {
      alignSelf: "center",
      margin: "1em",
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1>Deliverer Dashboard</h1>
      <div className={classes.info}>
        <UserWarnings />
      </div>
    </div>
  );
};

export default DelivererDashboard;
