import React, {Component} from 'react';

const AppContext = React.createContext();

class MyProvider extends Component {

  state = {
    // Customer data
    updateAddress : address =>this.updateAddress(address),
    address: sessionStorage.getItem("address"),
    updateZipcode : zipcode =>this.updateZipcode(zipcode),
    zipcode: sessionStorage.getItem("zipcode"),
    updateEmail : email =>this.updateEmail(email),
    email: sessionStorage.getItem("email"),
    updateFirstName: firstName => this.updateFirstName(firstName),
    first_name: sessionStorage.getItem("first_name"),
    updateLastName: lastName => this.updateLastName(lastName),
    last_name: sessionStorage.getItem("last_name"),
    updateBalance: balance => this.updateBalance(balance),
    balance: sessionStorage.getItem("balance"),
    updateCustomerStatus: cust => this.updateCustomerStatus(cust),
    customer: sessionStorage.getItem("customer"),
    updateTransactions : transactions => this.updateTransactions(transactions),
    transactions: sessionStorage.getItem("transactions"),
    // data in customers dashboard
   // 2 accounts savings vs checking account
    updateAccounts : accounts=>this.updateAccounts(accounts),
    accounts: sessionStorage.getItem("accounts"),
    updateCards: cards=>this.updateCards(cards),
    cards: sessionStorage.getItem("cards"),

    // various customer account information
    updateCheckingStatus : checkingStatus =>this.updateCheckingStatus(checkingStatus),
    checkingStatus: sessionStorage.getItem("checkingStatus"),
    updateSavingsStatus : savingsStatus =>this.updateSavingsStatus(savingsStatus),
    savingsStatus: sessionStorage.getItem("savingsStatus"),
    updateCheckingBalance : checkingBalance =>this.updateCheckingBalance(checkingBalance),
    checkingBalance: sessionStorage.getItem("checkingBalance"),
    updateSavingsBalance : savingsBalance =>this.updateSavingsBalance(savingsBalance),
    savingsBalance: sessionStorage.getItem("savingsBalance"),
    updateCheckingAccountNumber : checkingAccountNumber =>this.updateCheckingAccountNumber(checkingAccountNumber),
    checkingAccountNumber: sessionStorage.getItem("checkingAccountNumber"),
    updateSavingsAccountNumber : savingsAccountNumber =>this.updateSavingsAccountNumber(savingsAccountNumber),
    savingsAccountNumber: sessionStorage.getItem("savingsAccountNumber"),
    updateTransaction : userTransaction =>this.updateTransaction(userTransaction),
    userTransaction: JSON.parse(sessionStorage.getItem("userTransaction")),
    updateAutoBills : autoBills =>this.updateAutoBills(autoBills),
    autoBills: JSON.parse(sessionStorage.getItem("autoBills")),

    // Manager Dashboard All user information arrays
    updateAllUserAccounts : allUserAccounts =>this.updateAllUserAccounts(allUserAccounts),
    allUserAccounts: JSON.parse(sessionStorage.getItem("allUserAccounts")),
    updateAllUserTransactions : allUserTransactions =>this.updateAllUserTransactions(allUserTransactions),
    allUserTransactions: JSON.parse(sessionStorage.getItem("allUserTransactions")),

    // global boolean checks
    updateIsSignedIn: isSignedIn => this.updateIsSignedIn(isSignedIn),
    isSignedIn : sessionStorage.getItem("isSignedIn"),

    // check for conditional account dashboard rendering
    DEFAULT_DISPLAY: "DEFAULT",
    ACCOUNTS_DISPLAY: "ACCOUNTS",
    CARDS_DISPLAY: "CARDS",
    MAKE_TRANSACTIONS_DISPLAY: "MAKE_TRANSACTIONS",
    SETUP_BILL_AUTO_PAYMENTS_DISPLAY: "BILL_AUTOPAYMENTS",
    USER_SUMMARY_DISPLAY: "USER_SUMMARY",
    updateDashboardDisplay : dashboardDisplay => this.updateDashboardDisplay(dashboardDisplay),
    dashboardDisplay : sessionStorage.getItem("dashboardDisplay")
  };

  updateAllUserAccounts (allUserAccounts) {
    sessionStorage.setItem("allUserAccounts", JSON.stringify(allUserAccounts));
    this.setState({allUserAccounts});
  }

  updateAllUserTransactions (allUserTransactions) {
    sessionStorage.setItem("allUserTransactions", JSON.stringify(allUserTransactions));
    this.setState({allUserTransactions});
  }

  updateAutoBills (autoBills) {
    sessionStorage.setItem("autoBills", JSON.stringify(autoBills));
    this.setState({autoBills});
  }

  updateTransaction (userTransaction) {
    sessionStorage.setItem("userTransaction", JSON.stringify(userTransaction));
    this.setState({userTransaction});
  }

  updateCheckingStatus (checkingStatus) {
    sessionStorage.setItem("checkingStatus", checkingStatus);
    this.setState({checkingStatus});
  }
  updateSavingsStatus (savingsStatus) {
    sessionStorage.setItem("savingsStatus", savingsStatus);
    this.setState({savingsStatus});
  }
  updateCheckingBalance (checkingBalance) {
    sessionStorage.setItem("checkingBalance", checkingBalance);
    this.setState({checkingBalance});
  }
  updateSavingsBalance (savingsBalance) {
    sessionStorage.setItem("savingsBalance", savingsBalance);
    this.setState({savingsBalance});
  }
  updateCheckingAccountNumber (checkingAccountNumber) {
    sessionStorage.setItem("checkingAccountNumber", checkingAccountNumber);
    this.setState({checkingAccountNumber});
  }
  updateSavingsAccountNumber (savingsAccountNumber) {
    sessionStorage.setItem("savingsAccountNumber", savingsAccountNumber);
    this.setState({savingsAccountNumber});
  }


  updateAddress (address) {
    sessionStorage.setItem("address", address);
    this.setState({address});
  }

  updateZipcode (zipcode) {
    sessionStorage.setItem("zipcode", zipcode);
    this.setState({zipcode});
  }

  updateEmail (email) {
    sessionStorage.setItem("email", email);
    this.setState({email});
  }

  updateFirstName (first_name) {
      sessionStorage.setItem("first_name", first_name);
      this.setState({first_name});
  }

 updateLastName (last_name) {
   sessionStorage.setItem("last_name", last_name);
   this.setState({last_name});
  }

 updateCustomerStatus(customer){
   if (customer === 0) {
     sessionStorage.setItem("customer", customer)
     this.setState({customer});
   }
   else if (customer === 1) {
     sessionStorage.setItem("customer", customer)
     this.setState({customer});
   }
 }

updateBalance (balance) {
      sessionStorage.setItem("balance", balance);
      this.setState({balance});
  }

updateTransactions (transactions) {
    sessionStorage.setItem("transactions", transactions);
    this.setState({transactions});
  }

updateAccounts (accounts) {
  sessionStorage("accounts", accounts);
  this.setState({accounts});
}

updateCards (cards) {
  sessionStorage.setItem("cards", cards);
  this.setState({cards});
}


updateIsSignedIn (isSignedIn) {
  sessionStorage.setItem("isSignedIn", isSignedIn);
  this.setState({isSignedIn});
}

updateDashboardDisplay (dashboardDisplay) {
  sessionStorage.setItem("dashboardDisplay", dashboardDisplay);
  this.setState({dashboardDisplay});
}

  render() {
    return (
    <AppContext.Provider value={{context: this.state}}>
      {this.props.children}
    </AppContext.Provider>
    );
  }
}

export {MyProvider, AppContext};
