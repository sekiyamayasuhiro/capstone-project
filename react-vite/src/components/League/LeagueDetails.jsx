import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const LeagueDetails = () => {
    const { leagueId } = useParams();
    const [league, setLeague] = useState(null);

    useEffect(() => {
        fetch(`/api/leagues/${leagueId}`)
            .then((response) => response.json())
            .then((data) => setLeague(data));
    }, [leagueId]);

    if (!league) return <h1>Loading...</h1>;

    return (
        <div className="league-details-container">
            <div className="league-details-upper">
                <img
                    src={league.league_img}
                    alt={league.name}
                    className="league-image"
                />
                <div className="league-details-info">
                    <h1>{league.name}</h1>
                    <p>{league.note}</p>
                    <p>{league.scoring_type.toUpperCase()}</p>
                    <p>Max Players: {league.max_players}</p>
                </div>
            </div>
            <div className="league-details-lower">
                <h1>TEAMS GO HERE:</h1>
            </div>
        </div>
    );
};

export default LeagueDetails;
