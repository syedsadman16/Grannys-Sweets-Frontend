import React, { useState, useEffect } from "react";
import { Grid, Divider } from "@material-ui/core/";
import { 
  Form,
  Button, 
} from "react-bootstrap";
import axios from 'axios';
import Rating from '@material-ui/lab/Rating';


function VipMenu(){
    const [dishes, setDishes] = useState([]);

    const url = '/menu';
    useEffect( () => {
      async function testing() {
        const test = await axios.get(url);
        setDishes(test.data);
        return test;
      }
      testing();
    }, [url]);

    
  return (
    <div className="App">

      {console.log(dishes)}

      <div className="page-title-container">
          <div className="page-title-text">VIP Menu</div>
          <div className="page-desc-text">Thanks for being a VIP member! Enjoy access to our special dishes</div>
          <div className="menu-icon-divider-container">
            <hr className="title-divider-left" />
            
            <hr className="title-divider-right" />
          </div>
        <div className="menu-searchbox-container">
          <Form inline>
            <Form.Control className="mr-sm-2" 
              type="text"
              value="TESTING"
              placeholder="Search" 
              onChange={null} 
            />
            <Button variant="outline-info">Search</Button>
          </Form>
        </div>
        </div>

      {dishes.map( dish => {
       if(dish.special)
       return(
        <Grid item key={dish.id}>

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
              <div className="dish-title-container">{dish.name}</div>
              <div className="rating-container">
                <Rating name="hover-feedback" value={dish.averageRating} precision={0.5}/>
              </div>
              {dish.description.length > 71 ? (
                <div className="dish-desc-container">
                  {dish.description.substring(0, 71) + " ..."}
                </div>
              ) : (
                <div className="dish-desc-container">
                  {dish.description}
                </div>
              )}
              <div className="price-add-btn-container">
                <div className="dish-price-container">
                  ${dish.price}
                </div>
               
              </div>
            </div>
          </Grid>
          
             )})}
    
    </div>  
  );
}

export default VipMenu;

    