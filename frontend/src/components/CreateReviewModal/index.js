import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import CreateReviewForm from "./CreateReviewModal";
import "../ReviewDetails/ReviewDetails.css";

function CreateReviewModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="review-button" onClick={() => setShowModal(true)}>
        Create Review
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateReviewForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default CreateReviewModal;
