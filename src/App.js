import React, { Component } from 'react';
import './App.css';
import MapDisplay from "./components/MapDisplay";
import ResponsiveDrawer from "./components/ResponsiveDrawer";
import locations from "./data/locations.json";
import axios from 'axios';


const config = {
  headers: {'Authorization': 'Bearer pi67sORoz9nhDUAbIeDVeotZyuh20OSY5c9Z-i9EuEfr3mXGD8TgsOrI8i9srOX77t6vjqknwhntUf-37yx9HpW3YqlTaH4uiUhbtDQOLt7Q61Mv0SeSk7lI3oHgW3Yx'},
  params: {
      method: 'get'
      }
};

class App extends Component {
  state = {
    data: [],
    center: {'lat': 29.99914, 'lng': -95.545858},
    zoom: 13
  }

  componentWillMount() {
        let dataTemp = [];
        locations.forEach(element => {
        let url = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/" + element.businessId;
        axios.get(url, config)
        .then(response => {
            // console.log(response.data);
            dataTemp.push({
                category:response.data.categories[0].alias,
                id: response.data.id,
                name: response.data.name,
                address: response.data.location.address1,
                alias: response.data.alias,
                img: response.data.image_url,
                rating: response.data.rating,
                review_count: response.data.review_count,
                coords: {"lat": response.data.coordinates["latitude"], "lng": response.data.coordinates["longitude"]},
                url: response.data.url,
                phone: response.data.display_phone
            })
            console.log(dataTemp);
            this.setState({
              data: dataTemp
            })
        });
    });
}


  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3">
            <ResponsiveDrawer locations={this.state.data} />
          </div>
          <div id="mapContainer" className="col-lg-9">
            <MapDisplay 
              zoom={this.state.zoom} 
              myDefaultCenter={this.state.center} 
              locations={this.state.data}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
