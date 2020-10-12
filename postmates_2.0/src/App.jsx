import React from 'react';
import {
  Nav,
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap';

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
      <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
        <Navbar.Brand>WatchParty</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Form inline onSubmit={(event) => { event.preventDefault(); }}>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-info">Search</Button>
            </Form>
          </Nav>
          <Nav>
          </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    )
  }
}
