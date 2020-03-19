
import React from "react";
import { withRouter } from "react-router-dom";

import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import AtmLocator from "../components/atmlocator/AtmLocator";
import { Navbar } from "react-bootstrap";

const divStyle = {
  backgroundColor: "#007bff"
};
 
export class MapContainer extends React.Component {
  render() {
    return (
      <div>
        <AtmLocator></AtmLocator>
      </div>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyAccPI1e6kwhlWF2XANTtIBgF1k1Uf32D0'
})(MapContainer)