import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { createCampsite } from "../../store/campsite";
import { useHistory } from "react-router-dom";
import "./CreateCampsite.css";

const CreateCampsiteModal = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [previewImage, setPreviewImage] = useState(
    "https://homelander.s3.us-west-1.amazonaws.com/homeLanderLogo.png"
  );
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [errors, setErrors] = useState([]);

  const user = useSelector((state) => state.session.user);

  const reset = () => {
    setName("");
    setDescription("");
    setPreviewImage("");
    setLatitude("");
    setLongitude("");
    setErrors([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name,
      description,
      previewImage,
      latitude,
      longitude,
      userId: user.id
    };
    await dispatch(createCampsite(payload))
      .then(() => {
        setShowModal(false);
        reset();
        history.push("/campsites");
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    reset();
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="create-campsite-button"
      >
        <i className="fa-solid fa-location-plus fa-flip"></i>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <form onSubmit={handleSubmit} className="create-campsite-form">
            <h2>Create A Campsite⛺️</h2>
            <ul className="error-list">
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
            <div className="create-post-input-wrapper">
              <label htmlFor="name">Name:</label>
              <input
                className="create-post-input"
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="create-post-input-wrapper">
              <label htmlFor="description">Description:</label>
              <input
                className="create-post-input"
                type="text"
                name="description"
                value={description}
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="create-post-input-wrapper">
              <label htmlFor="previewImage">Preview Image:</label>
              <input
                className="create-post-input"
                type="text"
                placeholder="https://homelander.s3.us-west-1.amazonaws.com/homeLanderLogo.png"
                name="previewImage"
                value={previewImage}
                onChange={(e) => setPreviewImage(e.target.value)}
              />
            </div>
            <div className="create-post-input-wrapper">
              <label htmlFor="latitude">Latitude:</label>
              <input
                className="create-post-input"
                placeholder="Latitude"
                type="text"
                name="latitude"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
              />
            </div>
            <div className="create-post-input-wrapper">
              <label htmlFor="longitude">Longitude:</label>
              <input
                className="create-post-input"
                placeholder="Longitude"
                type="text"
                name="longitude"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
              />
            </div>
            <button className="create-submit" type="submit">
              Create Campsite
            </button>
          </form>
        </Modal>
      )}
    </>
  );
};

export default CreateCampsiteModal;
