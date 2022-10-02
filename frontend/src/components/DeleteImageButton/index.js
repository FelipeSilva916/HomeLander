import "../CampsiteImages/CampsiteImages.css";
const { useDispatch } = require("react-redux");
const { useHistory } = require("react-router-dom");
const { deleteCampsiteImage } = require("../../store/campsiteImages");

const DeleteImageButton = ({ imageId, campsiteId, setIndex }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  campsiteId = +campsiteId;

  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(deleteCampsiteImage(imageId, campsiteId));
    setIndex(0);
    // history.push(`/campsites/${campsiteId}`);
  };

  return (
    <button className="delete-image-button" onClick={handleDelete}>
      <i className="fa-solid fa-trash-plus"></i>Delete
    </button>
  );
};

export default DeleteImageButton;
