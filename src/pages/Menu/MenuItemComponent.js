import React from "react";
import { Grid, Divider } from "@material-ui/core/";
import MenuItemModal from "./MenuItemModal";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Rating from "@material-ui/lab/Rating";
import "./Menu.css";

function MenuItemComponent({ el }) {
  return (
    <div>
      <Grid item key={el.dishId}>
        <div className="item-container">
          <div className="dish-img-container">
            <img
              onError={(event) => {
                event.target.src =
                  "/Online-Restaurant-System-Frontend/favicon.ico";
              }}
              src={el.dishImage}
              width="298"
              height="200"
              alt="dish"
            />
          </div>
          <Divider />
          <div className="dish-title-container">{el.dishTitle}</div>
          <div className="rating-container">
            <Rating
              name="hover-feedback"
              value={el.dishRating}
              precision={0.5}
            />
          </div>
          {el.dishDescription.length > 71 ? (
            <div className="dish-desc-container">
              {el.dishDescription.substring(0, 71) + " ..."}
            </div>
          ) : (
            <div className="dish-desc-container">{el.dishDescription}</div>
          )}
          <div className="price-add-btn-container">
            <div className="dish-price-container">${el.dishPrice}</div>
            <div className="add-cart-btn">
              <Button
                variant="success"
                onClick={() =>
                  this.setState({
                    modalShow: true,
                    modalData: el,
                    orderItemId: el.dishId,
                  })
                }
              >
                Order
              </Button>
            </div>
          </div>
        </div>
      </Grid>
    </div>
  );
}

export default MenuItemComponent;
