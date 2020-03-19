import React, { Component } from "react";
import {Navbar, Nav, NavDropdown, Modal, Button} from 'react-bootstrap';
import "./MainNavbar.css"

class MainNavbar extends Component {

  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);

    this.state = {
      show: false,
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleSignOut() {
    this.props.context.updateIsSignedIn("false");
    this.handleClose();
    window.location = '/';
  }

  helloCustomer () {
    return "Hi " + this.props.context.first_name;
  }

  loggedIn() {
    if(this.props.context.isSignedIn === "false" || this.props.context.isSignedIn === null || this.props.context.isSignedIn === undefined) {
      return <Nav.Link href="/signin">Sign In</Nav.Link>;
    }
    else {
      return (
        <NavDropdown title={this.helloCustomer()} id="collasible-nav-dropdown">
          <NavDropdown.Item href="/accountdashboard">Your Account Dashboard</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={this.handleShow}>Sign Out</NavDropdown.Item>
        </NavDropdown>
      );
    }
  }

  render()  {
    return (
    <>
      <Navbar collapseOnSelect expand="xl" bg="primary" variant="dark">
        <Navbar.Brand href="/">BigBank</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title="Open an Account" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/customercreation">Customer Account</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            {this.loggedIn()}
            <Nav.Link href="/atmlocator">Atm Locator</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Modal style={{textAlign: 'center'}}show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to Sign out?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="primary" onClick={this.handleSignOut}>
            Yes
          </Button>
          <Button variant="primary" onClick={this.handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
      </>
    );
  }
}

export default MainNavbar;
