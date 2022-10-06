import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { createCampsite } from "../../store/campsite";
import { useHistory } from "react-router-dom";
import exifr from "exifr";

import "./CreateCampsite.css";

const CreateCampsiteModal = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [lat, setLat] = useState("");
  const [lgn, setLgn] = useState("");
  const [errors, setErrors] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [buttonText, setButtonText] = useState("Create Campsite");

  const user = useSelector((state) => state.session.user);

  const reset = () => {
    setName("");
    setDescription("");
    setPreviewImage("");
    setLat("");
    setLgn("");
    setErrors([]);
    setDisabled(false);
    setButtonText("Create Campsite");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);
    setButtonText(<i className="fa-solid fa-spinner fa-spin-pulse"></i>);

    const payload = {
      name,
      description,
      previewImage,
      latitude: lat,
      longitude: lgn,
      userId: user.id
    };
    await dispatch(createCampsite(payload))
      .then(() => {
        setShowModal(false);
        history.push("/campsites");
        reset();
      })
      .catch(async (res) => {
        const data = await res.json();
        console.log(data.errors);
        if (data && data.errors) setErrors(data.errors);
      });
  };

  const updateFile = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(file);
      try {
        let { latitude, longitude } = await exifr.gps(previewImage);

        if (latitude && longitude) {
          setLat(latitude.toFixed(4));
          setLgn(longitude.toFixed(4));
        }
      } catch (error) {
        // console.log(error);
      }
    }
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
              {errors?.map((error, idx) => (
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
                required
                className="create-post-input-image"
                type="file"
                onChange={updateFile}
              />
            </div>
            <div className="create-post-input-wrapper">
              <label htmlFor="latitude">Latitude:</label>
              <input
                className="create-post-input"
                placeholder="Latitude"
                type="text"
                name="latitude"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
              />
            </div>
            <div className="create-post-input-wrapper">
              <label htmlFor="longitude">Longitude:</label>
              <input
                className="create-post-input"
                placeholder="Longitude"
                type="text"
                name="longitude"
                value={lgn}
                onChange={(e) => setLgn(e.target.value)}
              />
            </div>
            <button className="create-submit" type="submit" disabled={disabled}>
              {buttonText}
            </button>
          </form>
        </Modal>
      )}
    </>
  );
};

export default CreateCampsiteModal;
