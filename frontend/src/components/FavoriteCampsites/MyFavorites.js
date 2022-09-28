import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllFavorites, deleteFavorite } from "../../store/favorites";
import { getAllCampsites } from "../../store/campsite";
import "./favoriteCampsite.css";

const MyFavoriteCampsites = () => {
  const dispatch = useDispatch();
  const favorites = Object.values(useSelector((state) => state.favorite));
  const [loaded, setLoaded] = useState(false);
  const campsiteState = useSelector((state) => state.campsite);
  const sessionUser = useSelector((state) => state.session.user);
  const favoriteId = favorites.filter(
    (favorite) => favorite?.userId == sessionUser?.id
  );

  useEffect(() => {
    dispatch(getAllFavorites()).then(() => setLoaded(true));
    dispatch(getAllCampsites());
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  let handleDelete;
  favoriteId.map((favorite) => {
    handleDelete = (e) => {
      e.preventDefault();
      dispatch(deleteFavorite(favorite?.id));
    };
  });

  const favCampsiteName = favorites.map((favorite) => {
    return campsiteState[favorite.campsiteId].name;
  });

  const favCampsiteImg = favorites.map((favorite) => {
    return campsiteState[favorite.campsiteId].previewImage;
  });

  return (
    <div className="favorite-modal-content">
      <h3>My Favorites</h3>
      <div className="favorite-site-card">
        {favCampsiteName?.map((favorite, i) => (
          <div className="favorite-site-card-item" key={i}>
            {favCampsiteImg && (
              <img
                className="favorite-campsite-preview"
                src={favCampsiteImg[i]}
                alt="campsite"
              />
            )}
            {favorite}
            <button onClick={handleDelete}>
              <i className="fa-solid fa-trash-can" />
            </button>
          </div>
        ))}
      </div>
      <div></div>
    </div>
  );
};

export default MyFavoriteCampsites;
