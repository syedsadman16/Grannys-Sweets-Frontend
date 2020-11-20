import React from "react";
import { isEmpty } from "lodash";
import { 
  Button,
  Modal,
  Form, 
} from "react-bootstrap";
import Rating from '@material-ui/lab/Rating';
import { Link } from "react-router-dom";

import "./Menu.css";

const colors = ['#0088FE', '#00C49F', '#ff0000', '#9500ff'];

export default class MenuItemModal extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      quantity: 1,
    }
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
  }
  
  handleQuantityChange(event){
    this.setState({quantity: event.target.value})
  }

  render(){ 
    const {quantity} = this.state;
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
            <div className="modal-item-img">
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
            <div className="modal-dish-desc">
              {this.props.modalData.dishDescription}
            </div>
            <Rating name="read-only" value={4.5} readOnly precision={0.5} size="medium"/>
            <div className="modal-keyword-container">
              {
                this.props.modalData.keywords.map( 
                  (el, i) => (
                    <Button disabled="true" style={{backgroundColor: colors[i], borderColor: colors[i],marginRight: "1rem"}} > 
                     {el}
                    </Button>
                  )
                )
              }
            </div>
            <Form.Group className="modal-quantity-form">
              <Form.Label>Quantity</Form.Label>
              <Form.Control as="select" onChange={this.handleQuantityChange}>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
              </Form.Control>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.props.onHide}>
              Cancel
            </Button>
            <Button variant="success" onClick={() => this.props.handleOrder(quantity)}>
              Place Order
            </Button>
          </Modal.Footer>
        </Modal>
      }
      </>
    );
  }

}