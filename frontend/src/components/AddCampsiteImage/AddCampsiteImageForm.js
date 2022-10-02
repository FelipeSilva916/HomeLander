import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addCampsiteImage, getImages } from "../../store/campsiteImages";
import "./AddCampsiteImage.css";

const AddCampsiteImageForm = ({ campsiteId, setShowModal }) => {
  const [imageUrl, setImage] = useState("");
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  campsiteId = parseInt(campsiteId);

  useEffect(() => {
    dispatch(getImages(campsiteId));
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      addCampsiteImage({
        imageUrl,
        campsiteId: +campsiteId,
        userId: sessionUser?.id
      })
    );
    history.push(`/campsites/${campsiteId}`);
    setShowModal(false);
  };

  return (
    <div className="add-image-form">
      <h2>Add an image:</h2>
      <form className="add-image" onSubmit={handleSubmit}>
        <input
          type="text"
          value={imageUrl}
          required
          onChange={(e) => setImage(e.target.value)}
        />
        <button type="submit">Add Image</button>
      </form>
    </div>
  );
};

export default AddCampsiteImageForm;
