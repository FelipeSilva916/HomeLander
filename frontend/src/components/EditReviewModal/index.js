import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditReviewForm from "./EditReviewForm";

function EditReviewModal({ campsiteId }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit Review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditReviewForm campsiteId={campsiteId} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default EditReviewModal;
