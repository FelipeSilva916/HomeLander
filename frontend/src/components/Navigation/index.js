import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import HomeButton from "./HomeButton";
import DemoUser from "../DemoUser/DemoUser";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className="whole-page">
        <div className="nav-bar">
          <HomeButton />
          <ProfileButton user={sessionUser} />
        </div>
      </div>
    );
  } else {
    sessionLinks = (
      <div className="whole-page">
        <div className="nav-bar">
          <LoginFormModal />
          <NavLink to="/signup">Sign Up</NavLink>
          <DemoUser />
        </div>
      </div>
    );
  }

  return <>{isLoaded && sessionLinks}</>;
}

export default Navigation;
