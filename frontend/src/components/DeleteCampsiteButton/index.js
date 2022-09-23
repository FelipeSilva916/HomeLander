import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteCampsiteThunk } from "../../store/campsite";

const DeleteCampsiteButton = ({ campsiteId }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(deleteCampsiteThunk(campsiteId));
    history.push("/campsites");
  };

  return (
    <button className="delete-campsite-button" onClick={handleDelete}>
      Delete
    </button>
  );
};

export default DeleteCampsiteButton;
