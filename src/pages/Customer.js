import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import UserWarnings from "../components/UserWarningCount";
import api from "axios";
import { Grid, Divider } from "@material-ui/core/";
import { Form, Button } from "react-bootstrap";
import Rating from "@material-ui/lab/Rating";

const Customer = () => {
  const user = useSelector(({ user }) => user);
  const [data,setData] = useState([])
  const url = "/rating/dishrating/" + user.id;

  const loadData = async () =>{
    try{
      const ratingList = await api.get(url)
      if (ratingList.data.length != 0){
        setData(ratingList.data.sort((a, b) => b.rating - a.rating));
      }
      
    } catch (error) {console.log(error)}
  }


  useEffect( () => {
    loadData();
  }, []);

  const showStatus = (
    <div>
      Status:
      {user.role === "VIP" ? <>***VIP***</> : <>***Regular Customer***</>}
    </div>
  );

  return (
   
    <div>
        <div>
          {console.log(data)}
          {showStatus}
          More customer stuff
          <UserWarnings />
        </div>
        {data.length != 0  ? ( 
        <div>
            <h1 align = "center">These are the top 3 dishes that you have Highly rated!</h1>
              <div className="menu-items-container">
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  spacing={2}
                >
                  {data.slice(0, 3).map((el) => (
                    
                    <Grid item key={el.dish.id}>
                      <div className="item-container">
                        <div className="dish-img-container">
                          <img
                            onError={(event) => {
                              event.target.src =
                                "/Online-Restaurant-System-Frontend/favicon.ico";
                            }}
                            src= {el.dish.imageUrl}
                            width="298"
                            height="200"
                            alt="dish"
                          />
                        </div>
                        <Divider />
                        
                  
                        {el.dish.special ? ( 
                        <div className="dish-title-container">{el.dish.name}<button className="special-btn"> VIP </button></div>
                        ):( 
                        <div className="dish-title-container">{el.dish.name} </div>)}
                        <div className="rating-container">
                          <Rating
                            name="hover-feedback"
                            value={el.rating}
                            precision={0.5}
                          />
                        </div>
                        {el.dish.description.length > 71 ? (
                          <div className="dish-desc-container">
                            {el.dish.description.substring(0, 71) + " ..."}
                          </div>
                        ) : (
                          <div className="dish-desc-container">
                            {el.dish.description}
                          </div>
                        )}
                        <div className="price-add-btn-container">
                          <div align = "center" className="dish-price-container">
                            ${el.dish.price}
                          </div>
                        </div>
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </div>
              
         </div>
      ) :( 
        <div> <h3 align = "center">You do not have your Top 3 rated dishes yet... Order something and rate it for your top 3 to appear here! </h3> </div>
        )}
    </div> 
  );
};

export default Customer;
