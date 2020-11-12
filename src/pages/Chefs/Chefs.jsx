import React from 'react';
import { Grid, Divider } from "@material-ui/core/";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";

import "./Chefs.css";

export default class Chefs extends React.Component{
  constructor() {
    super();

    this.state = {
      data: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    //**MAKE API CALL TO BACKEND HERE TO RETRIEVE CHEFS DATA**//
    this.setState({
      isLoading: false,
      data: [
        {
          chefId: 1,
          chefName: "Gordan Ramsay",
          dishDescription: "Young chef specializes in making sweet donuts",
        },
        {
          chefId: 2,
          chefName: "Guy Fieri",
          dishDescription: "Young chef specializes in making sweet donuts",
        },
        {
          chefId: 3,
          chefName: "Wolfgang Puck",
          dishDescription: "Young chef specializes in making sweet donuts",
        },
      ],
    });
  }

    render() {
      const { data, isLoading } = this.state;
      return (
        <> 
          <div className="page-title-container">
            <div className="page-title-text">Our Chefs</div>
            <div className="menu-icon-divider-container">
              <hr className="title-divider-left" />
              <FontAwesomeIcon icon={faUtensils} size="2x" color="gray" />
              <hr className="title-divider-right" />
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
                {data.map((el) => (
                  <Grid item key={el.chefId}>
                    <div className="chef-items-container">
                      <div className="chef-img-container">
                        <img
                          onError={(event) => {
                            event.target.src = "/Online-Restaurant-System-Frontend/favicon.ico";
                          }}
                          src="/Online-Restaurant-System-Frontend/chef-img-default.jpeg"
                          width="298"
                          height="200"
                          alt="dish"
                        />
                      </div>
                    </div>
                  </Grid>
                ))}
              </Grid>
            </div>
          ) : (
            <h3>Unable to Load Menu Data</h3>
          )}
        </>
      );
    }
}