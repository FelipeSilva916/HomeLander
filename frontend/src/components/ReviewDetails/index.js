import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviewsByCampsiteId } from "../../store/reviews";
import EditReviewModal from "../EditReviewModal";

const ReviewsTable = ({ campsiteId }) => {
  const dispatch = useDispatch();
  const reviewsArray = Object.values(useSelector((state) => state.review));
  const reviews = reviewsArray.filter(
    (review) => review?.campsiteId === +campsiteId
  );
  const user = useSelector((state) => state.session.user);
  const currentUserReview = reviews.find(
    (review) => review?.userId === user?.id
  );

  useEffect(() => {
    dispatch(getReviewsByCampsiteId(+campsiteId));
  }, [dispatch, campsiteId]);

  let userEditReviewBtn;
  if (reviews) {
    // if (currentUserReview?.userId === user?.id) {
    userEditReviewBtn = <EditReviewModal campsiteId={campsiteId} />;
  }

  return (
    <div className="reviews-table">
      <h1>Reviews</h1>
      {reviewsArray.map((review, i) => (
        <div key={i}>
          <p>{review?.User?.username}</p>
          <p>{review?.rating}</p>
          <p>{review?.body}</p>

          {review?.User?.id === user?.id && userEditReviewBtn}
        </div>
      ))}
    </div>
  );
};

export default ReviewsTable;
