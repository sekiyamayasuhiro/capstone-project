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
            <h2>DOES THIS LEAGUE MEAN NOTHING TO YOU???</h2>
            <button onClick={handleDelete}>Confirm DOOM</button>
            <button onClick={closeModal}>Cancel</button>
        </div>
    );
};

export default DeleteLeagueModal;
