import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import HomeButton from "./HomeButton";
import DemoUser from "../DemoUser/DemoUser";
import SignupFormModal from "../SignupModal";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className="whole-page">
        <div className="nav-bar">
          <div className="nav-bar-left">
            <HomeButton />
          </div>
          <div className="nav-bar-right">
            <ProfileButton user={sessionUser} />
          </div>
        </div>
      </div>
    );
  } else {
    sessionLinks = (
      <div className="whole-page">
        <div className="nav-bar">
          <div className="nav-bar-left">⛺️</div>
          <div className="nav-bar-right">
            <LoginFormModal />
            <SignupFormModal />
            <DemoUser />
          </div>
        </div>
      </div>
    );
  }

  return <>{isLoaded && sessionLinks}</>;
}

export default Navigation;
