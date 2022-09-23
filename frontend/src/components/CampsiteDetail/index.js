import { getOneCampsite } from "../../store/campsite";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./campsiteDetail.css";
import EditCampsiteForm from "../EditCampsitesModal/EditCampsiteForm";
import EditCampsiteModal from "../EditCampsitesModal";
import DeleteCampsiteButton from "../DeleteCampsiteButton";

const CampsiteDetail = ({ setShowModal }) => {
  const { campsiteId } = useParams();
  const dispatch = useDispatch();
  const campsite = useSelector((state) => state.campsite[campsiteId]);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getOneCampsite(campsiteId));
  }, [dispatch, campsiteId]);

  let userManipulationBtn;
  if (campsite) {
    if (campsite.userId === user.id) {
      userManipulationBtn = (
        <div>
          <EditCampsiteModal />
          <DeleteCampsiteButton campsiteId={campsiteId} />
        </div>
      );
    }
  }

  return (
    <div className="campsite-detail-wrapper">
      <div className="campsite-detail-container">
        <div className="campsite-detail-image-container">
          <img
            src={campsite?.previewImage}
            alt={campsite?.name}
            className="campsite-detail-preview-image"
          />
        </div>
        <div className="campsite-detail-info-container">
          <h1>{campsite?.name}</h1>
          <p>Uploaded By: {campsite?.userId} </p>
          <p>{campsite?.averageRating}</p>
          <p>{campsite?.description}</p>
          <p>{campsite?.latitude}</p>
          <p>{campsite?.longitude}</p>
        </div>
        <div>{userManipulationBtn}</div>
        <div className="campsite-detail-info">Footer</div>
      </div>
    </div>
  );
};

export default CampsiteDetail;
