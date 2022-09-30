import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCampsiteImage, getImages } from "../../store/campsiteImages";

const AddImg = ({ campsiteId }) => {
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const allCampsites = Object.values(useSelector((state) => state.campsites));
};

export default AddImg;
