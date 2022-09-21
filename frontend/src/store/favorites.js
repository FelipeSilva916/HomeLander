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
  }
  return state;
};

export default favoriteReducer;
