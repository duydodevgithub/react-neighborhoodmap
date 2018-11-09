import React, {Component} from "react";
import {Map, GoogleApiWrapper, Marker, InfoWindow} from "google-maps-react";


class MapDisplay extends Component {
    
    state = {
        markerClicked: false,
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
        showingInfoWindow: true,
        markerClicked: true
      })
      if(this.state.markerClicked) {this.markerAnimate(marker)}
      else {marker.setAnimation(null)}
      ;      
  };

    markerAnimate = (marker) => {
      marker.setAnimation(this.props.google.maps.Animation.BOUNCE)
    }

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
        this.setState((prev) =>{
          prev.activeMarker.setAnimation(null);
          return({
            showingInfoWindow: false,
            activeMarker: null,
            markerClicked: false
          })   
        })
        }
    };

    

    componentWillReceiveProps(props){
      // console.log(props);
      if(this.props.executed) {
      this.state.markerObjects.forEach(item => {
        if(item.title === props.selectedId) {
          this.onMarkerClick({"name": item.name,"address": item.address},item)
        }
      })}
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
                      onClose={this.onMapClicked}
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