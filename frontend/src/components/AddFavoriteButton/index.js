import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  deleteFavorite,
  getAllFavorites
} from "../../store/favorites";
import "./AddFavoriteButton.css";

const AddFavoriteButton = ({ campsiteId }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const currentFavorites = Object.values(
    useSelector((state) => state.favorite)
  );
  const currentFavoriteCampsiteIds = currentFavorites.map(
    (favorite) => favorite.campsiteId
  );
  const isFavorite = currentFavoriteCampsiteIds.includes(+campsiteId);
  const favorite = currentFavorites.find(
    (favorite) => favorite.campsiteId === +campsiteId
  );
  const [buttonText, setButtonText] = useState(
    isFavorite ? "Remove Favorite" : "Add Favorite"
  );

  useEffect(() => {
    dispatch(getAllFavorites());
  }, [dispatch]);
  const handleAddFavorite = async (e) => {
    e.preventDefault();
    if (!isFavorite) {
      await dispatch(
        addFavorite({
          id: campsiteId,
          userId: sessionUser?.id
        })
      );
      setButtonText("Remove Favorite");
    } else {
      dispatch(deleteFavorite(favorite?.id));
      setButtonText("Add Favorite");
    }
  };

  return (
    <button className="add-favorite-button" onClick={handleAddFavorite}>
      {buttonText}
    </button>
  );
};

export default AddFavoriteButton;
