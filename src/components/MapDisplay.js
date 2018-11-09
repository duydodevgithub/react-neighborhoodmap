import React, {Component} from "react";
import {Map, GoogleApiWrapper, Marker, InfoWindow} from "google-maps-react";


class MapDisplay extends Component {
    
    state = {
        markerObjects: [],
        markerProps: [],
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {}
      }

    onMarkerClick = (props, marker, e) => {
      // console.log(props)
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
    })};

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
        this.setState({
            showingInfoWindow: false,
            activeMarker: null
        })
        }
    };

    

    componentWillReceiveProps(props){
      // console.log(props);
      this.state.markerObjects.forEach(item => {
        if(item.title === props.selectedId) {
          this.onMarkerClick({"name": item.name,"address": item.address},item)
        }
      })
    }

    onMarkerMounted = element => {
        if(this.props.executed) {
          this.setState(prevState => ({
            markerObjects: [...prevState.markerObjects, element.marker]
          }))
        }
    };
  

    render(){
        return(
            <div>
                <Map 
                    role="application"
                    aria-label="map"
                    id="map"
                    google = {this.props.google}
                    initialCenter={this.props.myDefaultCenter}
                    zoom = {this.props.zoom}
                    onClick={this.onMapClicked}
                >
                  {this.props.locations.map((element) => {
                    return(
                      <Marker
                      ref={this.onMarkerMounted}
                      key={element.id}
                      title={element.alias}
                      address={element.address}
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
                          <p>{this.state.selectedPlace.name}</p>
                          <p>{this.state.selectedPlace.address}</p>
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