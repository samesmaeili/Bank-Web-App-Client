import React, { Component } from "react";
import { Button, Card, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import './SignIn.css'

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      response: ''
    };

    this.style = {
      backCol : {
        backgroundColor: "blue"
      }
    };
  }


  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
  }


validateLogin = async e => {
  e.preventDefault();
  this.setState({request : JSON.stringify({email : this.state.email.toLowerCase(), password : this.state.password})});

  const response = await fetch('https://cs160bankingapp-api.herokuapp.com/api/validateUser', {
  method: 'POST',
  mode: "cors",
  headers: {'Content-type': 'application/json',},
  body: JSON.stringify({ email: this.state.email.toLowerCase(), password : this.state.password }),
  });

  if(response.ok == false)
  {
    this.setState({response : 'server unresponsive, please contact server host'});
  }
  else
  {
    const body = await response.json();

    this.setState({response : body["value"]});    //stores either Invalid Username and/or Password, Login Valid1, or Login Valid0

    if(this.state.response === 'Invalid Username and/or Password'){              //If login was unsuccessful

    }
    else
    {
      let transactions = body["transactions"].reverse();            //get account transactions
      let firstName = body["first_name"];
      let lastName = body["last_name"];
      let email  = body["email"];
      let address = body["address"];
      let zipcode = body["zipcode"];

      let userTransaction = []; //transactions for the customer

      if(this.state.response === 'Valid Login1')    //1 represents customer
      {

        const responseTransaction = await fetch('https://cs160bankingapp-api.herokuapp.com/api/getUserTransactions', {
        method: 'POST',
        mode: "cors",
        headers: {'Content-type': 'application/json',},
        body: JSON.stringify({ email: this.state.email.toLowerCase()}),
        });

        const bodyTransaction = await responseTransaction.json();
        userTransaction = bodyTransaction["array"];
        //console.table(userTransaction);
        this.props.context.updateTransaction(userTransaction);

        // add another backend call for bills here if possible
        //this.props.context.updateAutoBills();


        // setting context variables
        this.props.context.updateAddress(address);
        this.props.context.updateZipcode(zipcode);
        this.props.context.updateFirstName(firstName);
        this.props.context.updateLastName(lastName);
        this.props.context.updateEmail(email);
        this.props.context.updateIsSignedIn(true);
        this.props.context.updateDashboardDisplay(this.props.context.DEFAULT_DISPLAY);

        //console.log(transactions[0].balance);     //user current balance

        let accountInfo = body["accountInfo"];  //checkings/savings account info
        let checkingStatus = 'Closed';
        let savingsStatus = 'Closed';
        let checkingBalance = 0;
        let savingsBalance = 0;
        let checkingAccountNumber = 0;
        let savingsAccountNumber = 0;

        if(accountInfo[0].type === 'checking'){
             checkingStatus = accountInfo[0].status;
             savingsStatus = accountInfo[1].status;
             checkingBalance = accountInfo[0].balance;
             savingsBalance = accountInfo[1].balance;
             checkingAccountNumber = accountInfo[0].account_number;
             savingsAccountNumber = accountInfo[1].account_number;
             this.props.context.updateBalance(checkingBalance);


        }else{    //accountInfo[1] is checking
             checkingStatus = accountInfo[1].status;
             savingsStatus = accountInfo[0].status;
             checkingBalance = accountInfo[1].balance;
             savingsBalance = accountInfo[0].balance;
             checkingAccountNumber = accountInfo[1].account_number;
             savingsAccountNumber = accountInfo[0].account_number;
             this.props.context.updateBalance(checkingBalance);
        }

         //update context for checking and savings information
         this.props.context.updateCheckingStatus(checkingStatus);
         this.props.context.updateSavingsStatus(savingsStatus);
         this.props.context.updateCheckingBalance(checkingBalance);
         this.props.context.updateSavingsBalance(savingsBalance);
         this.props.context.updateCheckingAccountNumber(checkingAccountNumber);
         this.props.context.updateSavingsAccountNumber(savingsAccountNumber);

          //get autobill information
          const responseBill = await fetch('https://cs160bankingapp-api.herokuapp.com/api/autobill', {
          method: 'POST',
          mode: "cors",
          headers: {'Content-type': 'application/json',},
          body: JSON.stringify({ email: this.state.email.toLowerCase()}),
          });

          const bodyAutoBill = await responseBill.json();
          let autoBillArray = bodyAutoBill["array"];     //array holds auto bill information of a user
          this.props.context.updateAutoBills(autoBillArray);

          window.location = '/accountdashboard'; // link using this or else context breaks
      }else
      {
        if(this.state.response ==='Valid Login0')
        {    //0 represents manager

          //get bank account information of all customers
          const responseAccounts = await fetch('https://cs160bankingapp-api.herokuapp.com/api/balanceAllUsers', {
          method: 'POST',
          mode: "cors",
          headers: {'Content-type': 'application/json',},
          body: JSON.stringify({ email: this.state.email.toLowerCase()}),
          });

          const bodyAccounts = await responseAccounts.json();
          let accountArray = bodyAccounts["balanceUser"];     //array holds account information of users such as balance of checking/savings account and more
          console.log("All user accounts");
          console.table(accountArray);
          this.props.context.updateAllUserAccounts(accountArray);
          //console.log(accountArray);
          //accountArray[0].first_name;
          //accountArray[0].last_name;
          //accountArray[0].email;
          //accountArray[0].account_number;
          //accountArray[0].status;
          //accountArray[0].balance;
          //accountArray[0].type;

          let holdT =  body["transactions"]; //transactions of all users
          console.log("All user transactions");
          console.table(holdT);
          this.props.context.updateAllUserTransactions(holdT);
          //console.log(holdT);

          this.props.context.updateFirstName("Manager");
          this.props.context.updateIsSignedIn(true);


          window.location = '/managerdashboard';
        }
      }
    }
  }
}


  render() {
    return (
      <div className="SignIn" >
        <Card style = {{ width: '30rem', height: '32rem'}}>
          <Card.Body>
            <p><b> {this.state.response}</b> </p>
           <Card.Title>BigBank Login</Card.Title>
          <form onSubmit={this.validateLogin}>
            <FormGroup controlId="email" bsSize="small">
              <FormLabel>Email</FormLabel>
              <FormControl
                autoFocus
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
                placeholder="Enter Email"
              />
            </FormGroup>
            <FormGroup controlId="password" bsSize="small">
              <FormLabel>Password</FormLabel>
              <FormControl
                value={this.state.password}
                onChange={this.handleChange}
                placeholder="Enter password"
                type="password"
              />
            </FormGroup>
            <Button
              block
              bsSize="large"
              disabled={!this.validateForm()}
              type="submit"
            >
              Sign In
            </Button>
          </form>
          <FormLabel></FormLabel>
         </Card.Body>
        </Card>
      </div>
    );
  }
}

export default SignIn
