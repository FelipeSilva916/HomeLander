import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviewsByCampsiteId } from "../../store/reviews";
import EditReviewModal from "../EditReviewModal";
import "./ReviewDetails.css";

const ReviewsTable = ({ campsiteId }) => {
  const dispatch = useDispatch();
  const reviewsArray = Object.values(useSelector((state) => state.review));
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getReviewsByCampsiteId(+campsiteId));
  }, [dispatch, campsiteId]);

  return (
    <div className="reviews-table">
      <h1>Reviews</h1>
      {reviewsArray.map((review, i) => (
        <div className="review-table-items" key={i}>
          <div className="review-username">
            <p>{review?.User?.username}</p>
          </div>
          <div className="review-rating">
            <p>{review?.rating}</p>
          </div>
          <div className="review-content">
            <p>{review?.body}</p>
          </div>
          <div className="review-edit">
            {review?.userId === user?.id && (
              <EditReviewModal campsiteId={campsiteId} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewsTable;
