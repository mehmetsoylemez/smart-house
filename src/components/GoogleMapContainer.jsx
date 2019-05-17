import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import MapMarker from "./MapMarker.jsx";

class GoogleMapContainer extends Component {
  render() {
    return (
      <div style={{ height: `500px`, width: `500px` }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAovxsdHSsV8s9G6633T_ISO9T7h5StJtA" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          center={this.props.dynamicCenter}
          zoom={this.props.dynamicZoom}
          onClick={event => {
            this.props.onHouseLocationChange(event.lat, event.lng);
          }}
        >
          <MapMarker name={this.props.markerText} />
        </GoogleMapReact>
      </div>
    );
  }
}

export default GoogleMapContainer;
