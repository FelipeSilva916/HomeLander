import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
  editCampsite,
  getAllCampsites,
  getOneCampsite
} from "../../store/campsite";

const EditCampsiteForm = ({ setShowModal }) => {
  const { campsiteId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const campsite = useSelector((state) => state.campsite[`${campsiteId}`]);
  const [description, setDescription] = useState(campsite.description);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {};
};
