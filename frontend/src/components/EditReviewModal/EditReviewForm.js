import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getOneCampsite } from "../../store/campsite";
import { editReview, getReview, deleteReview } from "../../store/reviews";

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
    dispatch(getReview(reviewId?.id));
  }, [dispatch, campsiteId]);

  const handleDelete = () => {
    dispatch(deleteReview(reviewId?.id));
    history.go(`/campsites/${campsiteId}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    dispatch(
      editReview({
        id: reviewId?.id,
        campsiteId,
        body,
        rating
      })
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
    <div className="edit-form">
      <h2>Change your description:</h2>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Rating
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
          Description
          <input
            type="text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default EditReviewForm;
