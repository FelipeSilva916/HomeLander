import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import MyFavoriteCampsites from "./MyFavorites";

function FavoriteCampsitesModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="favorite-button-navbar"
        onClick={() => setShowModal(true)}
      >
        {window.innerWidth > 768 ? (
          "Explore"
        ) : (
          <i className="fa-solid fa-heart"></i>
        )}
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <MyFavoriteCampsites setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default FavoriteCampsitesModal;
