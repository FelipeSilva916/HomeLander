import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImages } from "../../store/campsiteImages";
import "./CampsiteImages.css";
import DeleteImageButton from "../DeleteImageButton";

const CampsiteImages = ({ campsiteId }) => {
  const dispatch = useDispatch();
  const images = Object.values(useSelector((state) => state.images));
  const campsite = useSelector((state) => state.campsite[campsiteId]);
  const user = useSelector((state) => state.session.user);
  const allImages = images?.filter(
    (image) => image?.campsiteId === +campsiteId
  );
  const [index, setIndex] = useState(0);
  const [showRight, setShowRight] = useState(true);
  const [showLeft, setShowLeft] = useState(false);
  const imageId = allImages[index - 1]?.id;

  const [showDelete, setShowDelete] = useState(false);
  const resArray = [{ imageUrl: campsite?.previewImage }, ...allImages];

  useEffect(() => {
    if (index === resArray.length - 1) {
      setShowRight(false);
    } else {
      setShowRight(true);
    }

    if (index > 0) {
      setShowLeft(true);
    } else {
      setShowLeft(false);
    }
  }, [index, imageId, images, resArray.length]);

  const handleSwipeRight = () => {
    if (index < resArray.length) {
      console.log(index, "index");
      setIndex(index + 1);
    }
  };

  const handleSwipeLeft = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  useEffect(() => {
    if (user.id === resArray[index]?.userId) {
      setShowDelete(true);
    } else {
      setShowDelete(false);
    }
  }, [index, images]);

  useEffect(() => {
    dispatch(getImages(+campsiteId));
  }, [dispatch, campsiteId, campsite, imageId, resArray.length]);

  return (
    <>
      <div className="image-container">
        <div className="image">
          <img src={resArray[index]?.imageUrl} alt="campsite" />
        </div>
      </div>
      <div className="image-buttons-container">
        <div className="image-buttons-left">
          {showLeft && (
            <button onClick={handleSwipeLeft}>
              <i className="fa-solid fa-circle-left"></i>
            </button>
          )}
        </div>
        <div className="images-control-button">
          {showDelete && (
            <DeleteImageButton
              setIndex={setIndex}
              campsiteId={+campsiteId}
              imageId={imageId}
            />
          )}
        </div>
        <div className="image-buttons-right">
          {showRight && (
            <button onClick={handleSwipeRight}>
              <i className="fa-sharp fa-solid fa-circle-right"></i>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default CampsiteImages;
//
