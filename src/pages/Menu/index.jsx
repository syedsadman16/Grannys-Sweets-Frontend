import React from "react";
import { Grid, Divider } from "@material-ui/core/";
import MenuItemModal from "./MenuItemModal";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Rating from "@material-ui/lab/Rating";
import "./Menu.css";

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      topThree: [],
      isLoading: true,
      searchText: "",
      modalShow: false,
      modalData: {
        dishId: 1,
        dishTitle: "Cup Cake",
        dishImage: "",
        dishRating: "0",
        dishDescription: "Some sort of description for a dish",
        dishPrice: "5.99",
        keywords: ["sweet", "cake", "cup"],
      },
      orderItemQuantity: null,
      orderItemId: null,
    };
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  handleModalClose() {
    this.setState({ modalShow: false });
  }

  handleSearchTextChange(event) {
    this.setState({ searchText: event.target.value });
  }

  componentDidMount() {
    //**MAKE API CALL TO BACKEND HERE**//
    axios.get("menu").then((element) => {
      element.data.sort((a, b) => b.averageRating - a.averageRating);
      console.log("Sorted data", element.data);

      let newData = element.data.map((element) => ({
        dishId: element.id,
        dishRating: element.averageRating,
        dishTitle: element.name,
        dishDescription: element.description,
        dishPrice: element.price,
        isSpecial: element.special,
        dishImage: element.imageUrl,
        //keywords: ["Spicy","Dessert"]
        keywords: element.keyWord.map((word) => word.keyWord.toLowerCase()),
      }));
      this.setState({
        data: [...this.state.data, ...newData],
        isLoading: false,
      });
    });

    axios.get("menu/mostOrdered").then((element) => {
      console.log(element.data);

      let newData = element.data.map((element) => ({
        dishId: element.id,
        dishRating: element.averageRating,
        dishTitle: element.name,
        dishDescription: element.description,
        dishPrice: element.price,
        isSpecial: element.special,
        dishImage: element.imageUrl,
        //keywords: ["Spicy","Dessert"]
        keywords: element.keyWord.map((word) => word.keyWord.toLowerCase()),
      }));
      this.setState({
        topThree: [...this.state.topThree, ...newData],
        isLoading: false,
      });
    });
  }

  render() {
    const {
      data,
      topThree,
      isLoading,
      searchText,
      modalShow,
      modalData,
      orderItemId,
    } = this.state;
    console.log(this.state);
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
              <Form.Control
                className="mr-sm-2"
                type="text"
                value={searchText}
                placeholder="Search"
                onChange={this.handleSearchTextChange}
              />
              <Button variant="outline-info">Search</Button>
            </Form>
          </div>
        </div>

        <div className="section-divider-container">
          <hr className="section-divider-left" />
          Top Rated
          <hr className="section-divider-right" />
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
              {this.state.data.slice(0, 3).map((el) => (
                <Grid item key={el.dishId}>
                  <div className="item-container">
                    <div className="dish-img-container">
                      <img
                        onError={(event) => {
                          event.target.src =
                            "/Online-Restaurant-System-Frontend/favicon.ico";
                        }}
                        src={el.dishImage}
                        width="298"
                        height="200"
                        alt="dish"
                      />
                    </div>
                    <Divider />

                    {el.isSpecial ? (
                      <div className="dish-title-container">
                        {el.dishTitle}
                        <button className="special-btn"> VIP </button>
                      </div>
                    ) : (
                      <div className="dish-title-container">
                        {el.dishTitle}{" "}
                      </div>
                    )}

                    <div className="rating-container">
                      <Rating
                        name="hover-feedback"
                        value={el.dishRating}
                        precision={0.5}
                        readOnly
                      />
                    </div>
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
                        {this.props.user.role != "VIP" && el.isSpecial ? (
                          <Button>VIP Only</Button>
                        ) : (
                          <Button
                            variant="success"
                            onClick={() => {
                              this.setState({
                                modalShow: true,
                                modalData: el,
                                orderItemId: el.dishId,
                              });
                            }}
                          >
                            Order
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
            {modalShow && (
              <MenuItemModal
                show={modalShow}
                onHide={this.handleModalClose}
                modalData={modalData}
                {...this.props}
              />
            )}
          </div>
        ) : (
          <h3>Could not load top rated dishes</h3>
        )}

        <div className="section-divider-container">
          <hr className="section-divider-left" />
          Most Ordered
          <hr className="section-divider-right" />
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
              {this.state.topThree.map((el) => (
                <Grid item key={el.dishId}>
                  <div className="item-container">
                    <div className="dish-img-container">
                      <img
                        onError={(event) => {
                          event.target.src =
                            "/Online-Restaurant-System-Frontend/favicon.ico";
                        }}
                        src={el.dishImage}
                        width="298"
                        height="200"
                        alt="dish"
                      />
                    </div>
                    <Divider />

                    {el.isSpecial ? (
                      <div className="dish-title-container">
                        {el.dishTitle}
                        <button className="special-btn"> VIP </button>
                      </div>
                    ) : (
                      <div className="dish-title-container">
                        {el.dishTitle}{" "}
                      </div>
                    )}

                    <div className="rating-container">
                      <Rating
                        name="hover-feedback"
                        value={el.dishRating}
                        precision={0.5}
                        readOnly
                      />
                    </div>
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
                        {this.props.user.role != "VIP" && el.isSpecial ? (
                          <Button>VIP Only</Button>
                        ) : (
                          <Button
                            variant="success"
                            onClick={() => {
                              this.setState({
                                modalShow: true,
                                modalData: el,
                                orderItemId: el.dishId,
                              });
                            }}
                          >
                            Order
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
            {modalShow && (
              <MenuItemModal
                show={modalShow}
                onHide={this.handleModalClose}
                modalData={modalData}
                {...this.props}
              />
            )}
          </div>
        ) : (
          <h3>Could not load top rated dishes</h3>
        )}

        <div className="section-divider-container">
          <hr className="section-divider-left" />
          All
          <hr className="section-divider-right" />
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
              {data
                .filter((p) =>
                  p.keywords.some((s) => {
                    if (searchText === "") return s;
                    else if (s.indexOf(searchText.toLowerCase()) !== -1) {
                      return s;
                    }
                  })
                )
                .map((el) => (
                  <Grid item key={el.dishId}>
                    <div className="item-container">
                      <div className="dish-img-container">
                        <img
                          onError={(event) => {
                            event.target.src =
                              "/Online-Restaurant-System-Frontend/favicon.ico";
                          }}
                          src={el.dishImage}
                          width="298"
                          height="200"
                          alt="dish"
                        />
                      </div>
                      <Divider />

                      {el.isSpecial ? (
                        <div className="dish-title-container">
                          {el.dishTitle}
                          <button className="special-btn"> VIP </button>
                        </div>
                      ) : (
                        <div className="dish-title-container">
                          {el.dishTitle}{" "}
                        </div>
                      )}

                      <div className="rating-container">
                        <Rating
                          name="hover-feedback"
                          value={el.dishRating}
                          precision={0.5}
                          readOnly
                        />
                      </div>
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
                          {this.props.user.role != "VIP" && el.isSpecial ? (
                            <Button>VIP Only</Button>
                          ) : (
                            <Button
                              variant="success"
                              onClick={() => {
                                this.setState({
                                  modalShow: true,
                                  modalData: el,
                                  orderItemId: el.dishId,
                                });
                              }}
                            >
                              Order
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </Grid>
                ))}
            </Grid>
            {modalShow && (
              <MenuItemModal
                show={modalShow}
                onHide={this.handleModalClose}
                modalData={modalData}
                {...this.props}
              />
            )}
          </div>
        ) : (
          <h3>Unable to Load Menu Data</h3>
        )}
      </>
    );
  }
}
