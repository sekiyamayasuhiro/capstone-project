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
        <div>
            <h2>Teams:</h2>
            {teams.map((team) => (
                <TeamCard
                    key={team.id}
                    team={team}
                    leagueId={leagueId}
                    league={league}
                />
            ))}
            {teams.length < maxPlayers && (
                <button onClick={handleCreateNewTeam}>Add New Team</button>
            )}
        </div>
    );
};

export default TeamIndex;
