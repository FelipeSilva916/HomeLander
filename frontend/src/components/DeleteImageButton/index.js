const { useDispatch } = require("react-redux");
const { useHistory } = require("react-router-dom");
const { deleteCampsiteImage } = require("../../store/campsiteImages");

const DeleteImageButton = ({ imageId, campsiteId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  campsiteId = +campsiteId;

  const handleDelete = async (e) => {
    // e.preventDefault();
    await dispatch(deleteCampsiteImage(imageId, campsiteId));
    history.push(`/campsites/${campsiteId}`);
  };

  return (
    <button className="delete-image-button" onClick={handleDelete}>
      Delete
    </button>
  );
};

export default DeleteImageButton;
