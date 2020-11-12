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
          chefDescription: "Multi-Michelin starred chef and star of Hell's Kitchen",
        },
        {
          chefId: 2,
          chefName: "Guy Fieri",
          chefDescription: "An American restaurateur, author, and an Emmy Award winning television presenter",
        },
        {
          chefId: 3,
          chefName: "Wolfgang Puck",
          chefDescription: "Wolfgang Johannes Puck is an Austrian-American chef, restaurateur, and actor",
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
                          src="/Online-Restaurant-System-Frontend/chef-img-default.jpg"
                          width="298"
                          height="230"
                          alt="chef"
                        />
                      </div>
                      <Divider />
                      <div className="chef-title-container">
                        {el.chefName}
                      </div>
                      {el.chefDescription.length > 71 ? (
                      <div className="chef-desc-container">
                        {el.chefDescription.substring(0, 71) + " ..."}
                      </div>
                    ) : (
                      <div className="chef-desc-container">
                        {el.chefDescription}
                      </div>
                    )}
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