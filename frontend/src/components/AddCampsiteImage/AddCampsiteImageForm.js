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
  }, [dispatch, campsiteId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      imageUrl,
      campsiteId,
      userId: sessionUser.id
    };
    const newCampsiteImage = await dispatch(addCampsiteImage(payload));
    if (newCampsiteImage) {
      setShowModal(false);
    }

    history.push(`/campsites/${campsiteId}`);
    setShowModal(false);
  };

  const updateImage = (e) => {
    const imageFile = e.target.files[0];
    setImage(imageFile);
  };

  return (
    <div className="add-image-form">
      <h2>Add an image:</h2>
      <form className="add-image" onSubmit={handleSubmit}>
        <input type="file" required onChange={(e) => updateImage(e)} />
        <button type="submit">Add Image</button>
      </form>
    </div>
  );
};

export default AddCampsiteImageForm;
