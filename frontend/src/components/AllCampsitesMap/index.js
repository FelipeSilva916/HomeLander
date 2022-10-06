import React from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const AllMaps = ({ lat, lng }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  });

  const mapStyles = {
    height: "450px",
    width: "750px",
    padding: "1rem",
    margin: "1rem"
  };

  const center = {
    lat: parseFloat(lat),
    lng: parseFloat(lng)
  };
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <script
        async
        defer
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initMap`}
      ></script>
      <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={center}>
        <Marker
          icon={{
            url: "https://u.cubeupload.com/felipe916/vectorstock28985084.png",
            scaledSize: new window.google.maps.Size(50, 50)
          }}
        />
      </GoogleMap>
    </>
  );
};

export default AllMaps;
