import React from "react";
import { isEmpty } from "lodash";
import { 
  Button,
  Modal, 
} from "react-bootstrap";
import { Link } from "react-router-dom";

export default class MenuItemModal extends React.Component{

  render(){ 
    return (
      <>
      {
        /* If user is not signed in: render modal with option to sign in*/
        isEmpty(this.props.user) ?
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
        :
        /* If user is signed in but is NOT a customer: render modal telling user they must be a customer to order*/
        !isEmpty(this.props.user) && this.props.user.role !== "CUSTOMER" ?
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
        :
        /* If user is signed in and is a customer: render modal allowing them to order*/
        <Modal className="item-modal" {...this.props} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{this.props.modalData.dishTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <img
                onError={(event) => {
                  event.target.src = "/Online-Restaurant-System-Frontend/favicon.ico";
                }}
                src="/Online-Restaurant-System-Frontend/menu-item-img-default.jpg"
                width="300"
                height="200"
                alt="dish"
              />
            </div>
            <div>
              {this.props.modalData.dishDescription}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.props.onHide}>
              Cancel
            </Button>
            <Button variant="success" onClick={this.props.onHide}>
              Place Order
            </Button>
          </Modal.Footer>
        </Modal>
      }
      </>
    );
  }

}