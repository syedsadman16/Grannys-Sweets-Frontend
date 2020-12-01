import React from 'react';
import {Button} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import AwesomeSlider from 'react-awesome-slider';
//import AwsSliderStyles from 'react-awesome-slider/src/styles.scss';

 import Home from './Home.scss';
const slider = (
  <AwesomeSlider cssModule = {Home} >
    <div data-src="/Online-Restaurant-System-Frontend/homepage-img.png" />
    <div data-src="/Online-Restaurant-System-Frontend/menu-item-img-default.jpg" />
    <div data-src = "/Online-Restaurant-System-Frontend/homepage-img.png" />
  </AwesomeSlider>

);


const  home = () => {

    
      return (
        <>
          {slider}
          <h1>Menu</h1>
        </>
      );
}

export default home
