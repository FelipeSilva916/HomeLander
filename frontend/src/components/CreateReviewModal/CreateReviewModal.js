import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { postReview } from "../../store/reviews";

const CreateReviewForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { campsiteId } = useParams();
  const [rating, setRating] = useState(0);
  const [body, setBody] = useState("");
  const user = useSelector((state) => state.session.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const review = {
      rating: +rating,
      body,
      userId: user.id,
      campsiteId: +campsiteId
    };
    const postedReview = await dispatch(postReview(review));
    if (postedReview) {
      history.push(`/campsites/${campsiteId}`);
    }
  };

  return (
    <div className="create-review-modal">
      <form onSubmit={handleSubmit}>
        <div className="create-review-modal__rating">
          <label htmlFor="rating">Rating</label>
          <input
            type="number"
            name="rating"
            id="rating"
            value={rating}
            max="5"
            min="1"
            onChange={(e) => setRating(e.target.value)}
            required
          />
        </div>
        <div className="create-review-modal__body">
          <label htmlFor="body">Review</label>
          <textarea
            name="body"
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          ></textarea>
        </div>
        <button className="create-review-modal__submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateReviewForm;
