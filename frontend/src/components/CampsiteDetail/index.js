import { getOneCampsite } from "../../store/campsite";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./campsiteDetail.css";

const CampsiteDetail = () => {
  const { campsiteId } = useParams();
  const dispatch = useDispatch();
  const campsite = useSelector((state) => state.campsite[campsiteId]);

  useEffect(() => {
    dispatch(getOneCampsite(campsiteId));
  }, [dispatch, campsiteId]);
  console.log(campsite);
  return (
    <div className="campsite-detail-wrapper">
      <div className="campsite-detail-container">
        <div className="campsite-detail-image-container">
          <img
            src={campsite.previewImage}
            alt={campsite.name}
            className="campsite-detail-preview-image"
          />
        </div>
        <div className="campsite-detail-info-container">
          <h1>{campsite?.name}</h1>
          <p>Uploaded By: {campsite?.userId} </p>
          <p>{campsite?.averageRating}</p>
          <p>{campsite?.description}</p>
          <p>{campsite?.latitude}</p>
          <p>{campsite?.longitude}</p>
          <div className="campsite-detail-info"></div>
        </div>
      </div>
    </div>
  );
};

export default CampsiteDetail;
