import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditCampsiteForm from "./EditCampsiteForm";

function EditCampsiteModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit Campsite</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditCampsiteForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default EditCampsiteModal;
