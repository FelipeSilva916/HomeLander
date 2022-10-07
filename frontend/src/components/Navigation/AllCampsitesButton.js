import React from "react";
import { NavLink } from "react-router-dom";

const AllCampsitesButton = () => {
  return (
    <div className="all-campsites-button">
      <NavLink to="/campsites">
        {window.innerWidth > 768 ? (
          "Explore"
        ) : (
          <i className="fa-solid fa-magnifying-glass-plus"></i>
        )}
      </NavLink>
    </div>
  );
};
export default AllCampsitesButton;
