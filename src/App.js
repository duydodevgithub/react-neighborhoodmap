import React, { Component } from 'react';
import './App.css';
import MapDisplay from "./components/MapDisplay";
import ResponsiveDrawer from "./components/ResponsiveDrawer";
import locations from "./data/locations.json";

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-2">
            <ResponsiveDrawer />
          </div>
          <div className="col-lg-10">
            <MapDisplay />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
