import  React, { Component } from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import LineChart from 'recharts/lib/chart/LineChart';
import Line from 'recharts/lib/cartesian/Line';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';

const data = [
  { date_stamp: '2019:01:01', amount : "0", transaction_id: 1},
  { date_stamp: '2019:01:01', amount : "0", transaction_id: 2},
  { date_stamp: '2019:01:01', amount : "0", transaction_id: 3},
  { date_stamp: '2019:01:01', amount : "0", transaction_id: 4},
  { date_stamp: '2019:01:01', amount : "0", transaction_id: 5},
  { date_stamp: '2019:01:01', amount : "0", transaction_id: 6},
  { date_stamp: '2019:01:01', amount : "0", transaction_id: 7},
];


class SimpleLineChart extends Component {
  render() {
        if(this.props.context.userTransaction === null || this.props.context.userTransaction === undefined) {
          return (
            <ResponsiveContainer width="99%" height={320}>
              <LineChart data={data}>
                <XAxis dataKey="date_stamp" />
                <YAxis dataKey="amount"/>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="amount" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          );
        }

    return (
      // 99% per https://github.com/recharts/recharts/issues/172
      <ResponsiveContainer width="99%" height={320}>
        <LineChart data={this.props.context.userTransaction}>
          <XAxis dataKey="date_stamp" />
          <YAxis dataKey="amount"/>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="amount" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    );
  }

}

export default SimpleLineChart;
