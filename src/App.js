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
    dataStatus: true,
    executed: true,
    data: [],
    filterData: [],
    center: {'lat': 29.99914, 'lng': -95.595858},
    zoom: 13,
    selectedId: ""
  }

  fetchAPI = (json) => {
    let dataTemp = [];
        json.forEach(element => {
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
            // console.log(dataTemp);
            this.setState({
              data: dataTemp,
              filterData: dataTemp,
              dataStatus: true
            })
        })
        .catch((error) => {
          console.log(error.response);
          this.setState({dataStatus: false})
        });
    });
  }

  componentWillMount() {
        this.fetchAPI(locations);
  }

  clickItem = (id) => {
    // console.log(id);
    this.setState({"selectedID": id})
    this.forceUpdate();
  }

  updateQuery = (event) => {
    var updatedList = this.state.data;
    // console.log(updatedList)
    updatedList = updatedList.filter(function(item){
      return item.category.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    // console.log(updatedList);
    this.setState({
      filterData: updatedList,
      executed: false
    });
  }

  reload = () => {
    document.location.reload(true);
  }

  render() {
    return (
      <div className="container-fluid">
        {this.state.dataStatus ? (
          <div className="row">
          <div id="drawerContainer" className="col-lg-2">
            <ResponsiveDrawer updateQuery={this.updateQuery} cardClick={this.clickItem} locations={this.state.filterData} />
          </div>
          <div id="mapContainer" className="col-lg-9">
            <MapDisplay 
              executed={this.state.executed}
              zoom={this.state.zoom} 
              myDefaultCenter={this.state.center} 
              locations={this.state.filterData}
              selectedId={this.state.selectedID}
            />
          </div>
        </div>
        ) : (
          <div className="row">
            <h1>Server response fail. Please click to reload the page</h1>
            <button onClick={this.reload}>Reload</button>
          </div>
        )}
      </div>
    );
  }
}

export default App;
