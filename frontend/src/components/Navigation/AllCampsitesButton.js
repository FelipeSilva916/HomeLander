import React from "react";
import { NavLink } from "react-router-dom";

const AllCampsitesButton = () => {
  return (
    <div className="all-campsites-button">
      <NavLink to="/campsites">All Campsites</NavLink>
    </div>
  );
};
export default AllCampsitesButton;
