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
export const addCampsiteImage = (data) => async (dispatch) => {
  const { campsiteId, imageUrl, userId } = data;
  const formData = new FormData();
  formData.append("campsiteId", campsiteId);
  formData.append("userId", userId);
  if (imageUrl) formData.append("imageUrl", imageUrl);

  const res = await csrfFetch(`/api/campsites/${campsiteId}/images`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data"
    },
    body: formData
  });

  if (res.ok) {
    const image = await res.json();
    dispatch(addImage(image));
    return image;
  }
};

export const getImages = (campsiteId) => async (dispatch) => {
  const response = await csrfFetch(`/api/campsites/${campsiteId}/images`);

  if (response.ok) {
    const images = await response.json();
    dispatch(loadImages(images));
  }
};

export const deleteCampsiteImage =
  (imageId, campsiteId) => async (dispatch) => {
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

    case LOAD_IMAGES:
      newState = { ...state };
      action.images.forEach((image, i) => {
        newState[image.id] = image;
      });
      return newState;

    default:
      return state;
  }
};

export default campsiteImageReducer;
