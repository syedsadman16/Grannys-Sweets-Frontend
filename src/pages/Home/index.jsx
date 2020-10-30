import React from 'react';
import {Button} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';

import './Home.css';

export default class Home extends React.Component{

    render() {
      return (
        <>
        <div className="img-section-container">
          <img className="img1"
            onError={(event) => { event.target.src = "/favicon.png"; }}
            src="/homepage-img.png"
            width="100%"
            height="500"
            alt="dish"
          />
          <div className="welcome-text-container">
            <div className="welcome-text-upper">
              Welcome to Our Restaurant!
            </div>
            <div className="welcome-text-lower">
              Warm Baked Sweets
            </div>
            <div className="welcome-button">
              <Link to="/Menu">
                <Button variant="outline-dark">Check Out Our Menu</Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="about-us-title">
          About Us
        </div>
        <div className="menu-icon-divider-container">
          <hr className="title-divider-left"/>
          <FontAwesomeIcon icon={faUtensils} size="2x" color="gray" />
          <hr className="title-divider-right"/>
        </div>
        <div className="about-us-text-box">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit 
          esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt 
          in culpa qui officia deserunt mollit anim id est laborum.
        </div>
        </>
      );
    }
}