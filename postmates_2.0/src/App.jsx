import React from 'react';
import {
  Nav,
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import Menu from './Components/Menu/Menu';
import Chefs from './Components/Chefs/Chefs';
import Signin from './Components/Signin/Signin';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export default class App extends React.Component{
  constructor(){
    super();

    this.state = {
      loggedInStatus: false,
    }
  }

  render() {
    return (
      <>
      <Router>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Link to="/">
            <Navbar.Brand >Postmates 2.0</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse >
            <Nav className="mr-auto">
              <Link to="/Menu">
                <Navbar.Text>Menu</Navbar.Text>
              </Link>
              <Link to="/Chefs">
                <Navbar.Text>Chefs</Navbar.Text>
              </Link>
              <Form inline>
                <FormControl className="mr-sm-2" type="text" placeholder="Search"/>
                <Button variant="outline-info">Search</Button>
              </Form>
            </Nav>
            <Nav>
              <Link to="/Signin">
                <Navbar.Text>
                  Sign-In
                </Navbar.Text>
              </Link>
              <NavDropdown
                title={<FontAwesomeIcon icon={faCartPlus} size="2x" />}
                id="collapsible-nav-dropdown"
                alignRight
              >
                <NavDropdown.Item>
                  My Cart
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          <Route exact path="/menu" component={Menu} />
          <Route exact path="/Chefs" component={Chefs} />
          <Route exact path="/Signin" component={Signin} />
        </Switch>
      </Router>
      </>
    )
  }
}
