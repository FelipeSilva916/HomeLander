import "../CampsiteImages/CampsiteImages.css";
const { useDispatch } = require("react-redux");
const { deleteCampsiteImage } = require("../../store/campsiteImages");

const DeleteImageButton = ({ imageId, campsiteId, setIndex }) => {
  const dispatch = useDispatch();
  campsiteId = +campsiteId;

  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(deleteCampsiteImage(imageId, campsiteId));
    setIndex(0);
  };

  return (
    <button className="delete-image-button" onClick={handleDelete}>
      <i className="fa-solid fa-trash-plus"></i>
    </button>
  );
};

export default DeleteImageButton;
