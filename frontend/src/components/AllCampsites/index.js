import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCampsites } from "../../store/campsite";
import { NavLink } from "react-router-dom";
import "./AllCampsites.css";
import AllMaps from "../AllCampsitesMap";

const AllCampsites = () => {
  const dispatch = useDispatch();
  const campsites = useSelector((state) => Object.values(state.campsite));

  useEffect(() => {
    dispatch(getAllCampsites());
  }, [dispatch]);
  return (
    <div>
      <div className="all-campsites-wrapper">
        <h1>All Campsites</h1>
        <div className="all-campsites-container">
          {campsites.map((campsite) => (
            <div className="campsite-card" key={campsite.id}>
              <NavLink to={`/campsites/${campsite.id}`}>
                <img
                  src={campsite.previewImage}
                  alt={campsite.name}
                  className="campsite-preview-image"
                />
                <h2>{campsite.name}</h2>
              </NavLink>
            </div>
          ))}
        </div>
      </div>
      <div className="all-campsites-map">
        <AllMaps campsites={campsites} />
      </div>
    </div>
  );
};

export default AllCampsites;
