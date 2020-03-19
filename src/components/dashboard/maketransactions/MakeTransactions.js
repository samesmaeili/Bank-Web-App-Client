import React, {Component} from 'react';
import { Button, Card, FormGroup, FormControl, FormLabel, Modal} from "react-bootstrap";
import Popup from "reactjs-popup";
import ImageDropzone from './ImageDropzone';

class MakeTransactions  extends Component {
    constructor(props, context) {
      super(props, context);

      this.handleConfirmShow = this.handleConfirmShow.bind(this);
      this.handleConfirmClose = this.handleConfirmClose.bind(this);

      this.handleErrorShow = this.handleErrorShow.bind(this);
      this.handleErrorClose = this.handleErrorClose.bind(this);

      this.state = {
        value:"Checking to Savings",
        depositNum: 0,
        withdrawNum : 0,
        transferName : "",
        transferNum : 0,
        showPopup : false,
        showDepositPopUp: false,
        showWithdrawPopUp: false,
        showTransferToAnotherCustomer: false,
        showTransferToExternalAccount: false,
        showTransferToInternalAccount: false,
        internalTransfer : "Checking to Savings",
        label: '',

        showConfirm : false,
        confirmPopup : " The Transaction has been performed",
        showDepositByCheckPopUp: false,

        showError : false,
        errorPopUp : "",

        depositText : "",
        depositLabel : "",
        withdrawText : "",
        withdrawLabel : "",
      };
    }

   handleDeposit = async e => {
       e.preventDefault();
       console.log('depositing');

       // use localDepositLabel in api call
       let localDepositLabel = this.state.depositLabel;
       if(localDepositLabel === "") {
         localDepositLabel = "Checking";
       }


      if(isNaN(this.state.depositNum) || this.state.depositNum <= 0) {
        this.setState({depositNum : 0});
        this.setState({errorPopUp: "ERROR invalid amount entry"});
        this.handleErrorShow();
        return;
      }
       
      if(localDepositLabel === "Checking"){
          const response = await fetch('https://cs160bankingapp-api.herokuapp.com/api/depositChecking', {
          method: 'POST',
          mode: "cors",
          headers: {'Content-type': 'application/json',},
          body: JSON.stringify({first_name: this.props.context.first_name, last_name: this.props.context.last_name, email : this.props.context.email, amount: Number(this.state.depositNum) , balance: Number(this.props.context.balance)}),
          });
          
          const body = await response.text();
           console.log(body);
          if(body === 'Ok'){
              console.log("ok");
              let result =  Number(this.props.context.balance) + Number(this.state.depositNum);
              this.props.context.updateBalance(result);
              this.props.context.updateCheckingBalance(result);
              this.handleConfirmShow();
          }
      }else{
        
          const response = await fetch('https://cs160bankingapp-api.herokuapp.com/api/depositSavings', {
          method: 'POST',
          mode: "cors",
          headers: {'Content-type': 'application/json',},
          body: JSON.stringify({first_name: this.props.context.first_name, last_name: this.props.context.last_name, email : this.props.context.email, amount: Number(this.state.depositNum) , balance: Number(this.props.context.savingsBalance)}),
          });
          
          const body = await response.text();
           console.log(body);
          if(body === 'Ok'){
              console.log("ok");
              let result =  Number(this.props.context.savingsBalance) + Number(this.state.depositNum);
              this.props.context.updateSavingsBalance(result);
              this.handleConfirmShow();
          }
              
      }

 
      this.toggleDepositPopup();
    }

    handleDepositByCheck = async e => {
      e.preventDefault();
      console.log('depositing');

       // use localDepositLabel in api call
      let localDepositLabel = this.state.depositLabel;
      if(localDepositLabel === "") {
        localDepositLabel = "Checking";
      }

     if(isNaN(this.state.depositNum) || this.state.depositNum <= 0) {
       this.setState({depositNum : 0});
       this.setState({errorPopUp: "ERROR invalid amount entry"});
       this.handleErrorShow();
       return;

     }
      if(localDepositLabel === "Checking"){
          const response = await fetch('https://cs160bankingapp-api.herokuapp.com/api/depositChecking', {
          method: 'POST',
          mode: "cors",
          headers: {'Content-type': 'application/json',},
          body: JSON.stringify({first_name: this.props.context.first_name, last_name: this.props.context.last_name, email : this.props.context.email, amount: Number(this.state.depositNum) , balance: Number(this.props.context.balance)}),
          });
          
          const body = await response.text();
           console.log(body);
          if(body === 'Ok'){
              console.log("ok");
              let result =  Number(this.props.context.balance) + Number(this.state.depositNum);
              this.props.context.updateBalance(result);
              this.props.context.updateCheckingBalance(result);
              this.handleConfirmShow();
          }
      }else{
        
          const response = await fetch('https://cs160bankingapp-api.herokuapp.com/api/depositSavings', {
          method: 'POST',
          mode: "cors",
          headers: {'Content-type': 'application/json',},
          body: JSON.stringify({first_name: this.props.context.first_name, last_name: this.props.context.last_name, email : this.props.context.email, amount: Number(this.state.depositNum) , balance: Number(this.props.context.savingsBalance)}),
          });
          
          const body = await response.text();
           console.log(body);
          if(body === 'Ok'){
              console.log("ok");
              let result =  Number(this.props.context.savingsBalance) + Number(this.state.depositNum);
              this.props.context.updateSavingsBalance(result);
              this.handleConfirmShow();
          }
              
      }
        
        
        
     this.toggleDepositPopup();
     }



    handleWithdraw = async e => {
       e.preventDefault();

      console.log('withdrawing');
      let result =  Number(this.props.context.balance) - Number(this.state.withdrawNum);


      // use localWithdrawLabel in api call
     let localWithdrawLabel = this.state.withdrawLabel;
     if(localWithdrawLabel === "") {
       localWithdrawLabel = "Checking";
     }
     if(localWithdrawLabel != 'Checking'){
          result =  Number(this.props.context.savingsBalance) - Number(this.state.withdrawNum);
     }
     console.log(localWithdrawLabel);

      if(isNaN(this.state.withdrawNum) || this.state.withdrawNum <= 0 || result < 0) {
        this.setState({withdrawNum : 0});
        this.setState({errorPopUp: "ERROR invalid amount entry or Insufficient funds to withdraw"});
        this.handleErrorShow();
        return;
      }else{
          
          if(localWithdrawLabel === 'Checking'){
              const response = await fetch('https://cs160bankingapp-api.herokuapp.com/api/withdrawChecking', {
              method: 'POST',
              mode: "cors",
              headers: {'Content-type': 'application/json',},
              body: JSON.stringify({first_name: this.props.context.first_name, last_name: this.props.context.last_name, email : this.props.context.email, amount: Number(this.state.withdrawNum) , balance: Number(this.props.context.balance)}),
              });

              const body = await response.text();

              if(body==="Ok"){
                  this.props.context.updateBalance(result);
                  this.props.context.updateCheckingBalance(result);
                  this.handleConfirmShow();
              }
          }else{
               const response = await fetch('https://cs160bankingapp-api.herokuapp.com/api/withdrawSavings', {
              method: 'POST',
              mode: "cors",
              headers: {'Content-type': 'application/json',},
              body: JSON.stringify({first_name: this.props.context.first_name, last_name: this.props.context.last_name, email : this.props.context.email, amount: Number(this.state.withdrawNum) , balance: Number(this.props.context.savingsBalance)}),
              });

              const body = await response.text();

              if(body==="Ok"){
                  result =  Number(this.props.context.savingsBalance) - Number(this.state.withdrawNum);
                  this.props.context.updateSavingsBalance(result);
                  this.handleConfirmShow();
              }
               
          }
          console.log('finished withdrawing');
      }
      this.toggleWithdrawalPopup();

    }


    handleTransferToAnotherCustomer = async e => {
      e.preventDefault();

      this.toggleCustomerTransferPopup();

      console.log('transferring to another customer');

      let resultTest =  Number(this.props.context.balance) - Number(this.state.transferNum);


      if(isNaN(this.state.transferNum) || this.state.transferNum < 0 || resultTest < 0) {
        this.setState({transferNum : 0});
        this.setState({transferName: ""});
        this.setState({errorPopUp: "ERROR invalid amount entry or Insufficient funds to transfer"});
        this.handleErrorShow();
        return;
      }
      // BadCoding.jpeg
      if(this.state.transferName === this.props.context.email) {
        this.setState({errorPopUp: "ERROR Can not transfer to yourself"});
        this.setState({transferNum : 0});
        this.setState({transferName: ""});
        this.handleErrorShow();
        return;
      }

      if(Number(this.state.transferNum) <= Number(this.props.context.balance)){

          const res = await fetch('https://cs160bankingapp-api.herokuapp.com/api/getToBalance', { //get balance from toUser
          method: 'POST',
          mode: "cors",
          headers: {'Content-type': 'application/json',},
          body: JSON.stringify({emailTo: this.state.transferName}),});
          const body = await res.json();

          if(body["array"].length > 0 && body["array"][0].status === 'Open'){    //check statusTo customer is Open and lenght of array > 0 meaning customer is valid

              const response = await fetch('https://cs160bankingapp-api.herokuapp.com/api/transferToInternal', {
              method: 'POST',
              mode: "cors",
              headers: {'Content-type': 'application/json',},
              body: JSON.stringify({first_name: this.props.context.first_name, last_name: this.props.context.last_name,emailFrom : this.props.context.email, emailTo: this.state.transferName, amount: Number(this.state.transferNum), balance: Number(this.props.context.balance), toBalance: body["array"][0].balance, toFirstName:body["array"][0].first_name, toLastName:body["array"][0].last_name}),
              });

                const b = await response.text();
                if(b === 'Ok'){
                    let result =  Number(this.props.context.balance) - Number(this.state.transferNum);
                    this.props.context.updateBalance(result);
                    this.props.context.updateCheckingBalance(result);
                    this.handleConfirmShow();
                }
                console.log('Transferred to another account');
          }
          else {
            this.setState({errorPopUp: "ERROR Insufficient funds to transfer"});
            this.handleErrorShow();
            return;
          }

      }
      else {
        this.setState({errorPopUp: "ERROR Either other customer does not exist or there is a typo"});
        this.handleErrorShow();
        return;
      }

    }

    handleTransferToExternalAccount = async e => {
      e.preventDefault();

      let result =  Number(this.props.context.balance) - Number(this.state.transferNum);

      if(isNaN(this.state.transferNum) || this.state.transferNum < 0 || result < 0) {
        this.setState({transferNum : 0});
        this.setState({errorPopUp: "ERROR invalid amount entry or Insufficient funds to transfer"});
        this.handleErrorShow();
        return;
      }else{
          const response = await fetch('https://cs160bankingapp-api.herokuapp.com/api/withdrawChecking', {
          method: 'POST',
          mode: "cors",
          headers: {'Content-type': 'application/json',},
          body: JSON.stringify({first_name: this.props.context.first_name, last_name: this.props.context.last_name, email : this.props.context.email, amount: Number(this.state.transferNum) , balance: Number(this.props.context.balance)}),
          });

          const body = await response.text();

          if(body==="Ok"){
              this.props.context.updateBalance(result);
              this.props.context.updateCheckingBalance(result);
              this.handleConfirmShow();
          }
      }
      console.log('finished external transfer');
      this.toggleExternalTransferPopup();

    }

    handleTransferToInternalAccount = async e => {
      e.preventDefault();


      if(this.props.context.checkingStatus === 'Closed' || this.props.context.savingsStatus === 'Closed') {
        this.setState({errorPopUp: "ERROR either your checking or savings account is closed"});
        this.handleErrorShow();
        return;
      }

        if(this.props.context.checkingStatus === 'Open' && this.props.context.savingsStatus === 'Open'){
            let from = '';
            let to = '';
            let fromBalance = 0;
            let toBalance = 0;

            if(this.state.value === "Checking to Savings"){
                from = 'checking';
                to = 'savings';
                fromBalance = this.props.context.balance;
                toBalance = this.props.context.savingsBalance;
            }else{
                to = 'checking';
                from = 'savings';
                toBalance = this.props.context.balance;
                fromBalance = this.props.context.savingsBalance;
            }

            let result = fromBalance - Number(this.state.transferNum);
            if(isNaN(this.state.transferNum) || this.state.transferNum <= 0 || result < 0) {
                this.setState({transferNum : 0});
                this.setState({errorPopUp: "ERROR invalid amount entry or Insufficient funds to transfer"});
                this.handleErrorShow();
                return;
            }

         //{email, accountFrom, accountTo, amount}
          const response = await fetch('https://cs160bankingapp-api.herokuapp.com/api/transferSelf', {
          method: 'POST',
          mode: "cors",
          headers: {'Content-type': 'application/json',},
          body: JSON.stringify({email : this.props.context.email, accountFrom:from , accountTo:to,amount: Number(this.state.transferNum), toBalance:toBalance, fromBalance:fromBalance}),
          });

          const body = await response.text();
           if(body === 'Ok'){
                if(this.state.value === "Checking to Savings"){
                    let result = Number(this.props.context.balance) - Number(this.state.transferNum);
                    this.props.context.updateSavingsBalance(this.props.context.savingsBalance + this.state.transferNum);
                    this.props.context.updateCheckingBalance(this.props.context.checkingBalance - this.state.transferNum);
                    this.props.context.updateBalance(result);
                    this.handleConfirmShow();

                }else{
                   let result = Number(this.props.context.balance) + Number(this.state.transferNum);

                    this.props.context.updateSavingsBalance(this.props.context.savingsBalance - this.state.transferNum);
                    this.props.context.updateCheckingBalance(this.props.context.checkingBalance + this.state.transferNum);
                    this.props.context.updateBalance(result);
                    this.handleConfirmShow();

                }

                console.log("transferring internally");
           }
        }

        this.toggleInternalTransferPopup();
    }

  toggleDepositPopup() {
      this.setState({showDepositPopUp: !this.state.showDepositPopUp});
    }

  toggleDepositByCheckPopup() {
    this.setState({showDepositByCheckPopUp: !this.state.showDepositByCheckPopUp});
  }

  toggleWithdrawalPopup() {
    this.setState({showWithdrawPopUp: !this.state.showWithdrawPopUp});
  }

  toggleCustomerTransferPopup() {
  this.setState({showTransferToAnotherCustomer: !this.state.showTransferToAnotherCustomer});
  }

  toggleExternalTransferPopup() {
  this.setState({showTransferToExternalAccount: !this.state.showTransferToExternalAccount});
  }

  toggleInternalTransferPopup() {
  this.setState({showTransferToInternalAccount: !this.state.showTransferToInternalAccount});
  }

    handleChange = event => {
      this.setState({
        [event.target.id]: event.target.value,
      });
    }

    handleInternalChange = event => {
        this.setState({value: event.target.value});
    }

    handleSubmit = event => {
      event.preventDefault();
    }

    handleConfirmShow() {
      this.setState({showConfirm: true});
    }

    handleConfirmClose() {
        this.setState({showConfirm: false});
    }

    handleErrorShow() {
      this.setState({showError: true});
    }

    handleErrorClose() {
        this.setState({showError: false});
    }


      handleDepositLabelChange = event => {
          let index = event.nativeEvent.target.selectedIndex;
          let label = event.nativeEvent.target[index].text;
          this.setState({
            [event.target.id]: event.target.value,
            depositLabel: label
          });
        }

        handleWithdrawLabelChange = event => {
            let index = event.nativeEvent.target.selectedIndex;
            let label = event.nativeEvent.target[index].text;
            this.setState({
              [event.target.id]: event.target.value,
              withdrawLabel: label
            });
          }


    render() {
      let {balance, savingsBalance} = this.props.context;

      if(this.props.context.checkingStatus === "Closed" || this.props.context.checkingStatus === null) {
        return <h4>To start performing transactions open a Checking Account under 'Accounts'</h4>
      }
      return (

          <div style = {{ textAlign: 'center', paddingTop: '30px'}}>

          <Popup
            trigger={<Button block size = "large" type="submit">Make a Deposit</Button>}
            position="center right"
            modal
            open= {this.state.showDepositPopUp}
            >
            <Card style = {{height: '18rem', textAlign: 'center'}}>
              <Card.Body>
           <Card.Title>Making a deposit/credit</Card.Title>
          <div className="Deposit" style = {{ maxWidth: '500px', margin: '0 auto'}}>
             <form onSubmit={this.handleDeposit}>
                <FormGroup controlId="depositNum">
                  <FormLabel>Amount to deposit</FormLabel>
                  <FormControl
                    autoFocus
                    placeholder="Enter amount to deposit"
                    type = "depositNum"
                    value ={this.state.depositNum}
                    onChange={this.handleChange}
                  />
              </FormGroup>
              Which account to Deposit To
              <br/>
              <label>
                <select className="depositLabel"  value={this.state.depositLabel}  name={this.state.depositText} onChange={this.handleDepositLabelChange}>
                 <option value="Checking">Checking</option>
                 <option value="Savings">Savings</option>
               </select>
             </label>
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
           </Popup>

           <Popup
             trigger={<Button block size = "large" type="submit">Make a Deposit by Check image</Button>}
             position="center right"
             modal
             open= {this.state.showDepositByCheckPopUp}
             >
             <Card style = {{height: '18rem', textAlign: 'center'}}>
               <Card.Body>
            <Card.Title>Making a deposit by check image</Card.Title>
           <div className="Deposit" style = {{ maxWidth: '500px', margin: '0 auto'}}>
              <form onSubmit={this.handleDepositByCheck}>
                <div style = {{backgroundColor: 'blue', color: 'white'}}>
                  <ImageDropzone/>
                </div>
                <div style = {{backgroundColor: 'white', color: 'white'}}>For spacing xD</div>
                  <FormGroup controlId="depositNum">
                    <FormLabel>What is the amount on the image?</FormLabel>
                    <FormControl
                      autoFocus
                      placeholder="Enter amount to deposit"
                      type = "depositNum"
                      value ={this.state.depositNum}
                      onChange={this.handleChange}
                    />
                </FormGroup>
                Which account to Deposit To
                <br/>
                <label>
                  <select className="depositLabel"  value={this.state.depositLabel}  name={this.state.depositText} onChange={this.handleDepositLabelChange}>
                   <option value="Checking">Checking</option>
                   <option value="Savings">Savings</option>
                 </select>
               </label>
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
            </Popup>

           <Popup
             trigger={<Button block size = "large" type="submit">Make a Withdrawal</Button>}
             position="center right"
             modal
             open= {this.state.showWithdrawPopUp}
             style = {{ maxWidth: '500px'}}
             >
             <Card style = {{height: '18rem', textAlign: 'center'}}>
               <Card.Body>
            <Card.Title>Making a withdrawal/debit</Card.Title>
          <div className="Withdraw" style = {{ maxWidth: '500px', textAlign: 'center', margin: '0 auto'}} >
             <form onSubmit={this.handleWithdraw}>
                <FormGroup controlId="withdrawNum">
                  <FormLabel>Withdraw</FormLabel>
                  <FormControl
                    autoFocus
                    placeholder="Enter amount to withdraw"
                    type = "withdrawNum"
                    value ={this.state.withdrawNum}
                    onChange={this.handleChange}
                  />
              </FormGroup>
              Which account to Withdraw from:
              <br/>
              <label>
                <select className="withdrawLabel"  value={this.state.withdrawLabel}  name={this.state.withdrawText} onChange={this.handleWithdrawLabelChange}>
                 <option value="Checking">Checking</option>
                 <option value="Savings">Savings</option>
               </select>
             </label>
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
      </Popup>

      <Popup
        trigger={<Button block size = "large" type="submit">Transfer money to another fellow customer</Button>}
        position="center right"
        modal
        open= {this.state.showTransferToAnotherCustomer}
        style = {{ maxWidth: '500px'}}
        >
        <Card style = {{height: '18rem', textAlign: 'center'}}>
          <Card.Body>
       <Card.Title>Making a transfer</Card.Title>
     <div className="Transfer" style = {{ maxWidth: '500px', textAlign: 'center', margin: '0 auto'}} >
        <form onSubmit={this.handleTransferToAnotherCustomer}>
           <FormGroup controlId="transferName">
             <FormLabel>Name of Transferee</FormLabel>
             <FormControl
               autoFocus
               placeholder="Enter email of person you want to transfer to"
               type = "transferName"
               value ={this.state.transferName}
               onChange={this.handleChange}
             />
         </FormGroup>
          <FormGroup controlId="transferNum">
           <FormLabel>Amount to be transfered</FormLabel>
           <FormControl
             placeholder="Enter amount to transfer"
             type = "transferNum"
             value ={this.state.transferNum}
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
 </Popup>

 <Popup
   trigger={<Button block size = "large" type="submit">Transfer money to an external account</Button>}
   position="center right"
   modal
   open= {this.state.showTransferToExternalAccount}
   style = {{ maxWidth: '500px'}}
   >
   <Card style = {{height: '18rem', textAlign: 'center'}}>
     <Card.Body>
  <Card.Title>Making an external account transfer</Card.Title>
<div className="Transfer" style = {{ maxWidth: '500px', textAlign: 'center', margin: '0 auto'}} >
   <form onSubmit={this.handleTransferToExternalAccount}>
      <FormGroup controlId="transferName">
        <FormLabel>Name of Account to Transfer</FormLabel>
        <FormControl
          autoFocus
          placeholder="The Account name you want to transfer to i.e itunes"
          type = "transferName"
          value ={this.state.transferName}
          onChange={this.handleChange}
        />
    </FormGroup>
     <FormGroup controlId="transferNum">
      <FormLabel>Amount to be transfered</FormLabel>
      <FormControl
        placeholder="Enter amount to transfer"
        type = "transferNum"
        value ={this.state.transferNum}
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
</Popup>

<Popup
  trigger={<Button block size = "large" type="submit">Transfer money to an internal account</Button>}
  position="center right"
  modal
  open= {this.state.showTransferToInternalAccount}
  style = {{ maxWidth: '500px'}}
  >
  <Card style = {{height: '18rem', textAlign: 'center'}}>
    <Card.Body>
 <Card.Title>Making an internal account transfer</Card.Title>
<div className="Transfer" style = {{ maxWidth: '500px', textAlign: 'center', margin: '0 auto'}} >
  <form onSubmit={this.handleTransferToInternalAccount}>
    <FormGroup controlId="transferNum">
     <FormLabel>Amount to be transfered</FormLabel>
     <FormControl
       placeholder="Enter amount to transfer"
       type = "transferNum"
       value ={this.state.transferNum}
       onChange={this.handleChange}
     />
    </FormGroup>
    <label>

      <select className="internalTransfer"  value={this.state.value}  name={this.state.internalTransfer} onChange={this.handleInternalChange}>
       <option value="Checking to Savings">Checking to Savings</option>
       <option value="Savings to Checking">Savings to Checking</option>
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
</Popup>
    <h1> Checking Balance: ${balance} </h1>
    <h1> Savings Balance: ${savingsBalance}</h1>

      <Modal style={{textAlign: 'center', paddingTop: '210px'}}show={this.state.showConfirm} onHide={this.handleConfirmClose}>
        <Modal.Header closeButton>
        <Card style = {{height: '10rem', width: '50rem', textAlign: 'center'}}>
          <Card.Body>
       <Card.Title>Transaction successful!</Card.Title>
      <div className="Transfer" style = {{ maxWidth: '500px', textAlign: 'center', margin: '0 auto'}} >
        <form onSubmit={this.handleConfirmClose}>
          {this.state.confirmPopup}
           <Button
             block
             size="large"
             type="submit"
             style= {{paddingTop: '10px'}}
           >
             Click to continue
           </Button>
         </form>
      </div>
      </Card.Body>
      </Card>
      </Modal.Header>
      </Modal>

      <Modal style={{textAlign: 'center', paddingTop: '210px'}}show={this.state.showError} onHide={this.handleErrorClose}>
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

export default MakeTransactions;
