import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCampsites } from "../../store/campsite";
import Searchbar from "../Searchbar";
import "./Homepage.css";

const Homepage = () => {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const campsites = useSelector((state) => state.campsites);

  useEffect(() => {
    dispatch(getAllCampsites());
  }, [dispatch]);

  if (user) {
    return (
      <>
        <div className="homepage__container">
          <div className="homepage">
            <div className="homepage__contents">
              <div className="homepage__about"></div>
              <h2 className="homepage-title">
                <i
                  className="fa-duotone fa-campground"
                  style={{ color: "#ff4f00" }}
                ></i>
                Welcome {user?.username}, to HomeLander!
              </h2>
              <p>Find your next adventure!</p>
            </div>
            <div className="homepage__searchbar">
              <Searchbar />
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="homepage__container">
          <div className="homepage">
            <div className="homepage__contents">
              <div className="homepage__about"></div>
              <h2 className="homepage-title">
                <i
                  className="fa-duotone fa-campground"
                  style={{ color: "#ff4f00" }}
                ></i>
                Welcome to HomeLander!
              </h2>
              <p>Find your next adventure!</p>
            </div>
            <div className="homepage__description">
              <p>
                HomeLander is a great way to share your favorite camping spots
                with friends and family. With HomeLander, you can create
                campsites that anyone can access. They contain full details such
                as descriptions, pictures, and coordinates. You can also add
                campsites to your favorites list to quickly access them anytime.
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
};
export default Homepage;
