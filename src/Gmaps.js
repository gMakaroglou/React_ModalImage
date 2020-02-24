import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
export class MapContainer extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        stores: [{lat: 37.9389169, lng: 23.6561724},
                {latitude: 37.9422874, longitude: 23.649348},
                {latitude: 37.9415132, longitude: 23.6528684},
                {latitude: 37.9422874, longitude: 23.649348},
                {latitude: 37.9422874, longitude: 23.649348},
                {latitude: 37.9422874, longitude: 23.649348}],
        markers: [

        ]
      }
    }
  
    displayMarkers = () => {
      return this.state.stores.map((store, index) => {
        return <Marker key={index} id={index} position={{
         lat: store.latitude,
         lng: store.longitude
       }}
       onClick={() => console.log("You clicked me!")} />
      })
    }
    displayMarkerss = () => {
       if(this.props.markers!==undefined) console.log(this.props.markers)
        return this.props.markers.map((store, index) => {
            console.log(store.latitude+","+store.longitude)
          return <Marker key={index} id={index} position={{
           lat:  store.latitude ,
           lng: store!==undefined ? store.longitude : 0.0
         }}
         onClick={() => console.log("You clicked me!")} />
        })
      }
    updateMarkerPositions = pos => {
        this.setState(state=> ({
          markers:pos
        }))
      }
      
    render() {
      return (
          <div>
          <button onClick={this.props.showonmap}>Show on Map</button>

          <Map
            google={this.props.google}
            zoom={15}
            style={mapStyles}
            initialCenter={{ lat: 37.9740333, lng: 23.689629}}
          >
            {this.displayMarkerss()}
          </Map>
          </div>
      );
    }
  }
  const mapStyles = {
    width: '100%',
    height: '100%',
  };
  export default GoogleApiWrapper({
    apiKey: `${
        process.env.REACT_APP_GOOGLE_KEY
      }`
  })(MapContainer);