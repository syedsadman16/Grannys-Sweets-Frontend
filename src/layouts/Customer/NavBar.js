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
import { faCartPlus, faBriefcase, faCookieBite } from "@fortawesome/free-solid-svg-icons";

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
      <Link to="/" className="header-link">
        <FontAwesomeIcon icon={faCookieBite} size="2x" color="white" />
      </Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse>
        <Nav className="mr-auto">
          <Link to="/menu" className="header-link">
            <Navbar.Text>Menu</Navbar.Text>
          </Link>
          <Link to="/chefs" className="header-link">
            <Navbar.Text>Chefs</Navbar.Text>
          </Link>
        </Nav>
        <Nav>
          {isEmpty(user) && (
            <Link to="/signin">
              <Navbar.Text>Sign-In</Navbar.Text>
            </Link>
          )}
          {!isEmpty(user) && (
            <Navbar.Text onClick={handleLogout} className="btn">
              Logout
            </Navbar.Text>
          )}
          {!isEmpty(user) && user.role === "CUSTOMER" && (
            <NavDropdown
              title={<FontAwesomeIcon icon={faCartPlus} size="2x" />}
              id="collapsible-nav-dropdown"
              alignRight
            >
              <NavDropdown.Item>My Cart</NavDropdown.Item>
            </NavDropdown>
          )}
          {!isEmpty(user) && user.role !== "CUSTOMER" && (
            <Link to="/employee" className="d-flex  align-items-center">
              <FontAwesomeIcon icon={faBriefcase} size="2x" />
            </Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
