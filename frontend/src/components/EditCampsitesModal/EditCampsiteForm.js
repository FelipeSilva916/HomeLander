import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { editCampsite, getOneCampsite } from "../../store/campsite";

const EditCampsiteForm = ({ setShowModal }) => {
  const { campsiteId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const campsite = useSelector((state) => state.campsite[`${campsiteId}`]);
  const [description, setDescription] = useState(campsite?.description);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(getOneCampsite(campsiteId));
  }, [dispatch, campsiteId]);

  useEffect(() => {
    if (campsite) {
      setDescription(campsite.description);
    }
  }, [campsite]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    await dispatch(
      editCampsite({
        id: campsiteId,
        description
      })
    ).then(() => {
      setShowModal(false);
      history.push(`/campsites/${campsiteId}`);
    });
  };

  return (
    <div className="edit-form-container">
      <h2 className="edit-title">Change your description:</h2>
      <form onSubmit={handleSubmit} className="edit-form">
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label className="edit-form-label">
          Update your description?
          <textarea
            className="edit-form-label-input"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <button className="edit-form-submit" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditCampsiteForm;
