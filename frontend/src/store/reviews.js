import { csrfFetch } from "./csrf";
// =========================================================
const GET_REVIEWS = "reviews/getReviews";
const GET_REVIEW = "reviews/getReview";
const EDIT_REVIEW = "reviews/editReview";
const DELETE_REVIEW = "reviews/deleteReview";
const POST_REVIEW = "reviews/postReview";

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

const reviewToUpdate = (review) => {
  return {
    type: EDIT_REVIEW,
    review
  };
};

// =========================================================
// Action Creators
// =========================================================
// Reviews in the database
export const getReviews = () => async (dispatch) => {
  const response = await csrfFetch("/api/reviews");

  if (response.ok) {
    const reviews = await response.json();
    dispatch(loadReviews(reviews));
  }
};

// Get all reviews of a campsite by campsite id
export const getReviewsByCampsiteId = (campsiteId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${campsiteId}`);
  if (response.ok) {
    const reviews = await response.json();
    dispatch(loadReviews(reviews));
  }
};

// Get reviews by site ID
export const getReview = (siteId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${siteId}`);

  if (response.ok) {
    const review = await response.json();
    dispatch(loadReviews(review));
    // dispatch(loadReview(review));
  }
};

export const editReview = (review) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${review.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(review)
  });
  if (response.ok) {
    const review = await response.json();
    dispatch(reviewToUpdate(review));
  }
};

// =========================================================
// Reducer
// =========================================================

let newState = {};

const reviewsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_REVIEWS:
      newState = {};
      action.reviews.forEach((review) => {
        newState[review.id] = review;
      });
      return newState;

    case GET_REVIEW:
      newState = { ...state };
      newState[action.review.id] = action.review;
      return newState;

    case EDIT_REVIEW:
      newState = { ...state };
      newState[action.review.id] = action.review;
      return newState;

    default:
      return state;
  }
};
export default reviewsReducer;
