import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteReview } from "../../store/reviews";
import { useSelector } from "react-redux";
import { getOneCampsite } from "../../store/campsite";
const DeleteReviewButton = ({ reviewId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const review = useSelector((state) => state.review[reviewId]);
  const campsiteId = review?.campsiteId;

  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(deleteReview(reviewId));
    history.push(`/campsites/${campsiteId}`);
  };

  return (
    <button className="delete-review-button" onClick={handleDelete}>
      Delete
    </button>
  );
};

export default DeleteReviewButton;
