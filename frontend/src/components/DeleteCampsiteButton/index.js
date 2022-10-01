import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteCampsiteThunk } from "../../store/campsite";
import "./DeleteCampsiteButton.css";

const DeleteCampsiteButton = ({ campsiteId }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(deleteCampsiteThunk(campsiteId));
    // history.push("/campsites");
  };

  return (
    <button className="delete-campsite-button" onClick={handleDelete}>
      <i className="fa-solid fa-trash-xmark"></i>
    </button>
  );
};

export default DeleteCampsiteButton;
