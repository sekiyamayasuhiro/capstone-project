import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { removePlayer } from "../../redux/roster";

const DeletePlayerModal = ({ teamId, playerId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = () => {
        dispatch(removePlayer(teamId, playerId));
        closeModal();
    };

    return (
        <div className="delete-player-modal">
            <h1>Are you sure you want to remove this player?</h1>
            <div className="form-group-buttons">
                <button className="confirm-button" onClick={handleDelete}>
                    Confirm
                </button>
                <button className="cancel-button" onClick={closeModal}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default DeletePlayerModal;
