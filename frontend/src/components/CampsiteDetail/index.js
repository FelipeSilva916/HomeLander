import { getOneCampsite } from "../../store/campsite";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./campsiteDetail.css";
import EditCampsiteForm from "../EditCampsitesModal/EditCampsiteForm";
import EditCampsiteModal from "../EditCampsitesModal";
import DeleteCampsiteButton from "../DeleteCampsiteButton";
import {
  getReview,
  getReviews,
  getReviewsByCampsiteId
} from "../../store/reviews";
import CreateReviewModal from "../CreateReviewModal";

const CampsiteDetail = ({ setShowModal }) => {
  const { campsiteId } = useParams();
  const dispatch = useDispatch();
  const campsite = useSelector((state) => state.campsite[campsiteId]);
  const user = useSelector((state) => state.session.user);
  const reviewObj = useSelector((state) => state.review);
  const reviewsArray = Object.values(reviewObj);

  useEffect(() => {
    dispatch(getOneCampsite(+campsiteId));
    dispatch(getReviewsByCampsiteId(+campsiteId));
  }, [dispatch, campsiteId]);

  let userManipulationBtn;
  if (campsite) {
    if (campsite.userId === user.id) {
      userManipulationBtn = (
        <div>
          <EditCampsiteModal />
          <DeleteCampsiteButton campsiteId={campsiteId} />
        </div>
      );
    }
  }

  return (
    <div className="campsite-detail-wrapper">
      <div className="campsite-detail-container">
        <div className="campsite-detail-image-container">
          <img
            src={campsite?.previewImage}
            alt={campsite?.name}
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
        </div>
        <div>{userManipulationBtn}</div>
        <div className="campsite-detail-info">Footer</div>
        <div>
          <CreateReviewModal />
        </div>
        <div>
          <h1>Reviews</h1>
          {reviewsArray.map((review, i) => (
            <div key={i}>
              <p>{review?.User?.username}</p>
              <p>{review?.rating}</p>
              <p>{review?.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CampsiteDetail;
