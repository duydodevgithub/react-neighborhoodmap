import React, {Component} from "react";
import {Map, GoogleApiWrapper, Marker, InfoWindow} from "google-maps-react";


class MapDisplay extends Component {
    
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {}
      }

    onMarkerClick = (props, marker, e) =>
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
    });

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
        this.setState({
            showingInfoWindow: false,
            activeMarker: null
        })
        }
    };
    render(){
        return(
            <div>
                <Map 
                    id="map"
                    google = {this.props.google}
                    initialCenter={this.props.myDefaultCenter}
                    zoom = {this.props.zoom}
                    onClick={this.onMapClicked}
                >
                  {this.props.locations.map((element) => {
                    return(
                      <Marker
                      key={element.id}
                      title={element.alias}
                      name={element.name}
                      position={element.coords} 
                      onClick={this.onMarkerClick}
                    />
                    )
                  })}

                  <InfoWindow
                      marker={this.state.activeMarker}
                      visible={this.state.showingInfoWindow}>
                        <div>
                          <h1>{this.state.selectedPlace.name}</h1>
                        </div>
                  </InfoWindow>  
                </Map>


            </div>
        )  
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyBHCyjMDVNauHbBbYo7q8ghTd0maJc2QsM"
  })(MapDisplay)