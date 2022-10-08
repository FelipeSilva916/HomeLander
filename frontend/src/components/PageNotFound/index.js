import React from "react";
import { Link } from "react-router-dom";
import "./PageNotFound.css";

const PageNotFound = () => {
  return (
    <div className="page-container">
      <div className="page-not-found">
        <h2>Nothing here 🫤</h2>
        <h3>
          Let's try again at <Link to="/">Home!</Link>
        </h3>
        <img
          src="https://u.cubeupload.com/felipe916/nulledit.jpg
          "
          alt="404"
        />
      </div>
    </div>
  );
};

export default PageNotFound;
