import { getOneCampsite, getMyCampsites } from "../../store/campsite";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const MyCampsites = () => {
  const dispatch = useDispatch();
  const campsites = useSelector((state) => state.campsite);
  //   console.log(campsites);

  useEffect(() => {
    dispatch(getMyCampsites());
  }, [dispatch]);

  return (
    <div>
      <h1>My Campsites </h1>
    </div>
  );
};

export default MyCampsites;
