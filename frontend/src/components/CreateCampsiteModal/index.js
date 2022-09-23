import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { createCampsite } from "../../store/campsite";

const CreateCampsiteModal = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [previewImage, setPreviewImage] = useState("");
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
    const newCampsite = await dispatch(createCampsite(payload));
    if (newCampsite) {
      setShowModal(false);
    }
    reset();
    setShowModal(false);
  };

  return (
    <>
      <button onClick={() => setShowModal(true)}>Create Campsite</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <input
                type="text"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="previewImage">Preview Image</label>
              <input
                type="text"
                name="previewImage"
                value={previewImage}
                onChange={(e) => setPreviewImage(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="latitude">Latitude</label>
              <input
                type="text"
                name="latitude"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="longitude">Longitude</label>
              <input
                type="text"
                name="longitude"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
              />
            </div>
            <button type="submit">Create Campsite</button>
          </form>
        </Modal>
      )}
    </>
  );
};

export default CreateCampsiteModal;