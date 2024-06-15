import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TeamDetails = () => {
    const { leagueId, teamId } = useParams();
    const [team, setTeam] = useState(null);

    useEffect(() => {
        fetch(`/api/teams/${leagueId}/teams/${teamId}`)
            .then((response) => response.json())
            .then((data) => setTeam(data));
    }, [leagueId, teamId]);

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
            </div>
        </div>
    );
};

export default TeamDetails;
