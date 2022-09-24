import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getOneCampsite } from "../../store/campsite";
import { editReview, getReview } from "../../store/reviews";

const EditReviewForm = ({ setShowModal }) => {
  const { siteId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const review = useSelector((state) => state.review[`${siteId}`]);
  const [description, setDescription] = useState(null);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(getOneCampsite(siteId));
    dispatch(getReview(siteId));
  }, [dispatch, siteId]);

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
        id: siteId,
        description
      })
    )
      .then(() => {
        setShowModal(false);
        history.push(`/campsites/${siteId}`);
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

export default EditReviewForm;
