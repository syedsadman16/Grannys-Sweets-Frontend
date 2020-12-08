import React, { useState, useEffect } from "react";
import { Grid, Divider } from "@material-ui/core/";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Rating from "@material-ui/lab/Rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import MenuItemModal from "./Menu/MenuItemModal";
import "./Menu/Menu.css";

function VipMenu() {
  //   const defaultModalData = {
  //     dishId: 1,
  //     dishTitle: "Cup Cake",
  //     dishDescription: "Some sort of description for a dish",
  //     dishPrice: "5.99",
  //     keywords: ["sweet", "cake", "cup"]
  //   }

  //   const [dishes, setDishes] = useState([]);
  //   const [modalState, setModalState] = useState(false);
  //   const [modalData, setModalData] = useState([defaultModalData]);
  //   const [quantity, setQuantity] = useState(0);

  //   const url = '/menu';
  //   useEffect( () => {
  //     async function testing() {
  //       const test = await axios.get(url);
  //       setDishes(test.data);
  //       return test;
  //     }
  //     testing();
  //   }, [url]);

  // function handleModalOrder(quantity) {
  //   setQuantity( parseInt(quantity));
  //   setModalState(false);
  // }

  const imgMyimageexample = require("./vip-confetti.webp");
  const style = {
    width: "100%",
    height: "875px",
    color: "white",
    backgroundImage: `url(${imgMyimageexample})`,
    backgroundSize: "cover",
  };

  return (
    // <div className="App">

    <div style={style} className="page-title-container-vip">
      <div className="page-title-text">Congratulations!</div>
      <div className="page-desc-text">
        Thanks for being a VIP member! Enjoy access to our special dishes
      </div>
    </div>

    //   <Grid
    //     container
    //     direction="row"
    //     justify="center"
    //     alignItems="center"
    //     spacing={2}
    //   >

    //   {dishes.map( dish => {
    //    if(dish.special)
    //    return(

    //     <Grid item key={dish.id}>

    //         <div className="item-container">
    //           <div className="dish-img-container">
    //             <img
    //               onError={(event) => {
    //                 event.target.src = "/Online-Restaurant-System-Frontend/favicon.ico";
    //               }}
    //               src="/Online-Restaurant-System-Frontend/menu-item-img-default.jpg"
    //               width="298"
    //               height="200"
    //               alt="dish"
    //             />
    //           </div>
    //           <Divider />
    //           <div className="dish-title-container">{dish.name}</div>
    //           <div className="rating-container">
    //             <Rating name="hover-feedback" value={dish.averageRating} precision={0.5}/>
    //           </div>
    //           {dish.description.length > 71 ? (
    //             <div className="dish-desc-container">
    //               {dish.description.substring(0, 71) + " ..."}
    //             </div>
    //           ) : (
    //             <div className="dish-desc-container">
    //               {dish.description}
    //             </div>
    //           )}
    //           <div className="price-add-btn-container">
    //             <div className="dish-price-container">
    //               ${dish.price}
    //             </div>
    //             <div className="add-cart-btn">
    //               <Button variant="success" onClick={() => {setModalState(true); setModalData(dish);}}>Order</Button>
    //             </div>
    //           </div>
    //         </div>

    //       </Grid>
    //          )})}

    //   </Grid>

    //   {/*<div> <MenuItemModal show={modalState} handleOrder={quantity} onHide={setModalState(false)} modalData={modalData} />  </div>*/}

    // </div>
  );
}

export default VipMenu;
