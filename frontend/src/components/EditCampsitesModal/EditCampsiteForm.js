import React, { useEffect, useState } from "react";
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
  const [description, setDescription] = useState(null);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    // dispatch(getAllCampsites());
    dispatch(getOneCampsite(campsiteId));
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    await dispatch(
      editCampsite({
        id: campsiteId,
        description
      })
    )
      .then(() => {
        history.push(`/campsites/${campsiteId}`);
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <div className="edit-form">
      <h2>Change your description:</h2>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Description
          <textarea
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditCampsiteForm;
