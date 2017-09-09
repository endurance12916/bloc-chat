import React from 'react';
import './userNavbar.css'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import _ from 'lodash';

const UserNavbar = ({
  setActiveUser, 
  activeUser, 
  showSignInWindow, 
  logOutAction
}) => {
  const displaySignIn = () => {
    if (_.isEmpty(activeUser)) {
      return (
        <NavItem eventKey={1} onClick={() => showSignInWindow()} >Sign In</NavItem>
      )
    }
    else {
      return (
        <NavDropdown id={1} title={activeUser.username} >
          <MenuItem eventKey={1.1}>One button</MenuItem>
          <MenuItem eventKey={1.2}>Another button</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey={1.3} onClick={()=>logOutAction()} >Log Out</MenuItem>
        </NavDropdown>
      )
    }
  }
  return (
    <Navbar collapseOnSelect className="override">
      <Navbar.Header>
        <Navbar.Brand>
          <a href="/"><h4>React Chat</h4></a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          {displaySignIn()}
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

export default UserNavbar;