import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ListItems from './ListItems';
import SimpleLineChart from './defaultdisplay/SimpleLineChart';
import SimpleTable from './defaultdisplay/SimpleTable';
import BalanceDisplay from './defaultdisplay/BalanceDisplay';
import Button from '@material-ui/core/Button';
import {Navbar} from 'react-bootstrap';
import Accounts from './accounts/Accounts';
import MakeTransactions from './maketransactions/MakeTransactions';
import SetUpBillAutoPayments from './setupbillautopayments/SetUpBillAutoPayments';

import Cards from './cards/Cards'; // should delete

const drawerWidth = 240;

const styles = theme => ({
  a: {
    color: 'red',
  },
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
  h5: {
    marginBottom: theme.spacing.unit * 2,
  },
});

class Dashboard extends React.Component {
  state = {
    open: true,
  };

  defaultDisplayer () {
    const { classes, context } = this.props;
    const { balance, first_name, last_name, email, address, zipcode } = this.props.context;
    return ( <div>
      <Typography variant="h4" gutterBottom component="h2">
        <h1>Hi {first_name} {last_name}</h1>
        <h1>Email: {email}</h1>
        <h1>Checking Balance: {balance}</h1>
        <h1>Address: {address}</h1>
        <h1>Zip Code: {zipcode}</h1>
      </Typography>
      <Typography component="div" className={classes.chartContainer}>
        <BalanceDisplay />
      </Typography>
      <Typography variant="h4" gutterBottom component="h2">
        Dates of Account Transactions
      </Typography>
      <Typography component="div" className={classes.chartContainer}>
        <SimpleLineChart context = {context}/>
      </Typography>
      <Typography variant="h4" gutterBottom component="h2">
        Transactions Table
      </Typography>
      <div className={classes.tableContainer}>
        <SimpleTable context = {context} />
      </div>
    </div>);
  }

  condDisplay() {
    const { classes, context } = this.props;
    switch(this.props.context.dashboardDisplay) {
      case this.props.context.DEFAULT_DISPLAY:
        return this.defaultDisplayer();
      case this.props.context.ACCOUNTS_DISPLAY:
        return <Accounts context = {context}/>;
      case this.props.context.CARDS_DISPLAY:
        return <Cards context = {context} />;
      case this.props.context.MAKE_TRANSACTIONS_DISPLAY:
        return <MakeTransactions context = {context}/>;
      case this.props.context.SETUP_BILL_AUTO_PAYMENTS_DISPLAY:
        return <SetUpBillAutoPayments context = {context}/>;
      case this.props.context.USER_SUMMARY_DISPLAY:
        return <div> User Summary </div>
      default :
       return this.defaultDisplayer();
    }
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, context } = this.props;
    const { balance, first_name, last_name, email} = this.props.context;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
          style = {{ backgroundColor: '#007bff' }}
        >
          <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                this.state.open && classes.menuButtonHidden,
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color = "inherit"
              noWrap
              className={classes.title}
            >
            <Navbar.Brand
              href="/"
              style= {{color: 'white'}}
            >
              BigBank
            </Navbar.Brand>
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <ListItems context = {context}/>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          {this.condDisplay()}
        </main>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
