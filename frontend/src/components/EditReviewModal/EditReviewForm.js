import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getOneCampsite } from "../../store/campsite";
import {
  editReview,
  getReview,
  deleteReview,
  getReviewsByCampsiteId
} from "../../store/reviews";

const EditReviewForm = ({ setShowModal, campsiteId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const reviewsArray = Object.values(useSelector((state) => state.review));
  const reviewId = reviewsArray.find((review) => review?.userId === user?.id);
  const [body, setBody] = useState(reviewId?.body);
  const [errors, setErrors] = useState([]);
  const [rating, setRating] = useState(reviewId?.rating);

  useEffect(() => {
    dispatch(getOneCampsite(campsiteId));
    dispatch(getReviewsByCampsiteId(campsiteId));
    dispatch(getReview(reviewId?.id));
  }, [dispatch, campsiteId, reviewId?.id]);

  const handleDelete = async () => {
    await dispatch(deleteReview(reviewId?.id));
    setShowModal(false);
    history.go(`/campsites/${campsiteId}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    dispatch(
      editReview(
        {
          userId: user?.id,
          id: reviewId?.id,
          body,
          rating
        },
        campsiteId
      )
    )
      .then(() => {
        setShowModal(false);
        history.push(`/campsites/${campsiteId}`);
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <div className="edit-form-container">
      <h2 className="edit-title">Change your description:</h2>
      <form id="edit-review-form" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Rating: {""}
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />
        </label>
        <label>
          Description:{" "}
          <input
            type="text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </label>
        <button className="edit-form-submit" type="submit">
          Submit
        </button>
      </form>
      <button className="delete-review-button" onClick={handleDelete}>
        <i className="fa-solid fa-trash-xmark"></i>
      </button>
    </div>
  );
};

export default EditReviewForm;
