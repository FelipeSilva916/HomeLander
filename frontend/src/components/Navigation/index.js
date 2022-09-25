import React from "react";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import HomeButton from "./HomeButton";
import DemoUser from "../DemoUser/DemoUser";
import SignupFormModal from "../SignupModal";
import AllCampsitesButton from "./AllCampsitesButton";
import "./Navigation.css";
import MyFavoriteCampsites from "../FavoriteCampsites/MyFavorites";
import FavoriteCampsitesModal from "../FavoriteCampsites";
import CreateCampsiteModal from "../CreateCampsiteModal";
import MapContainer from "../GoogleMap";

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
            <AllCampsitesButton />
            <FavoriteCampsitesModal />
            <ProfileButton user={sessionUser} />
          </div>
        </div>
        <h3>Create a site</h3>
        <CreateCampsiteModal />
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
