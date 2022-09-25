import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteReview } from "../../store/reviews";
import { useSelector } from "react-redux";
import { getOneCampsite } from "../../store/campsite";
const DeleteReviewButton = ({ currentReviewId, campsiteId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const review = useSelector((state) => state.review[currentReviewId]);

  console.log(currentReviewId);
  const handleDelete = async (e) => {
    // e.preventDefault();
    await dispatch(deleteReview(currentReviewId));
    history.push(`/campsites/${campsiteId}`);
  };

  return (
    <button className="delete-review-button" onClick={handleDelete}>
      Delete
    </button>
  );
};

export default DeleteReviewButton;
