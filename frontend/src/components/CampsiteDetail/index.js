import { getOneCampsite } from "../../store/campsite";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const CampsiteDetail = () => {
  const { campsiteId } = useParams();
  const dispatch = useDispatch();
  const campsite = useSelector((state) => state.campsite[campsiteId]);

  useEffect(() => {
    dispatch(getOneCampsite(campsiteId));
  }, [dispatch, campsiteId]);

  return (
    <div className="campsite-detail-wrapper">
      <div className="campsite-detail-container">
        <div className="campsite-detail-image-container">SITE</div>
        console.log(campsite);
        <div className="campsite-detail-info-container">
          <h1>{campsite?.name}</h1>
          <p>{campsite?.description}</p>
          <div className="campsite-detail-info"></div>
        </div>
      </div>
    </div>
  );
};

export default CampsiteDetail;
