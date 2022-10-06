import React, { useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const AllMaps = ({ campsites }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  });
  const lat = parseFloat(campsites[0]?.latitude);
  const lng = parseFloat(campsites[0]?.longitude);

  const mapStyles = {
    height: "450px",
    width: "750px",
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
        zoom={5}
        center={{
          lat: campsites[0]?.latitude ? campsites[0]?.latitude : 0,
          lng: campsites[0]?.longitude ? campsites[0]?.longitude : 0
        }}
      >
        {campsites.map((campsite) => (
          <Marker
            key={campsite.id}
            position={{
              lat: parseFloat(campsite.latitude),
              lng: parseFloat(campsite.longitude)
            }}
            icon={{
              url: "https://u.cubeupload.com/felipe916/vectorstock28985084.png",
              scaledSize: new window.google.maps.Size(50, 50)
            }}
          />
        ))}
      </GoogleMap>
    </>
  );
};

export default AllMaps;
