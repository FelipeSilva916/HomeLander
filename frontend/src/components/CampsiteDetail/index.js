import { getOneCampsite } from "../../store/campsite";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./campsiteDetail.css";
import EditCampsiteModal from "../EditCampsitesModal";
import DeleteCampsiteButton from "../DeleteCampsiteButton";

import CreateReviewModal from "../CreateReviewModal";
import Map from "../GoogleMap/CampsiteMaps";
import ReviewsTable from "../ReviewDetails";
import AddFavoriteButton from "../AddFavoriteButton";
import CampsiteImages from "../CampsiteImages";

const CampsiteDetail = ({ setShowModal }) => {
  const { campsiteId } = useParams();
  const dispatch = useDispatch();
  const campsite = useSelector((state) => state.campsite[campsiteId]);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getOneCampsite(+campsiteId));
  }, [dispatch, campsiteId]);

  let userManipulationBtn;
  if (campsite) {
    if (campsite?.userId === user?.id) {
      userManipulationBtn = (
        <div className="user-manipulation-button">
          <EditCampsiteModal />
          <DeleteCampsiteButton campsiteId={campsiteId} />
        </div>
      );
    }
  }

  return (
    <div className="campsite-detail-wrapper">
      <div id="campsite-image-info">
        <div className="campsite-detail-container-info">
          <div className="campsite-detail-image-container">
            <img
              src={campsite?.previewImage}
              alt={campsite?.name}
              className="campsite-detail-preview-image"
            />
          </div>
          <div className="campsite-detail-info-container">
            <div className="campsite-detail-info">
              <h1 className="campsite-name">{campsite?.name}</h1>
              <p>Uploaded By: {campsite?.userId} </p>
              <p>Rating: {campsite?.averageRating}</p>
              <p>Description: {campsite?.description}</p>

              <div>{userManipulationBtn}</div>
            </div>
            <div className="campsite-map-container">
              <Map lat={campsite?.latitude} lng={campsite?.longitude} />
            </div>
            <AddFavoriteButton campsiteId={campsiteId} />
          </div>
        </div>
      </div>
      <div>{/* <AddCampsiteImage campsiteId={campsiteId} /> */}</div>
      <CampsiteImages campsiteId={campsiteId} />
      <div className="campsite-detail-container-reviews">
        <div>
          <CreateReviewModal />
        </div>
        <div className="reviews-table">
          <ReviewsTable campsiteId={campsiteId} />
        </div>
      </div>
    </div>
  );
};

export default CampsiteDetail;
