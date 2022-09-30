import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImages } from "../../store/campsiteImages";
import "./CampsiteImages.css";

const CampsiteImages = ({ campsiteId }) => {
  const dispatch = useDispatch();
  const images = Object.values(useSelector((state) => state.images));
  const allImages = images.filter((image) => image?.campsiteId === +campsiteId);
  console.log(allImages);
  const [currentImage, setCurrentImage] = useState(allImages[0]);
  console.log(currentImage);

  const handleSwipeRight = () => {
    const currentIndex = allImages.indexOf(currentImage);
    const nextImage = allImages[currentIndex + 1];
    if (nextImage) {
      setCurrentImage(nextImage);
    }
  };

  const handleSwipeLeft = () => {
    const currentIndex = allImages.indexOf(currentImage);
    const prevImage = allImages[currentIndex - 1];
    if (prevImage) {
      setCurrentImage(prevImage);
    }
  };

  useEffect(() => {
    dispatch(getImages(+campsiteId));
  }, [dispatch, campsiteId]);

  return (
    <>
      <h1>Campsite Gallery</h1>
      <div className="image-container">
        <div className="image">
          <img src={currentImage?.imageUrl} alt="campsite" />
        </div>
        <div className="image-buttons">
          <button onClick={handleSwipeLeft}>{"<"}</button>
          <button onClick={handleSwipeRight}>{">"}</button>
        </div>
      </div>
    </>
  );
};

export default CampsiteImages;
