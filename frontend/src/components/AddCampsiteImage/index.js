import { addCampsiteImage } from "../../store/campsiteImages";
import { useDispatch } from "react-redux";
import { useState } from "react";

const AddImg = ({ campsiteId }) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    dispatch(addCampsiteImage(campsiteId, formData));
  };
};

export default AddImg;
