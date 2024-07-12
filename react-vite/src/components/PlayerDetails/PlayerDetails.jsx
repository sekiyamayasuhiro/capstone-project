import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PlayerDetails = () => {
    const { playerId } = useParams();
    const [playerData, setPlayerData] = useState(null);
    const [careerStats, setCareerStats] = useState(null);
    const [seasonStats, setSeasonStats] = useState(null);
    const [season2023Stats, setSeason2023Stats] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlayerData = async () => {
            try {
                const response = await fetch(`/api/players/${playerId}`);
                const data = await response.json();
                setPlayerData(data);
            } catch (err) {
                setError("Failed to fetch player data.");
            }
        };

        const fetchCareerStats = async () => {
            try {
                const response = await fetch(
                    `/api/players/stats/career/${playerId}`
                );
                const data = await response.json();
                setCareerStats(data);
            } catch (err) {
                setError("Failed to fetch career stats.");
            }
        };

        const fetchSeasonStats = async () => {
            try {
                const response = await fetch(
                    `/api/players/stats/season/${playerId}`
                );
                const data = await response.json();
                setSeasonStats(data);
            } catch (err) {
                setError("Failed to fetch season stats.");
            }
        };

        const fetchSeason2023Stats = async () => {
            try {
                const response = await fetch(
                    `/api/players/stats/2023-24/${playerId}`
                );
                const data = await response.json();
                setSeason2023Stats(data);
            } catch (err) {
                setError("Failed to fetch 2023-24 season stats.");
            }
        };

        fetchPlayerData();
        fetchCareerStats();
        fetchSeasonStats();
        fetchSeason2023Stats();
    }, [playerId]);

    if (error) return <div>{error}</div>;

    return (
        <div className="player-details-container">
            <section className="player-details-upper">
                <h1>Player Details</h1>
                {playerData && (
                    <h2>
                        {playerData.first_name} {playerData.last_name}
                    </h2>
                )}
            </section>
            <section className="player-stats-section">
                <h2>2023-24 Season Stats</h2>
                {season2023Stats && (
                    <div>
                        <p>PPG: {season2023Stats.PPG}</p>
                        <p>RPG: {season2023Stats.RPG}</p>
                        <p>APG: {season2023Stats.APG}</p>
                        <p>SPG: {season2023Stats.SPG}</p>
                        <p>BPG: {season2023Stats.BPG}</p>
                    </div>
                )}
            </section>
            <section className="player-stats-section">
                <h2>Season Stats</h2>
                {seasonStats &&
                    seasonStats.map((season, index) => (
                        <div key={index}>
                            <h3>{season.SEASON_ID}</h3>
                            <p>PPG: {season.PPG}</p>
                            <p>RPG: {season.RPG}</p>
                            <p>APG: {season.APG}</p>
                            <p>SPG: {season.SPG}</p>
                            <p>BPG: {season.BPG}</p>
                        </div>
                    ))}
            </section>
            <section className="player-stats-section">
                <h2>Career Stats</h2>
                {careerStats && (
                    <div>
                        <p>PPG: {careerStats.PPG}</p>
                        <p>RPG: {careerStats.RPG}</p>
                        <p>APG: {careerStats.APG}</p>
                        <p>SPG: {careerStats.SPG}</p>
                        <p>BPG: {careerStats.BPG}</p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default PlayerDetails;
