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
            <h2>Are you sure you want to remove this player?</h2>
            <button onClick={handleDelete}>Confirm</button>
            <button onClick={closeModal}>Cancel</button>
        </div>
    );
};

export default DeletePlayerModal;
