import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImages } from "../../store/campsiteImages";
import "./CampsiteImages.css";

const CampsiteImages = ({ campsiteId }) => {
  const dispatch = useDispatch();
  const images = Object.values(useSelector((state) => state.images));
  const allImages = images.filter((image) => image?.campsiteId === +campsiteId);
  console.log(allImages);

  useEffect(() => {
    dispatch(getImages(+campsiteId));
  }, [dispatch, campsiteId]);

  return (
    <div className="campsite-images">
      {allImages.map((image, i) => (
        <div className="campsite-images-box" key={i}>
          <img
            className="campsite-images-image"
            src={image?.imageUrl}
            alt={image?.imageUrl}
          />
        </div>
      ))}
    </div>
  );
};

export default CampsiteImages;
