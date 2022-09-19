import { csrfFetch } from "./csrf";

export const LOAD_CAMPSITES = "campsites/loadCampsites";
export const LOAD_CAMPSITE = "campsites/loadCampsite";

//=========================================================
const loadCampsites = (campsites) => {
  return {
    type: LOAD_CAMPSITES,
    campsites
  };
};

const loadCampsite = (campsite) => {
  return {
    type: LOAD_CAMPSITE,
    campsite
  };
};

//=========================================================
// Action Creators
//=========================================================
export const getAllCampsites = () => async (dispatch) => {
  const response = await csrfFetch("/api/campsites");

  if (response.ok) {
    const campsites = await response.json();
    dispatch(loadCampsites(campsites));
  }
};

export const getOneCampsite = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/campsites/${id}`);

  if (response.ok) {
    const campsite = await response.json();
    dispatch(loadCampsite(campsite));
  }
};

//=========================================================
// Reducer
//=========================================================
let newState = {};

const campsiteReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_CAMPSITES:
      newState = { ...state };
      action.campsites.forEach((campsite) => {
        newState[campsite.id] = campsite;
      });
      return newState;

    case LOAD_CAMPSITE:
      newState = { ...state };
      newState[action.campsite.id] = action.campsite;
      return newState;

    default:
      return state;
  }
};

export default campsiteReducer;
