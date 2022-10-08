import { getOneCampsite } from "../../store/campsite";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./campsiteDetail.css";
import EditCampsiteModal from "../EditCampsitesModal";
import DeleteCampsiteButton from "../DeleteCampsiteButton";
import AddCampsiteImageModal from "../AddCampsiteImage";
import DeleteImageButton from "../DeleteImageButton";
import Map from "../GoogleMap/CampsiteMaps";
import ReviewsTable from "../ReviewDetails";
import AddFavoriteButton from "../AddFavoriteButton";
import CampsiteImages from "../CampsiteImages";
import { getImages } from "../../store/campsiteImages";

const CampsiteDetail = ({ setShowModal }) => {
  const { campsiteId } = useParams();
  const dispatch = useDispatch();
  const campsite = useSelector((state) => state.campsite[campsiteId]);
  const user = useSelector((state) => state.session.user);
  const reviews = useSelector((state) => state.review);
  const images = Object.values(useSelector((state) => state.images));
  const [showDelete, setShowDelete] = useState(false);
  // const [index, setIndex] = useState(0);

  useEffect(() => {
    dispatch(getOneCampsite(+campsiteId));
  }, [dispatch, campsiteId, reviews]);

  useEffect(() => {
    dispatch(getImages(campsiteId));
  }, [campsiteId]);

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
              <p>Uploaded By: {campsite?.User?.username} </p>
              <p>Rating: {campsite?.averageRating?.toFixed(1)}</p>
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
      {images?.length > 0 && <CampsiteImages campsiteId={campsiteId} />}

      <AddCampsiteImageModal campsiteId={campsiteId} />

      <div className="reviews-table">
        <ReviewsTable campsiteId={campsiteId} />
      </div>
    </div>
  );
};

export default CampsiteDetail;
