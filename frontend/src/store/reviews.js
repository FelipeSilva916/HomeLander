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

const reviewToDelete = (review) => {
  return {
    type: DELETE_REVIEW,
    review
  };
};

const reviewToPost = (review) => {
  return {
    type: POST_REVIEW,
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

export const deleteReview = (review) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${review.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(review)
  });
  if (response.ok) {
    const review = await response.json();
    dispatch(reviewToDelete(review));
  }
};

//create a review for a campsite by ID
export const postReview = (data) => async (dispatch) => {
  console.log(data);
  const response = await csrfFetch(`/api/reviews/${data.campsiteId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  if (response.ok) {
    const review = await response.json();
    dispatch(reviewToPost(data));
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

    case DELETE_REVIEW:
      newState = { ...state };
      delete newState[action.review.id];
      return newState;

    case POST_REVIEW:
      newState = { ...state };
      newState[action.review.id] = action.review;
      return newState;

    default:
      return state;
  }
};
export default reviewsReducer;
