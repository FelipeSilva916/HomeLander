import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImages } from "../../store/campsiteImages";
import "./CampsiteImages.css";
import AddCampsiteImageModal from "../AddCampsiteImage";
import DeleteImageButton from "../DeleteImageButton";

const CampsiteImages = ({ campsiteId }) => {
  const dispatch = useDispatch();
  const images = Object.values(useSelector((state) => state?.images));
  const campsite = useSelector((state) => state.campsite[campsiteId]);
  const allImages = images?.filter(
    (image) => image?.campsiteId === +campsiteId
  );
  const [index, setIndex] = useState(0);
  const [showRight, setShowRight] = useState(true);
  const [showLeft, setShowLeft] = useState(false);
  const imageId = allImages[index]?.id;
  console.log("imageId", imageId);

  useEffect(() => {
    if (index === allImages.length - 1) {
      setShowRight(false);
    } else {
      setShowRight(true);
    }

    if (index > 0) {
      setShowLeft(true);
    } else {
      setShowLeft(false);
    }
  }, [index, imageId, images]);

  const handleSwipeRight = () => {
    if (index < allImages.length - 1) {
      setIndex(index + 1);
    }
  };

  const handleSwipeLeft = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  useEffect(() => {
    dispatch(getImages(+campsiteId));
  }, [dispatch, campsiteId, campsite, imageId]);

  return (
    <>
      <h2>Campsite Gallery</h2>
      <div className="image-container">
        <div className="image">
          <div className="image-buttons-left">
            {showLeft && (
              <button onClick={handleSwipeLeft}>
                <i className="fa-solid fa-circle-left"></i>
              </button>
            )}
          </div>
          <img src={allImages[index]?.imageUrl} alt="campsite" />
          <div className="image-buttons-right">
            {showRight && (
              <button onClick={handleSwipeRight}>
                <i className="fa-sharp fa-solid fa-circle-right"></i>
              </button>
            )}
          </div>
        </div>
      </div>

      <AddCampsiteImageModal campsiteId={campsiteId} />
      <DeleteImageButton
        setIndex={setIndex}
        campsiteId={+campsiteId}
        imageId={imageId}
      />
    </>
  );
};

export default CampsiteImages;
//
