import React from "react";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import HomeButton from "./HomeButton";
import DemoUser from "../DemoUser/DemoUser";
import SignupFormModal from "../SignupModal";
import AllCampsitesButton from "./AllCampsitesButton";
import "./Navigation.css";
import FavoriteCampsitesModal from "../FavoriteCampsites";
import CreateCampsiteModal from "../CreateCampsiteModal";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className="whole-page">
        <div className="nav-bar">
          <div className="nav-bar-left">
            <HomeButton />
            <CreateCampsiteModal />
          </div>

          <div className="nav-bar-right">
            <AllCampsitesButton />
            <FavoriteCampsitesModal />
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
