import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import { useHistory } from "react-router-dom";
import { getAllFavorites } from "../../store/favorites";
import { getAllCampsites } from "../../store/campsite";

// Render campsites created by the user
const MyFavoriteCampsites = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const favorites = Object.values(useSelector((state) => state.favorite));
  const [loaded, setLoaded] = useState(false);
  const campsiteState = useSelector((state) => state.campsite);

  useEffect(() => {
    dispatch(getAllFavorites()).then(() => setLoaded(true));
    dispatch(getAllCampsites());
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  const favCampsiteName = favorites.map((favorite) => {
    return campsiteState[favorite.campsiteId].name;
  });

  return (
    <div>
      <h3>My Favorites</h3>
      <div>
        {favCampsiteName?.map((favorite, i) => (
          <div key={i}>{favorite}</div>
        ))}
      </div>
    </div>
  );
};

export default MyFavoriteCampsites;
