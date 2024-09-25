import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { fetchTeams } from "../../redux/team";
import CreateTeamFormModal from "./CreateTeamFormModal";
import TeamCard from "./TeamCard";

const TeamIndex = ({ leagueId, maxPlayers, league }) => {
    const dispatch = useDispatch();
    const { setModalContent } = useModal();

    const teams = useSelector((state) => state.teamState.teams);

    useEffect(() => {
        dispatch(fetchTeams(leagueId));
    }, [dispatch, leagueId]);

    const handleCreateNewTeam = () => {
        if (teams.length < maxPlayers) {
            setModalContent(<CreateTeamFormModal leagueId={leagueId} />);
        }
    };

    return (
        <>
            <h2 className="team-section-title">TEAMS IN THIS LEAGUE:</h2>
            <div className="add-new-team-button-container">
                {teams.length < maxPlayers && (
                    <button
                        onClick={handleCreateNewTeam}
                        className="create-team-button"
                    >
                        Add New Team
                    </button>
                )}
            </div>
            <div className="team-cards-container">
                {teams.map((team) => (
                    <TeamCard
                        key={team.id}
                        team={team}
                        leagueId={leagueId}
                        league={league}
                    />
                ))}
            </div>
        </>
    );
};

export default TeamIndex;
