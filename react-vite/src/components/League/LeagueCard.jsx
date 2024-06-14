import { useModal } from "../../context/Modal";
import EditLeagueFormModal from "./EditLeagueFormModal";
import DeleteLeagueModal from "./DeleteLeagueModal";
import "./LeagueCard.css";

const LeagueCard = ({ league }) => {
    const { setModalContent } = useModal();

    const handleEdit = () => {
        setModalContent(<EditLeagueFormModal league={league} />);
    };

    const handleDelete = () => {
        setModalContent(<DeleteLeagueModal leagueId={league.id} />);
    };

    return (
        <div className="league-card">
            <img
                src={league.league_img}
                alt={league.name}
                className="league-image"
            />
            <h3>{league.name}</h3>
            <p>{league.note}</p>
            <div className="league-details">
                <span>Scoring Type: {league.scoring_type.toUpperCase()}</span>
                <br></br>
                <span>Max Players: {league.max_players}</span>
            </div>
            <div className="edit-delete-league-section">
                <button onClick={handleEdit}>Edit League</button>
                <button onClick={handleDelete}>Delete League</button>
            </div>
        </div>
    );
};

export default LeagueCard;
