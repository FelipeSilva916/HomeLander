import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addCampsiteImage, getImages } from "../../store/campsiteImages";

const AddCampsiteImageForm = ({ campsiteId, setShowModal }) => {
  const [imageUrl, setImage] = useState("");
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  campsiteId = parseInt(campsiteId);
  // const allCampsites = Object.values(useSelector((state) => state.campsite));
  // const campsite = allCampsites.find(
  //   (campsite) => campsite?.id === +campsiteId
  // );
  console.log("campsiteId", campsiteId);

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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImage(e.target.value)}
        />
        <button type="submit">Add Image</button>
      </form>
    </div>
  );
};

export default AddCampsiteImageForm;
