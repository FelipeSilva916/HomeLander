import { csrfFetch } from "./csrf";
// =========================================================
const GET_REVIEWS = "reviews/getReviews";
const GET_REVIEW = "reviews/getReview";

// =========================================================
const loadReviews = (reviews) => {
  return {
    type: GET_REVIEWS,
    reviews
  };
};

const loadReview = (review) => {
  return {
    type: GET_REVIEW,
    review
  };
};

// =========================================================
// Action Creators
// =========================================================
export const getReviews = () => async (dispatch) => {
  const response = await csrfFetch("/api/reviews");

  if (response.ok) {
    const reviews = await response.json();
    dispatch(loadReviews(reviews));
  }
};

export const getReview = (siteId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${siteId}`);

  if (response.ok) {
    const review = await response.json();
    dispatch(loadReview(review));
  }
};

// =========================================================
// Reducer
// =========================================================

let newState = {};

const reviewsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_REVIEWS:
      newState = { ...state };
      action.reviews.forEach((review) => {
        newState[review.id] = review;
      });
      return newState;

    case GET_REVIEW:
      newState = { ...state };
      newState[action.review.id] = action.review;
      return newState;

    default:
      return state;
  }
};
export default reviewsReducer;
