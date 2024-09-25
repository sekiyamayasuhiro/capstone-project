import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeamDetails } from "../../redux/team";
import { fetchRoster, addPlayer } from "../../redux/roster";
import { useModal } from "../../context/Modal";
import PlayerSearch from "./PlayerSearch";
import DeletePlayerModal from "./DeletePlayerModal";
import "./TeamDetails.css";

const TeamDetails = () => {
    const { leagueId, teamId } = useParams();
    const team = useSelector((state) =>
        state.teamState.teams.find((t) => t.id === parseInt(teamId))
    );
    const roster = useSelector((state) => state.rosterState.roster);
    const error = useSelector((state) => state.rosterState.error);
    const dispatch = useDispatch();
    const { setModalContent } = useModal();
    const navigate = useNavigate();

    // force rerender
    // const [forceRerender, setForceRerender] = useState(false);

    useEffect(() => {
        dispatch(fetchTeamDetails(leagueId, teamId));
        dispatch(fetchRoster(teamId));
        // }, [dispatch, leagueId, teamId, forceRerender]);
    }, [dispatch, leagueId, teamId]);

    const handlePlayerSelect = (player) => {
        console.log("Adding player to team:", teamId, "Player ID:", player.id);
        dispatch(
            addPlayer(teamId, { id: player.id, full_name: player.full_name })
        );
        // ).then(() => {
        //     // force rerender
        //     setForceRerender((prev) => !prev);
        // });
    };

    const handlePlayerClick = (nbaPlayerId) => {
        navigate(`/players/${nbaPlayerId}`);
    };

    const handleDelete = (e, playerId) => {
        e.stopPropagation();
        setModalContent(
            <DeletePlayerModal teamId={teamId} playerId={playerId} />
        );
    };

    useEffect(() => {
        console.log("Roster updated:", roster);
    }, [roster]);

    if (!team) return <h1>Loading...</h1>;

    return (
        <div className="team-details-container">
            <section className="team-details-upper">
                <img
                    src={team.team_img}
                    alt={team.name}
                    className="team-image"
                />
                <div className="team-details-info">
                    <h1>{team.name}</h1>
                    <p>{team.note}</p>
                    <p>Wins: {team.wins}</p>
                    <p>Losses: {team.losses}</p>
                    <p>Ties: {team.ties}</p>
                </div>
            </section>
            <section className="team-details-lower">
                <h1>ROSTER HERE:</h1>
                {error && <p className="error-message">{error}</p>}
                <PlayerSearch onPlayerSelect={handlePlayerSelect} />
                <ul className="roster-list">
                    {roster.map((player) => (
                        <li
                            key={player.nba_player_id}
                            onClick={() =>
                                handlePlayerClick(player.nba_player_id)
                            }
                            className="roster-player"
                        >
                            {player.full_name}
                            <button
                                className="delete-player-button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(e, player.id);
                                }}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default TeamDetails;
