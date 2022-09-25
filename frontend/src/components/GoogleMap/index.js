import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CampsiteMaps from "./CampsiteMaps";
import { getCampsites } from "../../store/campsite";

const MapContainer = () => {
  const dispatch = useDispatch();
  const campsites = useSelector((state) => state.campsite);
  const map = useSelector((state) => state.map);

  useEffect(() => {
    dispatch(getCampsites());
  }, [dispatch]);

  return (
    <div className="map-container">
      <div className="map-wrapper">
        <div className="map">
          <CampsiteMaps campsites={campsites} map={map} />
        </div>
      </div>
    </div>
  );
};

export default MapContainer;
