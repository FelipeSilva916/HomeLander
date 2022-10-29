import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllCampsites from "./components/AllCampsites";
import CampsiteDetail from "./components/CampsiteDetail";
import MyCampsites from "./components/MyCampsites";
import Homepage from "./components/HomePage";
import PageNotFound from "./components/PageNotFound";
import Footer from "./components/Footer";
import "./index.css";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);
  const user = useSelector((state) => state.session.user);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/campsites/:campsiteId">
            <CampsiteDetail />
          </Route>
          <Route path="/campsites">{user && <AllCampsites />}</Route>
          <Route path="/my/campsites">
            <MyCampsites />
          </Route>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route>
            <PageNotFound />
          </Route>
        </Switch>
      )}
      <div>
        <Footer />
      </div>
    </>
  );
}

export default App;
