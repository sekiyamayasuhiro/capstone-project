import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addPlayerToTeamRoster } from "../../redux/player";
import PlayerSearch from "../PlayerSearch/PlayerSearch";

const TeamDetails = () => {
    const { leagueId, teamId } = useParams();
    const [team, setTeam] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        fetch(`/api/teams/${leagueId}/teams/${teamId}`)
            .then((response) => response.json())
            .then((data) => setTeam(data));
    }, [leagueId, teamId]);

    const handlePlayerSelect = (player) => {
        console.log("Adding player to team:", teamId, "Player ID:", player.id);
        dispatch(addPlayerToTeamRoster(teamId, player.id, player.full_name));
        //??? added player.full_name
    };

    if (!team) return <h1>Loading...</h1>;

    return (
        <div className="team-details-container">
            <div className="team-details-upper">
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
            </div>
            <div className="team-details-lower">
                <h1>ROSTER HERE:</h1>
                <PlayerSearch onPlayerSelect={handlePlayerSelect} />
                <div>
                    <ul>
                        {team.roster &&
                            team.roster.map((player) => (
                                <li key={player.id}>{player.full_name}</li>
                            ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TeamDetails;
