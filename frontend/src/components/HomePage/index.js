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
        <>
          <div className="homepage__container">
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
        </>
      </>
    );
  } else {
    return (
      <>
        <h1>HEY</h1>
        <h1>HEY</h1>
        <h1>HEY</h1>
        <h1>HEY</h1>
        <h1>HEY</h1>
        <h1>HEY</h1>
        <h1>HEY</h1>
        <h1>HEY</h1>
      </>
    );
  }
};
export default Homepage;
