import { csrfFetch } from "./csrf";

// types
const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

// actions
const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER
  };
};

// thunks
export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch("/api/session/login", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password
    })
  });

  const data = await response.json();
  await dispatch(setUser(data));
  return response;
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch("/api/session/logout", {
    method: "DELETE"
  });
  dispatch(removeUser());
  return response;
};

export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  const data = await response.json();
  dispatch(setUser(data.user));

  return response;
};

export const signup = (user) => async (dispatch) => {
  const { firstName, lastName, username, email, password } = user;
  const response = await csrfFetch("/signup", {
    method: "POST",
    body: JSON.stringify({
      firstName,
      lastName,
      username,
      email,
      password
    })
  });
  const data = await response.json();
  dispatch(setUser(data));
  return response;
};

// reducers
const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
