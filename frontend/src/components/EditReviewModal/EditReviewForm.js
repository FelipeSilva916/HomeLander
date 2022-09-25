import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getOneCampsite } from "../../store/campsite";
import { editReview, getReview } from "../../store/reviews";

const EditReviewForm = ({ setShowModal, campsiteId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const review = useSelector((state) => state.review[`${campsiteId}`]);
  const reviewId = review?.id;
  const [body, setBody] = useState(review?.body);
  const [errors, setErrors] = useState([]);

  // console.log(reviewId);

  useEffect(() => {
    dispatch(getOneCampsite(campsiteId));
    dispatch(getReview(+campsiteId));
  }, [dispatch, campsiteId]);

  useEffect(() => {
    if (review) {
      setBody(body);
    }
  }, [review]);

  const handleSubmit = async (e) => {
    // e.preventDefault();
    setErrors([]);

    await dispatch(
      editReview({
        id: reviewId,
        campsiteId,
        body
      })
    )
      .then(() => {
        setShowModal(false);
        // history.push(`/campsites/${campsiteId}`);
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
          <input
            type="text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EditReviewForm;
