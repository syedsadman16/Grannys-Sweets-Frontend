import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Rating from "@material-ui/lab/Rating";
import UserWarnings from "../../components/UserWarningCount";
import api from "axios";
import { makeStyles } from "@material-ui/core";

const ChefDashboard = () => {
  const user = useSelector(({ user }) => user);
  const [avgRating, setAvgRating] = useState(0);

  const fetchChefAverageRating = async () => {
    try {
      let { data: rating } = await api.get(`/rating/chef/${user.id}`, {
        id: user.id,
      });
      setAvgRating(rating);
    } catch (E) {
      console.log(E);
    }
  };

  useEffect(() => {
    fetchChefAverageRating();
  }, []);

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
      <div className={classes.info}>
        <UserWarnings />
      </div>
      Average dish rating for {user.username}:
      <Rating value={parseInt(avgRating)} precision={0.5} readOnly /> (
      {parseFloat(avgRating).toPrecision(3)})
    </div>
  );
};

export default ChefDashboard;
