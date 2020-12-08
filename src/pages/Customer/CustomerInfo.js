import axios from "axios";
import React, { useState, useEffect } from "react";
import Layout from "./../../layouts";
import Home from "./../Home";
import { Route, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import "./Customer.css";

import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useSelector } from "react-redux";

function CustomerInfo() {
  const [info, setInfo] = useState([]);
  const id = useSelector(({ user }) => user.id);
  const url = "/users/" + id;
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    async function loadUserInfo() {
      const userinfo = await axios.get(url);
      setInfo(userinfo.data);
      return userinfo;
    }
    loadUserInfo();
  }, [url]);

  async function deleteAccount() {
    try {
      await axios.patch("/users", { closed: true });
    } catch (E) {
      console.log(E);
    }
    window.location.reload();
  }

  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }

  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

  const classes = useStyles();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div>
        <h3> Are you sure you want to delete your account? </h3>
        <span>
          {" "}
          Warning: You will lose all of your data linked with Grannys Sweets
        </span>
        <button className="delete-btn" onClick={() => deleteAccount()}>
          {" "}
          Delete Account
        </button>
      </div>
    </div>
  );

  const useStylesCard = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
      margin: 10,
      padding: 10,
    },
  }));
  const card_class = useStylesCard();

  return (
    <div>
      <Card className={card_class.root}>
        <CardHeader title="Change User Information" />
        <CardContent>
          <h6>Enter new Username</h6>

          <section align="left">
            <input name="username" placeholder="Username" />
          </section>
        </CardContent>
      </Card>

      <Card className={card_class.root}>
        <CardHeader title="My Account Settings" />
        <button className="delete-btn" type="button" onClick={handleOpen}>
          Delete Account
        </button>
        <Modal open={open} onClose={handleClose}>
          {body}
        </Modal>
      </Card>
    </div>
  );
}
export default CustomerInfo;
