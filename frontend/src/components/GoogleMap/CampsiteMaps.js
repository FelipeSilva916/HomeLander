import React from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const Map = ({ lat, lng }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  });

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
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap mapContainerStyle={mapStyles} zoom={14} center={center}>
      <Marker
        position={center}
        icon={{
          url: "https://u.cubeupload.com/felipe916/vectorstock28985084.png",
          scaledSize: new window.google.maps.Size(50, 50)
        }}
      />
    </GoogleMap>
  );
};

export default Map;
