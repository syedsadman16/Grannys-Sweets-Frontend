import React from 'react';
import {Grid, Divider} from '@material-ui/core/';
import {Navbar, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';

import './Menu.css';

export default class Menu extends React.Component{
    constructor(){
      super();

      this.state = {
        data: [],
        isLoading: true,
      }
    }

    componentDidMount(){
      //**MAKE API CALL TO BACKEND HERE**//
      this.setState({
        isLoading:false,
        data: [
          {
            dishId: 1,
            dishTitle: "Cup Cake",
            dishDescription: "Some sort of description for a dish",
            dishPrice: "5.99"
          },
          {
            dishId: 2,
            dishTitle: "Cheese Cake",
            dishDescription: "Some sort of description for a dish except this one is a bit longer and it may overflow",
            dishPrice: "8.99"
          },
          {
            dishId: 3,
            dishTitle: "Birthday Cake",
            dishDescription: "Some sort of description for a dish",
            dishPrice: "2.99"
          },
          {
            dishId: 4,
            dishTitle: "Cookie Cake",
            dishDescription: "Some sort of description for a dish",
            dishPrice: "15.99"
          },
          {
            dishId: 5,
            dishTitle: "Some Other Type Of Cake",
            dishDescription: "Some sort of description for a dish",
            dishPrice: "5.99"
          },
        ]
      })
    }

    render() {
      const { data, isLoading} = this.state;
      console.log(data)
      return (
        <>
        <div className="page-title-container">
          <div className="page-title-text">
            Menu
          </div>
          <div className="menu-icon-divider-container">
            <hr className="title-divider-left"/>
            <FontAwesomeIcon icon={faUtensils} size="2x" color="gray" />
            <hr className="title-divider-right"/>
          </div>
        </div>
        {!isLoading ? 
        (
        <div className="menu-items-container">
          <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
            {data.map( (el) => 
              (
                <Grid item key={el.dishId}>
                  <div className="item-container">
                    <div className="dish-img-container">
                      <img
                        onError={(event) => { event.target.src = "/favicon.png"; }}
                        src="/menu-item-img-default.jpg"
                        width="298"
                        height="200"
                        alt="dish"
                      />
                    </div>
                    <Divider/>
                    <div className="dish-title-container">
                      {el.dishTitle}
                    </div>
                    {/* The following code renders the dish description */}
                    {/* If the dish description is too long, the substring is used followed by ellipses to indicate overflow */}
                    {el.dishDescription.length > 71 ?
                      (
                        <div className="dish-desc-container">
                          {el.dishDescription.substring(0,71) + ' ...' }
                        </div>
                      )
                      :
                      (
                        <div className="dish-desc-container">
                          {el.dishDescription}
                        </div>
                      )
                    }
                    <div className="price-add-btn-container">
                      <div className="dish-price-container">
                        ${el.dishPrice}
                      </div>
                      <div className="add-cart-btn">
                        <Button variant="success">Add to Cart</Button>
                      </div>
                    </div>
                  </div>
                </Grid>
              )
            )}
          </Grid>
        </div>
        ) 
        : 
        <h3>
          Unable to Load Menu Data
        </h3>
        }
        </>
      );
    }
}