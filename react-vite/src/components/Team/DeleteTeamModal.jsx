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
            <h2>DOES THIS TEAM MEAN NOTHING TO YOU???</h2>
            <button onClick={handleDelete}>Confirm DOOM</button>
            <button onClick={closeModal}>Cancel</button>
        </div>
    );
};

export default DeleteTeamModal;
