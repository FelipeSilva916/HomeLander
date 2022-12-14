import React, { useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const Map = ({ lat, lng }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  });

  const mapStyles = {
    height: "350px",
    width: "350px",
    padding: "1rem",
    margin: "1rem"
  };

  if (!isLoaded)
    return (
      <div>
        <i className="fa-solid fa-spinner fa-spin-pulse"></i>
      </div>
    );

  return (
    <>
      <script
        async
        defer
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initMap`}
      ></script>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={{
          lat: lat ? lat : 0,
          lng: lng ? lng : 0
        }}
      >
        <Marker
          position={{
            lat: lat ? lat : 0,
            lng: lng ? lng : 0
          }}
          icon={{
            url: "https://u.cubeupload.com/felipe916/vectorstock28985084.png",
            scaledSize: new window.google.maps.Size(50, 50)
          }}
        />
      </GoogleMap>
    </>
  );
};

export default Map;
