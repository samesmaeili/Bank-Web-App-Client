import React, {Component} from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// Place holder database should update
// return an object that is something like this
const CardsObj = {
  1 : {
    number: 4888222233331111,
    type : "Credit Card",
    balance : 500
  },

  2 : {
    number : 9999888877774444,
    type : "Debit Card",
    balance : 1000
  }
}

class Cards extends Component {

  state = {
    localCards : {}
  }

  _renderObject(){
		return Object.entries(CardsObj).map(([key, value], i) => {
			return (
				<div key={key} style = {{ backgroundColor: '#007bff',  color: 'white'}}>
          <ExpansionPanel
          style = {{ backgroundColor: '#007bff',  color: 'white'}}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography  style = {{ backgroundColor: '#007bff',  color: 'white'}}>
              {value.type} Account
               </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
             <Typography   style = {{backgroundColor: '#002bff', color: 'white'}}>
             <li>Account id: {value.number} </li>
              <li>
                 Balance: {value.balance}
              </li>
             </Typography>
           </ExpansionPanelDetails>
          </ExpansionPanel>
			 </div>
			)
		})
	}

  render() {
    const { context } = this.props;
    return (
      <div>
      	{this._renderObject()}
      </div>
    );
  }
}

export default Cards;
