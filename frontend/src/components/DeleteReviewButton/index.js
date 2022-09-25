import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteReview } from "../../store/reviews";
import { useSelector } from "react-redux";

const DeleteReviewButton = ({ currentReviewId, campsiteId }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDelete = () => {
    dispatch(deleteReview(currentReviewId));
    history.push(`/campsites/${campsiteId}`);
  };

  return (
    <button className="delete-review-button" onClick={handleDelete}>
      Delete
    </button>
  );
};

export default DeleteReviewButton;
