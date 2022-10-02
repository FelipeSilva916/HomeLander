import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import AddCampsiteImageForm from "./AddCampsiteImageForm";
import "../CampsiteImages/CampsiteImages.css";

function AddCampsiteImageModal({ campsiteId }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="add-image-button" onClick={() => setShowModal(true)}>
        Add Image
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddCampsiteImageForm
            campsiteId={campsiteId}
            setShowModal={setShowModal}
          />
        </Modal>
      )}
    </>
  );
}
export default AddCampsiteImageModal;
