import React, {Component} from 'react';
import {Button, Card, FormGroup, FormControl, FormLabel, Modal, ButtonGroup} from "react-bootstrap";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class ManagerDashboard extends Component {

  constructor(props, context) {
    super(props, context);

    this.sortFirstName = this.sortFirstName.bind(this);
    this.sortLastName = this.sortLastName.bind(this);
    this.sortEmail = this.sortEmail.bind(this);
    this.sortAccount = this.sortAccount.bind(this);
    this.sortStatus = this.sortStatus.bind(this);
    this.sortBalance = this.sortBalance.bind(this);
    this.sortType = this.sortType.bind(this);
    this.sortZipCode = this.sortZipCode.bind(this);

    this.sortTransId = this.sortTransId.bind(this);
    this.sortTransEmail = this.sortTransEmail.bind(this);
    this.sortTransDate = this.sortTransDate.bind(this);
    this.sortTransAmount = this.sortTransAmount.bind(this);
    this.sortTransBalance = this.sortTransBalance.bind(this);
    this.sortTransFirstName = this.sortTransFirstName.bind(this);
    this.sortTransLastName = this.sortTransLastName.bind(this);

    this.handleReportShow = this.handleReportShow.bind(this);
    this.handleReportClose = this.handleReportClose.bind(this);

    this.handleGenReportShow = this.handleGenReportShow.bind(this);
    this.handleGenReportClose = this.handleGenReportClose.bind(this);

    this.handleErrorShow = this.handleErrorShow.bind(this);
    this.handleErrorClose = this.handleErrorClose.bind(this);

    this.state = {

      showReport : false,
      showGenReport : false,
      emailName : "",
      localUserAccounts : this.props.context.allUserAccounts,
      localUserTransactions : this.props.context.allUserTransactions,
      sortAttribute : "",
      sortTransAttribute : "",

      accountReport : [],
      transactionReport : [],

      showError : false,
      errorPopUp : "",
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


  handleGenReportShow() {
    this.setState({showGenReport: true});
  }

  handleGenReportClose() {
    this.setState({showGenReport: false});
  }

  handleReportShow() {
    this.setState({showReport: true});
  }

  handleReportClose() {
      this.setState({showReport: false});
  }

  handleErrorShow() {
    this.setState({showError: true});
  }

  handleErrorClose() {
      this.setState({showError: false});
  }



  tableDisplay() {
    let myData = this.state.localUserAccounts;
    myData.sort((a, b) => (a.first_name > b.first_name) ? 1 : -1);

    if(this.state.sortAttribute ==="first_name") {
      myData.sort((a, b) => (a.first_name > b.first_name) ? 1 : -1);
    }
    else if(this.state.sortAttribute ==="last_name") {
      myData.sort((a, b) => (a.last_name > b.last_name) ? 1 : -1);
    }
    else if(this.state.sortAttribute ==="email") {
      myData.sort((a, b) => (a.email > b.email) ? 1 : -1);
    }
    else if(this.state.sortAttribute ==="status") {
      myData.sort((a, b) => (a.status > b.status) ? 1 : -1);
    }
    else if(this.state.sortAttribute ==="account") {
      myData.sort((a, b) => (a.account > b.account) ? 1 : -1);
    }
    else if(this.state.sortAttribute ==="balance") {
      myData.sort((a, b) => (a.balance > b.balance) ? 1 : -1);
    }
    else if(this.state.sortAttribute ==="type") {
      myData.sort((a, b) => (a.type > b.type) ? 1 : -1);
    }
    else if(this.state.sortAttribute ==="zipcode") {
      myData.sort((a, b) => (a.zipcode > b.zipcode) ? 1 : -1);
    }

    return (
      <Paper style = {{width: '100%', overflowX: 'auto',}}>
        <Table style = {{minWidth: 700,}}>
          <TableHead>
            <TableRow>
              <TableCell>first_name</TableCell>
              <TableCell align="right">last_name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Account #</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Balance</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Zip Code</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {myData.map(n => (
              <TableRow key={n.account_number}>
                <TableCell component="th" scope="row">
                  {n.first_name}
                </TableCell>
                <TableCell align="right">{n.last_name}</TableCell>
                <TableCell align="right">{n.account_number}</TableCell>
                <TableCell align="right">{n.email}</TableCell>
                <TableCell align="right">{n.status}</TableCell>
                <TableCell align="right">{n.balance}</TableCell>
                <TableCell align="right">{n.type}</TableCell>
                <TableCell align="right">{n.zipcode}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper> );

  }

  transactionDisplay() {
    let myTD = this.state.localUserTransactions;

    myTD.sort((a, b) => (a.transaction_id > b.transaction_id) ? 1 : -1);

    if(this.state.sortTransAttribute ==="transaction_id") {
      myTD.sort((a, b) => (a.transaction_id > b.transaction_id) ? 1 : -1);
    }
    else if(this.state.sortTransAttribute ==="email") {
      myTD.sort((a, b) => (a.email > b.email) ? 1 : -1);
    }
    else if(this.state.sortTransAttribute ==="date_stamp") {
      myTD.sort((a, b) => (a.date_stamp > b.date_stamp) ? 1 : -1);
    }
    else if(this.state.sortTransAttribute ==="amount") {
      myTD.sort((a, b) => (a.amount > b.amount) ? 1 : -1);
    }
    else if(this.state.sortTransAttribute ==="balance") {
      myTD.sort((a, b) => (a.balance > b.balance) ? 1 : -1);
    }
    else if(this.state.sortTransAttribute ==="first_name") {
      myTD.sort((a, b) => (a.account > b.account) ? 1 : -1);
    }
    else if(this.state.sortTransAttribute ==="last_name") {
      myTD.sort((a, b) => (a.balance > b.balance) ? 1 : -1);
    }


    return (
    <Paper style = {{width: '100%', overflowX: 'auto',}}>
      <Table style = {{minWidth: 700,}}>
        <TableHead>
          <TableRow>
            <TableCell>transaction_id</TableCell>
            <TableCell align="right">email</TableCell>
            <TableCell align="right">date_stamp</TableCell>
            <TableCell align="right">amount</TableCell>
            <TableCell align="right">balance</TableCell>
            <TableCell align="right">first_name</TableCell>
            <TableCell align="right">last_name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {myTD.map(n => (
            <TableRow key={n.transaction_id}>
              <TableCell component="th" scope="row">
                {n.transaction_id}
              </TableCell>
              <TableCell align="right">{n.email}</TableCell>
              <TableCell align="right">{n.date_stamp}</TableCell>
              <TableCell align="right">{n.amount}</TableCell>
              <TableCell align="right">{n.balance}</TableCell>
              <TableCell align="right">{n.first_name}</TableCell>
              <TableCell align="right">{n.last_name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper> );
  }

  sortFirstName() {
    this.setState({sortAttribute: "first_name"});
  }

  sortLastName() {
    this.setState({sortAttribute: "last_name"});
  }

  sortEmail() {
    this.setState({sortAttribute: "email"});
  }

  sortAccount() {
    this.setState({sortAttribute: "account"});
  }

  sortStatus() {
    this.setState({sortAttribute: "status"});
  }

  sortBalance() {
    this.setState({sortAttribute: "balance"});
  }

  sortType() {
    this.setState({sortAttribute: "type"});
  }

  sortZipCode() {
    this.setState({sortAttribute: "zipcode"});
  }

  // Sort Transactions
  sortTransId(){
    this.setState({sortTransAttribute: "transaction_id"});
  }

  sortTransEmail() {
    this.setState({sortTransAttribute: "email"});
  }

  sortTransDate() {
    this.setState({sortTransAttribute: "date_stamp"});
  }

  sortTransAmount() {
    this.setState({sortTransAttribute: "amount"});
  }

  sortTransBalance() {
    this.setState({sortTransAttribute: "balance"});
  }

  sortTransFirstName() {
    this.setState({sortTransAttribute: "first_name"});
  }

  sortTransLastName() {
    this.setState({sortTransAttribute: "last_name"});
  }

  handleGenerateReport = e => {
    e.preventDefault();
    let accountReportArr = [];
    let transactionReportArr = [];

    for (let i=0; i < this.state.localUserAccounts.length ; ++i) {
      if(this.state.localUserAccounts[i]["email"] === this.state.emailName) {
          accountReportArr.push(this.state.localUserAccounts[i]);
      }
    }

    if(accountReportArr.length <= 0) {
      this.setState({emailName: ""});
      this.setState({errorPopUp: "Error email does not exist"})
      this.handleErrorShow();
      return;
    }

    this.setState({accountReport : accountReportArr});

    for (let i=0; i < this.state.localUserTransactions.length ; ++i) {
      if(this.state.localUserTransactions[i]["email"] === this.state.emailName) {
          transactionReportArr.push(this.state.localUserTransactions[i]);
      }
    }
      this.setState({transactionReport : transactionReportArr});
      this.handleReportClose();
      this.handleGenReportShow();
}

reportDisplay() {
  let myAccounts = this.state.accountReport;
  let myTransactions = this.state.transactionReport;

  return (
    <div>
    <div style={{textAlign: 'center'}}><h1>Report of User named {myAccounts[0]["first_name"]}</h1></div>
    <h1>{myAccounts[0]["first_name"]} Accounts</h1>
    <Paper style = {{width: '100%', overflowX: 'auto',}}>
      <Table style = {{minWidth: 700,}}>
        <TableHead>
          <TableRow>
            <TableCell>first_name</TableCell>
            <TableCell align="right">last_name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Account #</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Balance</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Zip Code</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {myAccounts.map(n => (
            <TableRow key={n.account_number}>
              <TableCell component="th" scope="row">
                {n.first_name}
              </TableCell>
              <TableCell align="right">{n.last_name}</TableCell>
              <TableCell align="right">{n.email}</TableCell>
              <TableCell align="right">{n.account_number}</TableCell>
              <TableCell align="right">{n.status}</TableCell>
              <TableCell align="right">{n.balance}</TableCell>
              <TableCell align="right">{n.type}</TableCell>
              <TableCell align="right">{n.zipcode}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
    <h1>{myAccounts[0]["first_name"]} Transactions</h1>
  <Paper style = {{width: '100%', overflowX: 'auto',}}>
    <Table style = {{minWidth: 700,}}>
      <TableHead>
        <TableRow>
          <TableCell>transaction_id</TableCell>
          <TableCell align="right">email</TableCell>
          <TableCell align="right">date_stamp</TableCell>
          <TableCell align="right">amount</TableCell>
          <TableCell align="right">balance</TableCell>
          <TableCell align="right">first_name</TableCell>
          <TableCell align="right">last_name</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {myTransactions.map(n => (
          <TableRow key={n.transaction_id}>
            <TableCell component="th" scope="row">
              {n.transaction_id}
            </TableCell>
            <TableCell align="right">{n.email}</TableCell>
            <TableCell align="right">{n.date_stamp}</TableCell>
            <TableCell align="right">{n.amount}</TableCell>
            <TableCell align="right">{n.balance}</TableCell>
            <TableCell align="right">{n.first_name}</TableCell>
            <TableCell align="right">{n.last_name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
   </div>);


}



  render() {
    //const { context } = this.props;


    if(this.state.showGenReport) {
      return (
        <div>{this.reportDisplay()}
            <Button variant="primary" onClick={this.handleGenReportClose}>Return to Dashboard</Button>
        </div>
      );
    }

    return (
      <div style ={{textAlign: 'center', paddingTop: '10px'}}>

      <div><h1>List of Accounts</h1></div>
      <ButtonGroup size="lg">
      <Button variant="secondary" onClick={this.sortFirstName}>First Name</Button>
      <Button variant="secondary" onClick={this.sortLastName}>Last Name</Button>
      <Button variant="secondary" onClick={this.sortEmail}>Email</Button>
      <Button variant="secondary" onClick={this.sortAccount}>Account #</Button>
      <Button variant="secondary" onClick={this.sortStatus}>Status</Button>
      <Button variant="secondary" onClick={this.sortBalance}>Balance</Button>
      <Button variant="secondary" onClick={this.sortType}>Type</Button>
      <Button variant="secondary" onClick={this.sortZipCode}>Zip Code</Button>
      <Button variant="primary" onClick={this.handleReportShow}>Generate Reports</Button>
    </ButtonGroup>

    {this.tableDisplay()}

    <div style ={{paddingTop: '50px'}}>
        <h1>List of all Transactions</h1>
          <ButtonGroup size="lg">
          <Button variant="secondary" onClick={this.sortTransId}>Transaction ID</Button>
          <Button variant="secondary" onClick={this.sortTransEmail}>Email</Button>
          <Button variant="secondary" onClick={this.sortTransDate}>Date</Button>
          <Button variant="secondary" onClick={this.sortTransAmount}>Amount</Button>
          <Button variant="secondary" onClick={this.sortTransBalance}>Balance</Button>
          <Button variant="secondary" onClick={this.sortTransFirstName}>First Name</Button>
          <Button variant="secondary" onClick={this.sortTransLastName}>Last Name</Button>
        </ButtonGroup>
        {this.transactionDisplay()}
    </div>

    <Modal style={{textAlign: 'center', paddingTop: '210px'}}show={this.state.showReport} onHide={this.handleReportClose}>
      <Modal.Header closeButton>
      <Card style = {{height: '15rem', width: '50rem', textAlign: 'center'}}>
        <Card.Body>
     <Card.Title>Generate a customer report</Card.Title>
    <div className="report" style = {{textAlign: 'center', margin: '0 auto'}} >
       <form onSubmit={this.handleGenerateReport}>
          <FormGroup controlId="emailName">
            <FormLabel>Generate a report about an account</FormLabel>
            <FormControl
              autoFocus
              placeholder="Email name of account i.e example@example.com"
              type = "emailName"
              value ={this.state.emailName}
              onChange={this.handleChange}
            />
        </FormGroup>
          <Button
            block
            size="large"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
      </Card.Body>
      </Card>
      </Modal.Header>
      </Modal>

      <Modal style={{textAlign: 'center', paddingTop: '220px'}}show={this.state.showError} onHide={this.handleErrorClose}>
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

export default ManagerDashboard;
