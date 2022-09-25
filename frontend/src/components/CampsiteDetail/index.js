import { getOneCampsite } from "../../store/campsite";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./campsiteDetail.css";
import DeleteReviewButton from "../DeleteReviewButton";
import EditCampsiteModal from "../EditCampsitesModal";
import DeleteCampsiteButton from "../DeleteCampsiteButton";
import { getReviewsByCampsiteId } from "../../store/reviews";
import CreateReviewModal from "../CreateReviewModal";
import EditReviewModal from "../EditReviewModal";
import Map from "../GoogleMap/CampsiteMaps";

const CampsiteDetail = ({ setShowModal }) => {
  const { campsiteId } = useParams();
  const dispatch = useDispatch();
  const campsite = useSelector((state) => state.campsite[campsiteId]);
  const user = useSelector((state) => state.session.user);
  const reviewObj = useSelector((state) => state.review);
  const reviewsArray = Object.values(reviewObj);
  const reviews = reviewsArray.filter(
    (review) => review.campsiteId === +campsiteId
  );

  const currentUserReview = reviews.find((review) => review.userId === user.id);
  console.log("currentUserReview", currentUserReview);
  const currentReviewId = currentUserReview?.id;
  console.log("currentReviewId", currentReviewId);

  useEffect(() => {
    dispatch(getOneCampsite(+campsiteId));
    dispatch(getReviewsByCampsiteId(+campsiteId));
  }, [dispatch, campsiteId]);

  let userManipulationBtn;
  if (campsite) {
    if (campsite.userId === user.id) {
      userManipulationBtn = (
        <div className="user-manipulation-button">
          <EditCampsiteModal />
          <DeleteCampsiteButton campsiteId={campsiteId} />
        </div>
      );
    }
  }

  let userEditReviewBtn;
  if (reviews) {
    userEditReviewBtn = <EditReviewModal campsiteId={campsiteId} />;
  }

  let userDeleteReviewBtn;
  if (reviews) {
    userDeleteReviewBtn = (
      <DeleteReviewButton
        currentReviewId={currentReviewId}
        campsiteId={campsiteId}
      />
    );
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
          {/* <h1>Reviews</h1>
          {reviewsArray.map((review, i) => (
            <div key={i}>
              <p>{review?.User?.username}</p>
              <p>{review?.rating}</p>
              <p>{review?.body}</p>
              {review?.User?.id === user?.id && userEditReviewBtn}
              {review?.User?.id === user?.id && userDeleteReviewBtn}
            </div>
          ))} */}

          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Rating</th>
                <th>Body</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {reviewsArray.map((review, i) => (
                <tr key={i}>
                  <td>{review?.User?.username}</td>
                  <td>{review?.rating}</td>
                  <td>{review?.body}</td>
                  {review?.User?.id === user?.id && (
                    <td>{userEditReviewBtn}</td>
                  )}
                  {review?.User?.id === user?.id && (
                    <td>{userDeleteReviewBtn}</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CampsiteDetail;
