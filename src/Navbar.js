import React, { Component } from 'react';
import './Navbar.css'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

class TopNavbar extends Component {
  render() {
    return (
      <Navbar collapseOnSelect className="override">
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/"><h4>React - Bloc Chat</h4></a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem eventKey={1} onClick={() => this.props.openSignIn()} >Sign In</NavItem>
            <NavDropdown eventKey={3} title="About" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>One button</MenuItem>
              <MenuItem eventKey={3.2}>Another button</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Separated link</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default TopNavbar;