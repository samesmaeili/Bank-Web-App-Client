import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import FrontPage from '../pages/FrontPage';
import SignInPage from '../pages/SignInPage';
import AtmLocatorPage from '../pages/AtmLocatorPage';
import AccountRecoveryPage from '../pages/AccountRecoveryPage';
import CustomerCreationPage from '../pages/CustomerCreationPage';
import AccountDashboardPage from '../pages/AccountDashboardPage';
import ManagerDashboardPage from '../pages/ManagerDashboardPage';
import {MyProvider, AppContext} from './context/context';

class App extends Component {
  render()  {
    return (
      <div className = "App">
        <BrowserRouter>
          <MyProvider>
            <AppContext.Consumer>
              {(context) => {
                return (
                  <React.Fragment>
                    <Route exact path="/" render={ props => <FrontPage {...props} {...context} />} />
                    <Route exact path="/signin" render={ props => <SignInPage {...props} {...context} />} />
                    <Route exact path="/atmlocator" render={ props => <AtmLocatorPage {...props} {...context}/>} />
                    <Route exact path="/customercreation" render={ props => <CustomerCreationPage {...props} {...context} />} />
                    <Route exact path="/accountrecovery" render={ props => <AccountRecoveryPage {...props} {...context} />} />
                    <Route exact path="/accountdashboard" render={ props => <AccountDashboardPage {...props} {...context} />} />
                    <Route exact path="/managerdashboard" render={ props => <ManagerDashboardPage {...props} {...context} />} />
                  </React.Fragment>
                );
              }}
          </AppContext.Consumer>
          </MyProvider>
         </BrowserRouter>
      </div>
    );
  }
}

export default App;
