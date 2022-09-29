import { csrfFetch } from "./csrf";

export const LOAD_FAVORITES = "favorites/loadFavorites";
export const ADD_FAVORITE = "favorites/addFavorite";
export const REMOVE_FAVORITE = "favorites/removeFavorite";

//=========================================================
const loadFavorites = (favorites) => {
  return {
    type: LOAD_FAVORITES,
    favorites
  };
};

const removeFavorite = (favoriteId) => {
  return {
    type: REMOVE_FAVORITE,
    favoriteId
  };
};

const addToFavorites = (favorite) => {
  return {
    type: ADD_FAVORITE,
    favorite
  };
};

//=========================================================
// Action Creators
//=========================================================
export const getAllFavorites = () => async (dispatch) => {
  const response = await csrfFetch("/api/my/favorites");

  if (response.ok) {
    const favorites = await response.json();
    dispatch(loadFavorites(favorites));
  }
};

export const deleteFavorite = (favoriteId) => async (dispatch) => {
  const response = await csrfFetch(`/api/favorites/${favoriteId}`, {
    method: "DELETE"
  });
  if (response.ok) {
    dispatch(removeFavorite(favoriteId));
  }
};

export const addFavorite = (campsiteId) => async (dispatch) => {
  const response = await csrfFetch(`/api/favorites/${campsiteId.id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ campsiteId })
  });

  if (response.ok) {
    const favorite = await response.json();
    dispatch(addToFavorites(favorite));
  }
};
//=========================================================
// Reducer
//=========================================================

let newState = {};

const favoriteReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_FAVORITES:
      newState = { ...state };
      action.favorites.forEach((favorite) => {
        newState[favorite.id] = favorite;
      });
      return newState;

    case REMOVE_FAVORITE:
      console.log("REMOVE_FAVORITE", action);
      newState = { ...state };
      delete newState[action.favoriteId];
      return newState;

    case ADD_FAVORITE:
      console.log("ADD_FAVORITE", action);
      newState = { ...state };
      newState[action.favorite.id] = action.favorite;
      return newState;

    default:
      return state;
  }
};

export default favoriteReducer;
