import React, {Component} from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { Button, Card, FormGroup, FormControl, FormLabel, Modal } from "react-bootstrap";
import Popup from "reactjs-popup";

class Accounts extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleOpenAcctShow = this.handleOpenAcctShow.bind(this);
    this.handleOpenAcctClose = this.handleOpenAcctClose.bind(this);
    this.handleCloseAcctShow = this.handleCloseAcctShow.bind(this);
    this.handleCloseAcctClose = this.handleCloseAcctClose.bind(this);

    this.handleErrorShow = this.handleErrorShow.bind(this);
    this.handleErrorClose = this.handleErrorClose.bind(this);

    this.state = {
      showOpenAccount : false,
      showCloseAccount : false,
      whichAccountToOpen : "",
      whichAccountToClose: "",
      openLabel : "",
      closeLabel : "",

      showError : false,
      errorPopUp : "",

      localAccounts : {
        1 : {
          id: this.props.context.checkingAccountNumber,
          type : "Checking Account",
          balance : this.props.context.balance,
          status: this.props.context.checkingStatus
        },

        2 : {
          id : this.props.context.savingsAccountNumber,
          type : "Savings Account",
          balance : this.props.context.savingsBalance,
          status: this.props.context.savingsStatus
        }
      }
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
  }


  _renderObject(){
		return Object.entries(this.state.localAccounts).map(([key, value], i) => {
      if (value.status === "Open") {
        return (
          <div key={key} style = {{ backgroundColor: '#007bff',  color: 'white'}}>
            <ExpansionPanel
            style = {{ backgroundColor: '#007bff',  color: 'white'}}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography  style = {{ backgroundColor: '#007bff',  color: 'white'}}>
                {value.type}
                 </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
               <Typography   style = {{backgroundColor: '#002bff', color: 'white'}}>
               <li>Account id: {value.id} </li>
                <li>
                   Balance: {value.balance}
                </li>
               </Typography>
             </ExpansionPanelDetails>
            </ExpansionPanel>
         </div>
        )
      }
		})
	}


  handleOpenAccount = async e => {
    e.preventDefault();

    let whichAccount = this.state.openLabel;

    if(whichAccount === ""){
      whichAccount = "Checking Account";
    }

    if(whichAccount === "Checking Account" && this.props.context.checkingStatus === "Open") {
      whichAccount = whichAccount + " is already open";
      this.setState({errorPopUp: whichAccount})
      this.handleOpenAcctClose();
      this.handleErrorShow();
      return;
    }
    else if(whichAccount === "Savings Account" && this.props.context.savingsStatus === "Open") {
       whichAccount = whichAccount + " is already open";
       this.setState({errorPopUp: whichAccount})
       this.handleOpenAcctClose();
       this.handleErrorShow();
       return;
    }

    //------------------Backend stuff here-------------------------------------------------//

    if(whichAccount === "Checking Account")
    {
	 console.log('opening Checking account for: ' + this.props.context.email.toLowerCase);
	 const response = await fetch('https://cs160bankingapp-api.herokuapp.com/api/openAccount', {
	 method: 'POST',
 	 mode: "cors",
 	 headers: {'Content-type': 'application/json',},
 	 body: JSON.stringify({ email: this.props.context.email.toLowerCase(), type : 'checking' }),
  	 });
	    
	 const responseText = response.text();
	    
	 this.props.context.updateCheckingStatus("Open");
    }
    else if(whichAccount === "Savings Account")
    {
	 console.log('opening Savings account for: ' + this.props.context.email.toLowerCase);
	 const response = await fetch('https://cs160bankingapp-api.herokuapp.com/api/openAccount', {
	 method: 'POST',
 	 mode: "cors",
 	 headers: {'Content-type': 'application/json',},
 	 body: JSON.stringify({ email: this.props.context.email.toLowerCase(), type : 'savings' }),
  	 });
	    
	 const responseText = response.text();
	    
	 this.props.context.updateSavingsStatus("Open");
    }

    this.handleOpenAcctClose();
  }

  handleCloseAccount = async e => {
    e.preventDefault();

    let whichAccount = this.state.closeLabel;

    if(whichAccount === ""){
      whichAccount = "Checking Account";
    }

    //
    // Account already closed do nothing
    //
    if(whichAccount === "Checking Account" && this.props.context.checkingStatus === "Closed") {
      whichAccount = whichAccount + " is already closed";
      this.setState({errorPopUp: whichAccount})
      this.handleCloseAcctClose();
      this.handleErrorShow();
      return;
    }
    else if(whichAccount === "Savings Account" && this.props.context.savingsStatus === "Closed") {
       whichAccount = whichAccount + " is already closed";
       this.setState({errorPopUp: whichAccount})
       this.handleCloseAcctClose();
       this.handleErrorShow();
       return;
    }

    //------------------Backend stuff-------------------------------------------------//


    if(whichAccount === "Checking Account")
    {
	 console.log('closing Checking account for: ' + this.props.context.email.toLowerCase);
	 const response = await fetch('https://cs160bankingapp-api.herokuapp.com/api/closeAccount', {
	 method: 'POST',
 	 mode: "cors",
 	 headers: {'Content-type': 'application/json',},
 	 body: JSON.stringify({ email: this.props.context.email.toLowerCase(), type : 'checking' }),
  	 });
	    
	 const responseText = response.text();
	    
	 this.props.context.updateCheckingStatus("Closed");
    }
    else if(whichAccount === "Savings Account")
    {
	 console.log('closing Savings account for: ' + this.props.context.email.toLowerCase);
	 const response = await fetch('https://cs160bankingapp-api.herokuapp.com/api/closeAccount', {
	 method: 'POST',
 	 mode: "cors",
 	 headers: {'Content-type': 'application/json',},
 	 body: JSON.stringify({ email: this.props.context.email.toLowerCase(), type : 'savings' }),
  	 });
	    
	 const responseText = response.text();
	    
	 this.props.context.updateSavingsStatus("Closed");
    }
    
    this.handleCloseAcctClose();
  }

  handleOpenAcctClose() {
    this.setState({showOpenAccount: false});
  }

  handleOpenAcctShow() {
    this.setState({showOpenAccount: true});
  }

  handleCloseAcctClose() {
    this.setState({showCloseAccount: false});
  }

  handleCloseAcctShow() {
    this.setState({showCloseAccount: true});
  }

  handleErrorShow() {
    this.setState({showError: true});
  }

  handleErrorClose() {
      this.setState({showError: false});
  }


  handleOpenLabelChange = event => {
    let index = event.nativeEvent.target.selectedIndex;
    let label = event.nativeEvent.target[index].text;
    this.setState({
      [event.target.id]: event.target.value,
      openLabel: label
    });
  }

  handleCloseLabelChange = event => {
    let index = event.nativeEvent.target.selectedIndex;
    let label = event.nativeEvent.target[index].text;
    this.setState({
      [event.target.id]: event.target.value,
      closeLabel: label
    });
  }

  render() {
    const { context } = this.props;
    return (
      <div>
      	{this._renderObject()}

        <div style = {{paddingTop: '10px'}}>
        <ul>
        <Button block size = "large" onClick={this.handleOpenAcctShow}>Open an account</Button>
        <Button block size = "large" onClick={this.handleCloseAcctShow}>Closing an account</Button>
        </ul>
        </div>

        <Modal style={{textAlign: 'center', paddingTop: '90px'}}show={this.state.showOpenAccount} onHide={this.handleOpenAcctClose}>
          <Modal.Header closeButton>
          <Card style = {{height: '10rem', width: '50rem', textAlign: 'center'}}>
            <Card.Body>
         <Card.Title>Opening an Account</Card.Title>
        <div className="Transfer" style = {{ maxWidth: '500px', textAlign: 'center', margin: '0 auto'}} >
          <form onSubmit={this.handleOpenAccount}>
            <label>
              <select className="internalTransfer" value={this.state.openLabel} name={this.state.whichAccountToOpen} onChange={this.handleOpenLabelChange}>
               <option value="Checking Account">Checking Account</option>
               <option value="Savings Account">Savings Account</option>
             </select>
           </label>
             <Button
               block
               size="large"
               type="submit"
               style= {{paddingTop: '10px'}}
             >
               Submit
             </Button>
           </form>
        </div>
        </Card.Body>
        </Card>
        </Modal.Header>
        </Modal>

        <Modal style={{textAlign: 'center', paddingTop: '90px'}}show={this.state.showCloseAccount} onHide={this.handleCloseAcctClose}>
          <Modal.Header closeButton>
          <Card style = {{height: '10rem', width: '50rem', textAlign: 'center'}}>
            <Card.Body>
         <Card.Title>Close an Account</Card.Title>
        <div className="Transfer" style = {{ maxWidth: '500px', textAlign: 'center', margin: '0 auto'}} >
          <form onSubmit={this.handleCloseAccount}>
            <label>
              <select className="internalTransfer" value = {this.state.closeLabel} name={this.state.whichAccountToClose} onChange={this.handleCloseLabelChange}>
               <option value="Checking Account">Checking Account</option>
               <option value="Savings Account">Savings Account</option>
             </select>
           </label>
             <Button
               block
               size="large"
               type="submit"
               style= {{paddingTop: '10px'}}
             >
               Submit
             </Button>
           </form>
        </div>
        </Card.Body>
        </Card>
        </Modal.Header>
        </Modal>

        <Modal style={{textAlign: 'center', paddingTop: '90px'}}show={this.state.showError} onHide={this.handleErrorClose}>
          <Modal.Header closeButton>
          <Card style = {{height: '10rem', width: '50rem', textAlign: 'center'}}>
            <Card.Body>
         <Card.Title>ERROR</Card.Title>
        <div className="Transfer" style = {{ maxWidth: '500px', textAlign: 'center', margin: '0 auto'}} >
          <form onSubmit={this.handleErrorClose}>
            {this.state.errorPopUp}
             <Button
               block
               size="large"
               type="submit"
               style= {{paddingTop: '10px'}}
             >
               Ok
             </Button>
           </form>
        </div>
        </Card.Body>
        </Card>
        </Modal.Header>
        </Modal>
      </div>
    );
  }
}

export default Accounts;
