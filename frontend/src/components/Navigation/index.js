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
import "../../index.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className="whole-page">
        <div className="nav-bar">
          <div className="nav-bar-left">
            <HomeButton />

            <AllCampsitesButton />
          </div>

          <div className="nav-bar-right">
            <CreateCampsiteModal />
            <FavoriteCampsitesModal />
            <ProfileButton user={sessionUser} />
          </div>
        </div>
      </div>
    );
  } else {
    sessionLinks = (
      <div className="page">
        <div className="whole-page">
          <div className="nav-bar">
            <div className="nav-bar-left">
              <i
                className="fa-light fa-campground"
                style={{ color: "white", fontSize: "2rem" }}
              ></i>
            </div>
            <div className="nav-bar-right">
              <LoginFormModal />
              <SignupFormModal />
              <DemoUser />
            </div>
          </div>
          <footer className="footer">
            <h2 className="github">
              <a
                href="https://github.com/FelipeSilva916"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-github"></i> GitHub
              </a>
            </h2>
            <h2 className="linkedIn">
              <a
                href="https://www.linkedin.com/in/felipesilva916/"
                target="_blank"
                rel="noreferrer"
              >
                <i class="fa-brands fa-linkedin"></i> LinkedIn
              </a>
            </h2>
          </footer>
        </div>
      </div>
    );
  }

  return <>{isLoaded && sessionLinks}</>;
}

export default Navigation;
