import React from "react";
import { Grid, Divider } from "@material-ui/core/";
import MenuItemModal from "./MenuItemModal";
import { 
  Form,
  Button, 
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

import "./Menu.css";

export default class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
      searchText: '',
      modalShow: false,
      modalData: {
        dishId: 1,
        dishTitle: "Cup Cake",
        dishDescription: "Some sort of description for a dish",
        dishPrice: "5.99",
        keywords: ["sweet", "cake", "cup"]
      },
      orderItemQuantity: null,
      orderItemId: null,
    };
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleModalOrder = this.handleModalOrder.bind(this);
  }

  handleModalClose() {
    this.setState({modalShow: false})
  }

  /* takes in a quantity from the modal state and updates here then makes backend order call*/
  handleModalOrder(quantity) {
    this.setState({orderItemQuantity: parseInt(quantity), modalShow: false });
    /* MAKE ORDER BACKEND API CALL HERE*/
  }

  handleSearchTextChange(event) {
    this.setState({ searchText: event.target.value });
  }

  componentDidMount() {
    //**MAKE API CALL TO BACKEND HERE**//
    axios.get('menu')
    .then(element =>{
      console.log(element.data);
     let newData = element.data.map(element => ({
          dishId : element.id,
          dishTitle: element.name,
          dishDescription: "random desc",
          dishPrice: element.price,
          keywords: ["sweet","cake"]
        }))
        this.setState({ 
           data: [...this.state.data, ...newData],
           isLoading: false
        });
    });
  }
  // this.setState({
  //   isLoading: false,
  //     data: [
  //       {
  //         dishId: 1,
  //         dishTitle: "Cup Cake",
  //         dishDescription: "Some sort of description for a dish",
  //         dishPrice: "5.99",
  //         keywords: ["sweet", "cake", "cup"]
  //       },
  //       {
  //         dishId: 2,
  //         dishTitle: "Cheese Cake",
  //         dishDescription:
  //           "Some sort of description for a dish except this one is a bit longer and it may overflow",
  //         dishPrice: "8.99",
  //         keywords: ["sweet", "cake", "cheese"]
  //       },
  //       {
  //         dishId: 3,
  //         dishTitle: "Birthday Cake",
  //         dishDescription: "Some sort of description for a dish",
  //         dishPrice: "2.99",
  //         keywords: ["sweet", "cake", "low-fat", "birthday","dessert"]
  //       },
  //       {
  //         dishId: 4,
  //         dishTitle: "Cookie Cake",
  //         dishDescription: "Some sort of description for a dish",
  //         dishPrice: "15.99",
  //         keywords: ["sweet", "cake", "cookie",]
  //       },
  //       {
  //         dishId: 5,
  //         dishTitle: "Some Other Type Of Cake",
  //         dishDescription: "Some sort of description for a dish",
  //         dishPrice: "5.99",
  //         keywords: ["sweet", "cake"]
  //       },
  //       {
  //         dishId: 6,
  //         dishTitle: "Vegan Cake",
  //         dishDescription: "Some sort of description for a vegan cake",
  //         dishPrice: "15.99",
  //         keywords: ["cake", "vegan", "low-fat"]
  //       },
  //       {
  //         dishId: 7,
  //         dishTitle: "Boston Cream Donut",
  //         dishDescription: "Some sort of description for a donut",
  //         dishPrice: "2.99",
  //         keywords: ["donut", "boston", "cream"]
  //       },
  //       {
  //         dishId: 8,
  //         dishTitle: "Vanilla Cream Donut",
  //         dishDescription: "Some sort of description for a donut",
  //         dishPrice: "2.99",
  //         keywords: ["donut","vanilla", "cream"]
  //       },
  //     ]
  //   })
  // }
  

  render() {
    const {data, isLoading, searchText, modalShow , modalData, orderItemId } = this.state;
    console.log(this.state)
    return (
      <>
        <div className="page-title-container">
          <div className="page-title-text">Menu</div>
          <div className="menu-icon-divider-container">
            <hr className="title-divider-left" />
            <FontAwesomeIcon icon={faUtensils} size="2x" color="gray" />
            <hr className="title-divider-right" />
          </div>
        <div className="menu-searchbox-container">
          <Form inline>
            <Form.Control className="mr-sm-2" 
              type="text"
              value={searchText} 
              placeholder="Search" 
              onChange={this.handleSearchTextChange} 
            />
            <Button variant="outline-info">Search</Button>
          </Form>
        </div>
        </div>
        {!isLoading ? (
          <div className="menu-items-container">
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              spacing={2}
            > 
            {
            data.filter(p => p.keywords.some( (s) => {
              if(searchText === '')
                  return s
              else if(s.indexOf(searchText.toLowerCase()) !== -1){
                  return s
              }
            }    
            ))
                .map((el) => (
                  <Grid item key={el.dishId}>
                    <div className="item-container">
                      <div className="dish-img-container">
                        <img
                          onError={(event) => {
                            event.target.src = "/Online-Restaurant-System-Frontend/favicon.ico";
                          }}
                          src="/Online-Restaurant-System-Frontend/menu-item-img-default.jpg"
                          width="298"
                          height="200"
                          alt="dish"
                        />
                      </div>
                      <Divider />
                      <div className="dish-title-container">{el.dishTitle}</div>
                      {/* The following code renders the dish description */}
                      {/* If the dish description is too long, the substring is used followed by ellipses to indicate overflow */}
                      {el.dishDescription.length > 71 ? (
                        <div className="dish-desc-container">
                          {el.dishDescription.substring(0, 71) + " ..."}
                        </div>
                      ) : (
                        <div className="dish-desc-container">
                          {el.dishDescription}
                        </div>
                      )}
                      <div className="price-add-btn-container">
                        <div className="dish-price-container">
                          ${el.dishPrice}
                        </div>
                        <div className="add-cart-btn">
                          <Button variant="success" onClick={() => this.setState({modalShow: true, modalData: el, orderItemId: el.dishId})}>Add to Cart</Button>
                        </div>
                      </div>
                    </div>
                  </Grid>
                ))
            }
            </Grid>
            <MenuItemModal show={modalShow} handleOrder={this.handleModalOrder} onHide={this.handleModalClose} modalData={modalData} {...this.props} />
          </div>
        ) : (
          <h3>Unable to Load Menu Data</h3>
        )}
      </>
    );
  }
}
