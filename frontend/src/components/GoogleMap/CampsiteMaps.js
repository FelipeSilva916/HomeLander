import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const Map = ({ lat, lng }) => {
  // const googleApiKey = process.env.REACT_APP_GOOGLE_MAPS_API;

  const mapStyles = {
    height: "300px",
    width: "300px",
    padding: "1rem",
    margin: "1rem"
  };

  const center = {
    lat: parseFloat(lat),
    lng: parseFloat(lng)
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyDYELTx5aJJ9cwL9nzevICoo1CD5ILMaSI">
      <GoogleMap mapContainerStyle={mapStyles} zoom={14} center={center}>
        <Marker
          position={center}
          // icon={{
          //   url: "https://homelander.s3.us-west-1.amazonaws.com/mappin.svg",
          //   scaledSize: new window.google.maps.Size(40, 50),
          //   anchor: new window.google.maps.Point(15, 15)
          // }}
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
