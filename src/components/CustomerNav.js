import React from "react";
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
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Link to="/">
        <Navbar.Brand>Postmates 2.0</Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse>
        <Nav className="mr-auto">
          <Link to="/Menu">
            <Navbar.Text>Menu</Navbar.Text>
          </Link>
          <Link to="/Chefs">
            <Navbar.Text>Chefs</Navbar.Text>
          </Link>
          <Form inline>
            <FormControl className="mr-sm-2" type="text" placeholder="Search" />
            <Button variant="outline-info">Search</Button>
          </Form>
        </Nav>
        <Nav>
          <Link to="/Signin">
            <Navbar.Text>Sign-In</Navbar.Text>
          </Link>
          <NavDropdown
            title={<FontAwesomeIcon icon={faCartPlus} size="2x" />}
            id="collapsible-nav-dropdown"
            alignRight
          >
            <NavDropdown.Item>My Cart</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
