import React from 'react';
import {Button} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import AwesomeSlider from 'react-awesome-slider';
import { useState, useEffect } from "react";
import axios from "axios";
//import AwsSliderStyles from 'react-awesome-slider/src/styles.scss';

 import home from './Home.scss';




function Home(){
  const [data,setData] = useState([]);


  // const slider = () => (
  //   <AwesomeSlider cssModule = {home} >
  //     <div data-src="/Online-Restaurant-System-Frontend/homepage-img.png" />
  //     <div data-src="/Online-Restaurant-System-Frontend/menu-item-img-default.jpg" />
  //     <div data-src = "/Online-Restaurant-System-Frontend/homepage-img.png" />
  //   </AwesomeSlider>
  
  // );
  

  const loadData = async () => {
    try{
       axios.get("menu").then((element) => {
       console.log(element.data);
 
       element.data.sort((a, b) => b.averageRating - a.averageRating);
       console.log("Sorted data", element.data);
 
       let newData = element.data.map((element) => ({
         dishId: element.id,
         dishRating: element.averageRating,
         dishTitle: element.name,
         dishDescription: element.description,
         dishPrice: element.price,
         isSpecial: element.special,
         dishImage : element.imageUrl,
         //keywords: ["Spicy","Dessert"]
         keywords: element.keyWord.map((word) => word.keyWord.toLowerCase()),
       }))

       setData(prev =>[...prev,...newData]);
     });
   }catch(error){console.log(error)}
  }

  useEffect(() => {
        
    loadData();
  
}, []);



    
      return (
        <> 
        {console.log(data[0])}
            <AwesomeSlider cssModule = {home} >
              {data.slice(0,3).map((el) => (
                <div data-src= {el.dishImage} >
                  <div className="welcome-text-container" style={{position:"absolute",padding:"10px",width:"100%",background:"rgba(204, 204, 204, 0.6)",color:"black",textAlign:"center",top:"15%",left:"left: 50%;",transform:"translate(-50%, -50%)",textTransform:"uppercase",fontFamily:"Tahoma, Geneva, sans-serif",fontWeight:"600"}}>	
                  <div className="welcome-text-upper" style={{marginBottom:"5px",fontSize:"25px"}}>	
                    Welcome to Our Restaurant	
                  </div>	
                  <div className="welcome-text-lower" style={{marginBottom:"5px",fontSize:"15px"}}>	
                    Warm Baked Sweets	
                  </div>	
                  <div className="welcome-button" style={{marginBottom:"5px"}}>	
                    <Link to="/Menu">	
                      <Button variant="outline-dark">Check Out Our Menu</Button>	
                    </Link>	
                  </div>	
                </div>
                </div>

                ))
              }
              
            </AwesomeSlider>
        </>
      );
}

export default Home
