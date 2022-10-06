import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCampsites } from "../../store/campsite";
import { NavLink } from "react-router-dom";
import "./AllCampsites.css";
import AllMaps from "../AllCampsitesMap";

const AllCampsites = () => {
  const dispatch = useDispatch();
  const campsites = useSelector((state) => Object.values(state.campsite));
  const lat = campsites?.latitude;
  const lng = campsites?.longitude;
  console.log("campsite", campsites);
  console.log(lat, lng);

  useEffect(() => {
    dispatch(getAllCampsites());
  }, [dispatch]);
  return (
    <div>
      <AllMaps lat={lat} lng={lng} />
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
    </div>
  );
};

export default AllCampsites;
