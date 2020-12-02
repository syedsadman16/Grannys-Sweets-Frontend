import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { isEmpty } from "lodash";
import { logout } from "../../redux/actions/user";

import {
  Nav,
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faBriefcase,
  faCookieBite,
} from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(({ user }) => user);

  const handleLogout = async () => {
    dispatch(logout(history));
    history.go(0);
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Link to="/" className="header-icon">
        <FontAwesomeIcon icon={faCookieBite} size="2x" color="white" />
      </Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse>
        <Nav className="mr-auto">
          <Link to="/menu">
            <Navbar.Text>Menu</Navbar.Text>
          </Link>
          <Link to="/chefs">
            <Navbar.Text>Chefs</Navbar.Text>
          </Link>
          <Link to="/discussions">
            <Navbar.Text>Discussions</Navbar.Text>
          </Link>
          {!isEmpty(user) && user.role == "VIP" && (
          <Link to="/vipMenu">
            <Navbar.Text>VIP</Navbar.Text>
          </Link>
          )}
        </Nav>
        {isEmpty(user) && (
          <Link to="/signin">
            <Navbar.Text>Sign-In</Navbar.Text>
          </Link>
        )}
        {!isEmpty(user) && (
          <Navbar.Text onClick={handleLogout} className="nav-logout-text">
            Logout
          </Navbar.Text>
        )}
        {!isEmpty(user) && (user.role === "CUSTOMER" || user.role === "VIP") && (
          <NavDropdown
            title={
              <FontAwesomeIcon icon={faCartPlus} size="2x" color="white" />
            }
            id="collapsible-nav-dropdown"
            color="white"
            alignRight
          >
            <NavDropdown.Item>My Cart</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/customer">
              Account
            </NavDropdown.Item>
          </NavDropdown>
        )}
        {!isEmpty(user) && !["CUSTOMER", "VIP"].includes(user.role) && (
          <NavDropdown
            title={
              <FontAwesomeIcon icon={faBriefcase} size="2x" color="white" />
            }
            id="collapsible-nav-dropdown"
            color="white"
            alignRight
          >
            <NavDropdown.Item as={Link} to="/employee">
              Account
            </NavDropdown.Item>
          </NavDropdown>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
