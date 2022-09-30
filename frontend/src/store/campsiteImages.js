import { csrfFetch } from "./csrf";

export const ADD_IMAGE = "campsites/addImage";
export const DELETE_IMAGE = "campsites/deleteImage";
export const LOAD_IMAGES = "campsites/loadImages";

//=========================================================
const addImage = (image) => {
  return {
    type: ADD_IMAGE,
    image
  };
};

const deleteImage = (image) => {
  return {
    type: DELETE_IMAGE,
    image
  };
};

const loadImages = (images) => {
  return {
    type: LOAD_IMAGES,
    images
  };
};
//=========================================================
// Action Creators
//=========================================================
export const addCampsiteImage = (campsiteId, imageUrl) => async (dispatch) => {
  const response = await csrfFetch(`/api/campsites/${campsiteId}/images`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ imageUrl })
  });

  if (response.ok) {
    const image = await response.json();
    dispatch(addImage(image));
  }
};

export const getImages = (campsiteId) => async (dispatch) => {
  const response = await csrfFetch(`/api/campsites/${campsiteId}/images`);

  if (response.ok) {
    const images = await response.json();
    dispatch(loadImages(images));
  }
};

//   const formData = new FormData();
//   formData.append("image", image);
//   const response = await csrfFetch(`/api/campsites/${campsiteId}/images`, {
//     method: "POST",
//     body: formData
//   });
//   if (response.ok) {
//     const image = await response.json();
//     dispatch(addImage(image));
//   }
// };

export const deleteCampsiteImage =
  (campsiteId, imageId) => async (dispatch) => {
    const response = await csrfFetch(
      `/api/campsites/${campsiteId}/images/${imageId}`,
      {
        method: "DELETE"
      }
    );

    if (response.ok) {
      const image = await response.json();
      dispatch(deleteImage(image));
    }
  };

//=========================================================

let newState = {};

const campsiteImageReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_IMAGE:
      newState = { ...state };
      newState[action.image.id] = action.image;
      return newState;

    case DELETE_IMAGE:
      newState = { ...state };
      delete newState[action.image.id];
      return newState;

    default:
      return state;
  }
};
