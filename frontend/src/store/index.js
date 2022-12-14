import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import campsiteReducer from "./campsite";
import favoriteReducer from "./favorites";
import reviewsReducer from "./reviews";
import campsiteImageReducer from "./campsiteImages";

const rootReducer = combineReducers({
  session: sessionReducer,
  campsite: campsiteReducer,
  favorite: favoriteReducer,
  review: reviewsReducer,
  images: campsiteImageReducer
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
