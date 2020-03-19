import React, {Component} from 'react';
import MainNavbar from '../components/navbar/MainNavbar';
import AccountRecovery from '../components/accountrecovery/AccountRecovery';

class AccountRecoveryPage extends Component {
  render() {
    const { context } = this.props;
    return (
      <div>
        <MainNavbar
          context = {context}
        />
        <AccountRecovery
          context = {context}
        />
      </div>
    );
  }
}

export default AccountRecoveryPage;
