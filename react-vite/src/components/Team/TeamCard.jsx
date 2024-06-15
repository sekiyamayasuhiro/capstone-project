import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import EditTeamFormModal from "./EditTeamFormModal";
import DeleteTeamModal from "./DeleteTeamModal";
import "./TeamCard.css";

const TeamCard = ({ team, leagueId, league }) => {
    const { setModalContent } = useModal();
    const navigate = useNavigate();

    const toTeamDetails = () => {
        navigate(`/leagues/${league.id}/teams/${team.id}`);
    };

    const handleEdit = (e) => {
        e.stopPropagation();
        setModalContent(<EditTeamFormModal leagueId={leagueId} team={team} />);
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        setModalContent(
            <DeleteTeamModal leagueId={leagueId} teamId={team.id} />
        );
    };

    return (
        <div className="team-card" onClick={toTeamDetails}>
            <img src={team.team_img} alt={team.name} className="team-image" />
            <h3>{team.name}</h3>
            <p>{team.note}</p>
            <div className="team-details">
                <h3>RECORD:</h3>
                <span>W: {team.wins} </span>
                <span>L: {team.losses} </span>
                <span>T: {team.ties}</span>
            </div>
            <div className="edit-delete-league-section">
                <button onClick={handleEdit}>Edit Team</button>
                <button onClick={handleDelete}>Delete Team</button>
            </div>
        </div>
    );
};

export default TeamCard;
