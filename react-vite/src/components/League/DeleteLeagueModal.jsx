import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteLeague } from "../../redux/league";

const DeleteLeagueModal = ({ leagueId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = () => {
        dispatch(deleteLeague(leagueId));
        closeModal();
    };

    return (
        <div className="delete-league-modal">
            <h1>DOES THIS LEAGUE MEAN NOTHING TO YOU???</h1>
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

export default DeleteLeagueModal;
