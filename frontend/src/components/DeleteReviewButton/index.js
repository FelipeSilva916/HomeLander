import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteReview } from "../../store/reviews";
import { useSelector } from "react-redux";
import { getOneCampsite } from "../../store/campsite";
const DeleteReviewButton = ({ reviewId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
};

export default DeleteReviewButton;
