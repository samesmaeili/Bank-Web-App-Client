import React, { Component } from "react";
import { Button, Card, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./AccountRecovery.css"

class AccountRecovery extends Component {

  state = {
    email: "",
  };

  validateForm() {
    return this.state.email.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
  }

  render() {
    return (
      <div className="AccountRecovery" >
        <Card style = {{ width: '30rem', height: '30rem'}}>
          <Card.Body>
           <Card.Title>BigBank</Card.Title>
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="email" bsSize="small">
              <FormLabel>Enter email to receive password</FormLabel>
              <FormControl
                autoFocus
                type="email"
                placeholder="Enter email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormLabel></FormLabel>
            <Button
              block
              bsSize="large"
              disabled={!this.validateForm()}
              type="submit"
            >
              Submit
            </Button>
          </form>
         </Card.Body>
        </Card>
      </div>
    );
  }
}

export default AccountRecovery;
