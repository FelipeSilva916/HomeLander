import { useDispatch, useSelector } from "react-redux";
import { addFavorite } from "../../store/favorites";

const AddFavoriteButton = ({ campsiteId }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const handleAddFavorite = async (e) => {
    e.preventDefault();
    await dispatch(
      addFavorite({
        id: campsiteId,
        userId: sessionUser.id
      })
    );
  };
  console.log(campsiteId);

  return (
    <button className="add-favorite-button" onClick={handleAddFavorite}>
      Add to Favorites
    </button>
  );
};

export default AddFavoriteButton;
