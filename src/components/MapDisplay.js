import React, {Component} from "react";
import {Map, GoogleApiWrapper, Marker, InfoWindow} from "google-maps-react";


class MapDisplay extends Component {
    
    state = {
        showingInfoWindow: false,
        activeMarker: {},
      }

    onMarkerClick = (props, marker, e) =>
      this.setState({
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
                  <Marker
                    title={'The marker`s title will appear as a tooltip.'}
                    name={'SOMA'}
                    position={{lat: 29.99914, lng: -95.545858}} 
                    onClick={this.onMarkerClick}
                  />

                  <InfoWindow
                      marker={this.state.activeMarker}
                      visible={this.state.showingInfoWindow}>
                        <div>
                          <h1>Hello</h1>
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