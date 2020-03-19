import React, {Component} from 'react';
import { Button, Card, FormGroup, FormControl, FormLabel, Modal} from "react-bootstrap";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class SetUpBillAutoPayments extends Component {

  constructor(props, context) {
    super(props, context);

    this.handleSetBillShow = this.handleSetBillShow.bind(this);
    this.handleSetBillClose = this.handleSetBillClose.bind(this);

    this.handleCloseBillShow = this.handleCloseBillShow.bind(this);
    this.handleCloseBillClose = this.handleCloseBillClose.bind(this);

    this.handleErrorShow = this.handleErrorShow.bind(this);
    this.handleErrorClose = this.handleErrorClose.bind(this);

    this.state = {

      showSetBill : false,
      showCloseBill : false,

      showError : false,
      errorPopUp : "",

      billName : "",
      billAmount : 0,
      billDate : "",
      billDateLabel : "",

      bills : this.props.context.autoBills

    };
  }


  handleErrorShow() {
    this.setState({showError: true});
  }

  handleErrorClose() {
      this.setState({showError: false});
  }

  handleSetBillShow() {
    this.setState({showSetBill: true});
  }

  handleSetBillClose() {
    this.setState({showSetBill: false});
  }


  handleCloseBillShow() {
    this.setState({showCloseBill: true});
  }

  handleCloseBillClose() {
    this.setState({showCloseBill: false});
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  _renderObject(){

    if(this.state.bills === null) {
      return null;
    }

    return Object.entries(this.state.bills).map(([key, value], i) => {
      return (
        <div key={key} style = {{ backgroundColor: '#007bff',  color: 'white'}}>
          <ExpansionPanel
          style = {{ backgroundColor: '#007bff',  color: 'white'}}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography  style = {{ backgroundColor: '#007bff',  color: 'white'}}>
              {value.bill_name} Bill
               </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
             <Typography   style = {{backgroundColor: '#002bff', color: 'white'}}>
             <li>
               Bill amount: {value.amount}
             </li>
              <li>
                Charged: {value.bill_date}
              </li>
             </Typography>
           </ExpansionPanelDetails>
          </ExpansionPanel>
       </div>
      )
    })
  }

  handleBillDateLabelChange = event => {
      let index = event.nativeEvent.target.selectedIndex;
      let label = event.nativeEvent.target[index].text;
      this.setState({
        [event.target.id]: event.target.value,
        billDateLabel: label
      });
    }

  handleSetBill = async e => {

    e.preventDefault();


    // check for no auto bills
    var updateBillArray = this.state.bills;
    if(updateBillArray === null) {
      updateBillArray = [];
    }

    // set label to default every month
    // due to a label bug
    let localBillDate = this.state.billDateLabel;
    if(localBillDate === "") {
      localBillDate = "Every Month";
    }

    var billObj = {
      email : this.props.context.email,
      amount : this.state.billAmount,
      bill_name : this.state.billName.toLowerCase(),
      bill_date: localBillDate,
    };

    // Backend Call here
    // Either insert just the object
    // or after update the entire bills array after it is updated from this.setState below
    
    if(Number(this.state.billAmount) > 0){
           
      const response = await fetch('https://cs160bankingapp-api.herokuapp.com/api/findBill', {
      method: 'POST',
      mode: "cors",
      headers: {'Content-type': 'application/json',},
      body: JSON.stringify({ email: this.props.context.email.toLowerCase(), name:this.state.billName.toLowerCase()}),
      });

      //email, amount, name, date
      const body = await response.json();
      
      if(body["array"].length === 0){
        const response1 = await fetch('https://cs160bankingapp-api.herokuapp.com/api/storeautobill', {
        method: 'POST',
        mode: "cors",
        headers: {'Content-type': 'application/json',},
        body: JSON.stringify({ email: this.props.context.email.toLowerCase(), amount:Number(this.state.billAmount), name:this.state.billName.toLowerCase(),  date:localBillDate }),
        });

        //email, amount, name, date
        const body1 = await response1.text();

        if(body1 === "Ok"){
          updateBillArray = [...updateBillArray, billObj ];

          // update above using billObj or here using updateBillArray
          //  whichever one is easier

          this.setState({bills: updateBillArray});
          this.props.context.updateAutoBills(updateBillArray);
        }
      }
    }

    this.handleSetBillClose();
  }

  handleCloseBill = async e => {
    e.preventDefault();

    if(this.state.bills === null) {
      return;
    }

    var updateBillArray = [...this.state.bills];
    var index = updateBillArray.map(function(e) { return e.bill_name; }).indexOf(this.state.billName.toLowerCase());

    if (index !== -1) {
      updateBillArray.splice(index, 1);
      this.setState({bills: updateBillArray});

     // Backend call here
     // easiest way would just to update using the updateBillArray
     // or using the index from above remove bill object directly
      
      const response = await fetch('https://cs160bankingapp-api.herokuapp.com/api/removeautobill', {
      method: 'POST',
      mode: "cors",
      headers: {'Content-type': 'application/json',},
      body: JSON.stringify({ email: this.props.context.email.toLowerCase(), name:this.state.billName.toLowerCase()}),
      });

      //email, name
      const body = await response.text();
      if(body === "Ok"){
        this.props.context.updateAutoBills(updateBillArray);
      }
    }

    this.handleCloseBillClose();
  }

  render() {
    return (
      <div>
        <div style = {{paddingTop: '10px'}}>
        <ul>
        <Button block size = "large" onClick={this.handleSetBillShow}>Set up bill autopayment</Button>
          <Button block size = "large" onClick={this.handleCloseBillShow}>Close a bill autopayment</Button>
        </ul>
        </div>

        <Modal style={{textAlign: 'center', paddingTop: '90px'}}show={this.state.showSetBill} onHide={this.handleSetBillClose}>
          <Modal.Header closeButton>
          <Card style = {{height: '20rem', width: '50rem', textAlign: 'center'}}>
            <Card.Body>
         <Card.Title>Set up a bill to auto pay</Card.Title>
        <div className="Transfer" style = {{ maxWidth: '500px', textAlign: 'center', margin: '0 auto'}} >
          <form onSubmit={this.handleSetBill}>
            <FormGroup controlId="billName">
              <FormLabel>Name of Bill</FormLabel>
              <FormControl
                autoFocus
                placeholder=""
                type = "billName"
                value ={this.state.billName}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="billAmount">
              <FormLabel>Amount to pay</FormLabel>
              <FormControl
                autoFocus
                type = "billAmount"
                value ={this.state.billAmount}
                onChange={this.handleChange}
              />
            </FormGroup>

            <label>
              <select className="billDateLabel" value = {this.state.billDateLabel} name={this.state.billDate} onChange={this.handleBillDateLabelChange}>
               <option value="Every Month">Every Month</option>
               <option value="Every 2 Months">Every 2 Months</option>
               <option value="Every 3 Months">Every 3 Months</option>
               <option value="Every 6 Months">Every 6 Months</option>
               <option value="Every 12 Months">Every 12 Months</option>
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

        <Modal style={{textAlign: 'center', paddingTop: '90px'}}show={this.state.showCloseBill} onHide={this.handleCloseBillClose}>
          <Modal.Header closeButton>
          <Card style = {{height: '20rem', width: '50rem', textAlign: 'center'}}>
            <Card.Body>
         <Card.Title>Close an autopayng bill</Card.Title>
        <div className="Transfer" style = {{ maxWidth: '500px', textAlign: 'center', margin: '0 auto'}} >
          <form onSubmit={this.handleCloseBill}>
            <FormGroup controlId="billName">
              <FormLabel>Name of Bill</FormLabel>
              <FormControl
                autoFocus
                placeholder=""
                type = "billName"
                value ={this.state.billName}
                onChange={this.handleChange}
              />
            </FormGroup>
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

        {this._renderObject()}

      </div>
    );
  }
}

export default SetUpBillAutoPayments;
