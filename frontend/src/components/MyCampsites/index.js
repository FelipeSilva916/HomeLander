import { getAllCampsites, getMyCampsites } from "../../store/campsite";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const MyCampsites = () => {
  const dispatch = useDispatch();
  const campsites = useSelector((state) => state.campsite);
  const user = useSelector((state) => state.session.user);
  //   console.log(campsites, user);

  useEffect(() => {
    dispatch(getMyCampsites());
    dispatch(getAllCampsites());
  }, [dispatch]);

  const myCampsites = Object.values(campsites).filter(
    (campsite) => campsite.userId === user.id
  );

  return (
    <div>
      <h1>My Campsites</h1>
      <div>
        {Object.values(myCampsites).map((campsite) => (
          <div key={campsite.id}>
            <h3>{campsite.name}</h3>
            <img src={campsite.previewImage} alt="campsite" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCampsites;
