import { getOneCampsite } from "../../store/campsite";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./campsiteDetail.css";
import DeleteReviewButton from "../DeleteReviewButton";
import EditCampsiteModal from "../EditCampsitesModal";
import DeleteCampsiteButton from "../DeleteCampsiteButton";
import {
  deleteReview,
  getReviews,
  getReviewsByCampsiteId
} from "../../store/reviews";
import CreateReviewModal from "../CreateReviewModal";
import EditReviewModal from "../EditReviewModal";
import Map from "../GoogleMap/CampsiteMaps";
import ReviewsTable from "../ReviewDetails";

const CampsiteDetail = ({ setShowModal }) => {
  const { campsiteId } = useParams();
  const dispatch = useDispatch();
  const campsite = useSelector((state) => state.campsite[campsiteId]);
  const user = useSelector((state) => state.session.user);
  const reviewsArray = Object.values(useSelector((state) => state.review));
  const reviews = reviewsArray.filter(
    (review) => review?.campsiteId === +campsiteId
  );

  // const currentUserReview = reviews.find(
  //   (review) => review?.userId === user?.id
  // );

  useEffect(() => {
    dispatch(getOneCampsite(+campsiteId));
    // dispatch(getReviewsByCampsiteId(+campsiteId));
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
        </div>
      </div>
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
