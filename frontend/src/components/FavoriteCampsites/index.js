import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import MyFavoriteCampsites from "./MyFavorites";

function FavoriteCampsitesModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Favorites</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <MyFavoriteCampsites />
        </Modal>
      )}
    </>
  );
}

export default FavoriteCampsitesModal;
