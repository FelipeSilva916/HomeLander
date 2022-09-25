import React from "react";
import { GoogleMap, Circle, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%"
};

const center = {
  lat: 47.444,
  lng: -122.176
};

const CampsiteMaps = ({ campsites, map }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });

  return (
    <>
      {isLoaded && (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
          {campsites.map((campsite) => (
            <Circle
              key={campsite.id}
              center={{
                lat: campsite.latitude,
                lng: campsite.longitude
              }}
              radius={map.radius}
            />
          ))}
        </GoogleMap>
      )}
    </>
  );
};

export default CampsiteMaps;
