import { csrfFetch } from "./csrf";

export const LOAD_CAMPSITES = "campsites/loadCampsites";
export const LOAD_CAMPSITE = "campsites/loadCampsite";
export const MY_CAMPSITES = "campsites/myCampsites";
export const EDIT_CAMPSITE = "campsites/editCampsite";
export const DELETE_CAMPSITE = "campsites/deleteCampsite";

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

const loadMyCampsites = (campsites) => {
  return {
    type: MY_CAMPSITES,
    campsites
  };
};

const deleteCampsite = (campsite) => {
  return {
    type: DELETE_CAMPSITE,
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

export const getMyCampsites = () => async (dispatch) => {
  const response = await csrfFetch("/api/my/campsites");

  if (response.ok) {
    const campsites = await response.json();
    dispatch(loadMyCampsites(campsites));
  }
};

export const editCampsite = (campsite) => async (dispatch) => {
  const response = await csrfFetch(`/api/campsites/${campsite.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(campsite)
  });

  if (response.ok) {
    const campsite = await response.json();
    dispatch(loadCampsite(campsite));
  }
};

export const deleteCampsiteThunk = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/campsites/${id}`, {
    method: "DELETE"
  });

  if (response.ok) {
    const campsite = await response.json();
    dispatch(deleteCampsite(campsite));
  }
};

export const createCampsite = (campsite) => async (dispatch) => {
  const response = await csrfFetch("/api/campsites", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(campsite)
  });

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

    case MY_CAMPSITES:
      newState = { ...state };
      action.campsites.forEach((campsite) => {
        newState[campsite.id] = campsite;
      });
      return newState;

    case EDIT_CAMPSITE:
      newState = { ...state };
      newState[action.campsite.id] = action.campsite;
      return newState;

    case DELETE_CAMPSITE:
      newState = { ...state };
      delete newState[action.campsite.id];
      return newState;

    default:
      return state;
  }
};

export default campsiteReducer;
