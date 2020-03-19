import React, { Component } from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import TodayIcon from '@material-ui/icons/Today';
import AssessmentIcon from '@material-ui/icons/Assessment';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import {Navbar, Modal, Button} from 'react-bootstrap';

class ListItems extends Component {

  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);

    this.state = {
      show: false,
    };
  }

  mainListItems() {
    return (
    <div>
      <ListItem
      button
      onClick = {() => this.props.context.updateDashboardDisplay(
        this.props.context.DEFAULT_DISPLAY)
      }
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem
        button
        onClick = {() => this.props.context.updateDashboardDisplay(
          this.props.context.ACCOUNTS_DISPLAY)
        }
      >
        <ListItemIcon>
          <AccountBoxIcon />
        </ListItemIcon>
        <ListItemText primary="Accounts" />
      </ListItem>
      <ListItem
      button
      onClick = {() => this.props.context.updateDashboardDisplay(
        this.props.context.MAKE_TRANSACTIONS_DISPLAY)
      }
      >
        <ListItemIcon>
          <CompareArrowsIcon />
        </ListItemIcon>
        <ListItemText primary="Make Transactions" />
      </ListItem>
      <ListItem
      button
      onClick = {() => this.props.context.updateDashboardDisplay(
          this.props.context.SETUP_BILL_AUTO_PAYMENTS_DISPLAY)
        }
      >
        <ListItemIcon>
          <AttachMoneyIcon />
        </ListItemIcon>
        <ListItemText primary="Set up Bill Autopayments" />
      </ListItem>
    </div>
  );
  }

  secondaryListItems() {
  return (
    <div>
      <ListSubheader inset>Assorted things</ListSubheader>

      <ListItem
        button
        onClick = {() => this.handleShow()}
        href = "/"
        >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Sign Out" />
      </ListItem>

      <Modal style={{textAlign: 'center', paddingTop: '100px'}}show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to Sign out?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="primary" onClick={() => this.handleSignOut()}>
            Yes
          </Button>
          <Button variant="primary" onClick={() => this.handleClose()}>
            No
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
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
  window.location = '/'

}


  render() {
    return (
      <div>
      <List>{this.mainListItems()}</List>
      <Divider />
      <List>{this.secondaryListItems()}</List>
      </div>
    );
  }
}

export default ListItems
