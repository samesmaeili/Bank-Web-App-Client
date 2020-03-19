import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

let id = 0;
function createData(name, deposited, withdrew, net, balance) {
  id += 1;
  return { id, name, deposited, withdrew, net, balance};
}

const data = [

];

class SimpleTable extends Component {

  render () {

    if(this.props.context.userTransaction === null) {
      return (
      <Paper style = {{width: '100%', overflowX: 'auto',}}>
        <Table style = {{minWidth: 700,}}>
          <TableHead>
            <TableRow>
              <TableCell>Transaction ID# </TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Balance</TableCell>
              <TableCell align="right">Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(n => (
              <TableRow key={n.id}>
                <TableCell component="th" scope="row">
                  {n.name}
                </TableCell>
                <TableCell align="right">{n.deposited}</TableCell>
                <TableCell align="right">{n.withdrew}</TableCell>
                <TableCell align="right">{n.net}</TableCell>
                <TableCell align="right">{n.balance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>);
    }

    return (
      <Paper style = {{width: '100%', overflowX: 'auto',}}>
        <Table style = {{minWidth: 700,}}>
          <TableHead>
            <TableRow>
              <TableCell>Transaction Id# </TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Balance</TableCell>
              <TableCell align="right">Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.context.userTransaction.map(n => (
              <TableRow key={n.transaction_id}>
                <TableCell component="th" scope="row">
                  {n.transaction_id}
                </TableCell>
                <TableCell align="right">{n.date_stamp}</TableCell>
                <TableCell align="right">{n.amount}</TableCell>
                <TableCell align="right">{n.balance}</TableCell>
                <TableCell align="right">{n.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default SimpleTable;
