import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditCampsiteForm from "./EditCampsiteForm";
import "./EditCampsite.css";

function EditCampsiteModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="update-campsite-button"
        onClick={() => setShowModal(true)}
      >
        Update Description
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditCampsiteForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default EditCampsiteModal;
