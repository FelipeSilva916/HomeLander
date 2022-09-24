import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
  editCampsite,
  getAllCampsites,
  getOneCampsite
} from "../../store/campsite";
import { editReview, getReview } from "../../store/review";

const EditReviewForm = ({ setShowModal }) => {
  const { reviewId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const review = useSelector((state) => state.review[`${reviewId}`]);
  const [description, setDescription] = useState(null);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(getOneCampsite(reviewId));
    dispatch(getReview(reviewId));
  }, [dispatch]);

  useEffect(() => {
    if (review) {
      setDescription(review.description);
    }
  }, [review]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    await dispatch(
      editReview({
        id: reviewId,
        description
      })
    )
      .then(() => {
        setShowModal(false);
        history.push(`/reviews/${reviewId}`);
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <div className="edit-form">
      <h2>Change your description:</h2>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Description
          <textarea
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
