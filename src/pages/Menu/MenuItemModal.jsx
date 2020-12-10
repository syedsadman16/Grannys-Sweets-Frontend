import React from "react";
import { isEmpty } from "lodash";
import { Button, Modal, Form, Collapse } from "react-bootstrap";
import Rating from "@material-ui/lab/Rating";
import { Link } from "react-router-dom";
import ReservationForm from "../../components/ReservationForm";
import api from "axios";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import "./Menu.css";

const colors = ["#0088FE", "#00C49F", "#ff0000", "#9500ff"];

export default class MenuItemModal extends React.Component {
  state = {
    quantity: 1,
    type: 0,
    table: 1,
    timeTo: null,
    timeFrom: null,
    message: null,
    orderSuccess: false,
    openCommentSection: false,
    comments: [],
  };

  handleQuantityChange = (event) => {
    this.setState({ quantity: event.currentTarget.value });
  };

  handleShowComments = (event) => {
    this.setState((prevState) => ({
      openCommentSection: !prevState.openCommentSection,
    }));
  };

  componentDidMount() {
    this.fetchDishRatings();
  }

  fetchDishRatings = async () => {
    try {
      let { data: res } = await api.get(
        `/rating/dishes/${this.props.modalData.dishId}`
      );
      this.setState({ comments: res });
    } catch (E) {
      console.log(E);
    }
  };

  handleChange = (changeObj) =>
    this.setState((prev) => ({ ...prev, ...changeObj }));

  makeOrder = async () => {
    let reservation = {};
    const { quantity, timeTo, timeFrom, table, type } = this.state;
    const { dishId: id } = this.props.modalData;
    try {
      if (timeTo && timeFrom && table) {
        reservation = {
          timeSlot: {
            from: new Date(timeFrom).toISOString(),
            to: new Date(timeTo).toISOString(),
          },
          table,
        };
      }
      let { data } = await api.post(`/orders`, {
        type,
        dishes: [{ id, quantity: parseInt(quantity) }],
        ...reservation,
      });
      this.setState((prev) => ({
        ...prev,
        message: "Order was successful",
        orderSuccess: true,
      }));
    } catch (e) {
      this.setState((prev) => ({
        ...prev,
        message: !isEmpty(e.response.data)
          ? e.response.data.message
          : "You are unable to Order",
      }));
    }
  };

  render() {
    const { type, table, timeTo, timeFrom, message, orderSuccess } = this.state;
    console.log(orderSuccess);
    /* If user is not signed in: render modal with option to sign in*/
    if (isEmpty(this.props.user)) {
      return (
        <Modal className="item-modal" {...this.props} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Please login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="modal-signin-message">
              Must be signed in as a customer to order
            </div>
            <Link to="/Signin">
              <Button variant="success">Take me to Sign In</Button>
            </Link>
          </Modal.Body>
        </Modal>
      );
    } else if (
      !isEmpty(this.props.user) &&
      this.props.user.role !== "CUSTOMER" &&
      this.props.user.role !== "VIP"
    ) {
      return (
        <Modal className="item-modal" {...this.props} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Please login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="modal-signin-message">
              Must be signed in as a customer to order
            </div>
          </Modal.Body>
        </Modal>
      );
    } else if (!isEmpty(this.props.user) && this.props.user.closed) {
      return (
        <Modal className="item-modal" {...this.props} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Account Closed</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="modal-signin-message">
              You can't order. Your account was closed.
            </div>
          </Modal.Body>
        </Modal>
      );
    } else if (!isEmpty(this.props.user) && !this.props.user.verified) {
      return (
        <Modal className="item-modal" {...this.props} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Account Unverified</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="modal-signin-message">
              You can't order. Wait until manager verifies your account.
            </div>
          </Modal.Body>
        </Modal>
      );
    } else if (orderSuccess) {
      return (
        <Modal className="item-modal" {...this.props} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{this.props.modalData.dishTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>{message}</div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={this.props.onHide}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      );
    } else {
      return (
        /* If user is signed in and is a customer: render modal allowing them to order*/
        <Modal className="item-modal" {...this.props} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{this.props.modalData.dishTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <>
              {" "}
              <div className="modal-item-img">
                <img
                  onError={(event) => {
                    event.target.src =
                      "/Online-Restaurant-System-Frontend/favicon.ico";
                  }}
                  src={this.props.modalData.dishImage}
                  width="300"
                  height="200"
                  alt="dish"
                />
              </div>
              <div className="modal-dish-desc">
                {this.props.modalData.dishDescription}
              </div>
              <Rating
                name="read-only"
                value={this.props.modalData.dishRating}
                readOnly
                precision={0.5}
                size="medium"
              />
              <div className="modal-keyword-container">
                {this.props.modalData.keywords.map((el, i) => (
                  <Button
                    disabled="true"
                    style={{
                      backgroundColor: colors[i],
                      borderColor: colors[i],
                      marginRight: "1rem",
                    }}
                  >
                    {el}
                  </Button>
                ))}
              </div>
              <Form.Group className="modal-quantity-form">
                <Form.Label>Quantity</Form.Label>
                <Form.Control as="select" onChange={this.handleQuantityChange}>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </Form.Control>
              </Form.Group>
              {console.log("Event Value", this.state.quantity)}
              <div>
                <p>Choose Order Type Pickup:</p>
                Pick-up
                <input
                  type="radio"
                  name="type"
                  value={0}
                  defaultChecked
                  onClick={() =>
                    this.setState((prev) => ({ ...prev, type: 0 }))
                  }
                />
                Delivery:
                <input
                  type="radio"
                  name="type"
                  value={1}
                  onClick={() =>
                    this.setState((prev) => ({ ...prev, type: 1 }))
                  }
                />
                Reservation:
                <input
                  type="radio"
                  name="type"
                  value={2}
                  onClick={() =>
                    this.setState((prev) => ({ ...prev, type: 2 }))
                  }
                />
              </div>
              <ReservationForm
                shouldShow={type === 2}
                handleChange={this.handleChange}
                table={table}
                timeFrom={timeFrom}
                timeTo={timeTo}
              />
              {message}
            </>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="danger" onClick={this.props.onHide}>
              Cancel
            </Button>
            <Button variant="success" onClick={this.makeOrder}>
              Place Order
            </Button>
          </Modal.Footer>
          <Button onClick={this.handleShowComments}>
            Show User Comments and Ratings
          </Button>
          <Collapse in={this.state.openCommentSection}>
            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
              {isEmpty(this.state.comments) ? (
                <>No Comments Yet</>
              ) : (
                this.state.comments.map((el) => (
                  <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                    <ListItem button>
                      <ListItemAvatar>
                        <AccountCircleIcon></AccountCircleIcon>
                      </ListItemAvatar>
                      <ListItemText primary={`User ID:${el.critic.id}`} />
                      <ListItemText primary={`${el.comments}`} />
                      <Rating
                        name="read-only"
                        value={el.rating}
                        readOnly
                        precision={0.5}
                        size="medium"
                      />
                    </ListItem>
                  </div>
                ))
              )}
            </div>
          </Collapse>
        </Modal>
      );
    }
  }
}
