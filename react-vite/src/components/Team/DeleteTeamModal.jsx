import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteTeam } from "../../redux/team";

const DeleteTeamModal = ({ leagueId, teamId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = () => {
        dispatch(deleteTeam(leagueId, teamId));
        closeModal();
    };

    return (
        <div className="delete-team-modal">
            <h1>DOES THIS TEAM MEAN NOTHING TO YOU???</h1>
            <div className="form-group-buttons">
                <button className="confirm-button" onClick={handleDelete}>
                    Confirm DOOM
                </button>
                <button className="cancel-button" onClick={closeModal}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default DeleteTeamModal;
