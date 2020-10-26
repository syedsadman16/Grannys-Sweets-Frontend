import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { isEmpty } from "lodash";
import { logout } from "../redux/actions/user";

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
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(({ user }) => user);

  const handleLogout = async () => {
    dispatch(logout(history));
    history.go(0);
  };

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
          {isEmpty(user) ? (
            <>
              <Link to="/signin">
                <Navbar.Text>Sign-In</Navbar.Text>
              </Link>
            </>
          ) : (
            <>
              <Navbar.Text onClick={handleLogout} className="btn">
                Logout
              </Navbar.Text>
              <NavDropdown
                title={<FontAwesomeIcon icon={faCartPlus} size="2x" />}
                id="collapsible-nav-dropdown"
                alignRight
              >
                <NavDropdown.Item>My Cart</NavDropdown.Item>
              </NavDropdown>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
