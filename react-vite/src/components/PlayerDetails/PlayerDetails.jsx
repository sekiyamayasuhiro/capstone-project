import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PlayerDetails = () => {
    const { playerId } = useParams();
    const [playerData, setPlayerData] = useState(null);
    const [seasonCurrentStats, setSeasonCurrentStats] = useState(null);
    const [seasonStats, setSeasonStats] = useState(null);
    const [careerStats, setCareerStats] = useState(null);
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

        const fetchSeasonCurrentStats = async () => {
            try {
                const response = await fetch(
                    `/api/players/stats/current/${playerId}`
                );
                const data = await response.json();
                setSeasonCurrentStats(data);
            } catch (err) {
                setError("Failed to fetch current season stats.");
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

        fetchPlayerData();
        fetchSeasonCurrentStats();
        fetchSeasonStats();
        fetchCareerStats();
    }, [playerId]);

    if (error) return <div>{error}</div>;

    const headerMap2Change = {
        GP: "GP",
        MPG: "MPG",
        FGM: "FGM",
        FGA: "FGA",
        FG_PCT: "FG%",
        FG3M: "FG3M",
        FG3A: "FG3A",
        FG3_PCT: "3P%",
        FTM: "FTM",
        FTA: "FTA",
        FT_PCT: "FT%",
        PTS: "PTS",
        PPG: "PPG",
        REB: "REB",
        RPG: "RPG",
        AST: "AST",
        APG: "APG",
        STL: "STL",
        SPG: "SPG",
        BLK: "BLK",
        BPG: "BPG",
        TOV: "TOV",
        TPG: "TPG",
    };

    const dataTable = (data, headers) => (
        <table>
            <thead>
                <tr>
                    {headers.map((header, index) => (
                        <th key={index}>{headerMap2Change[header]}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                <tr>
                    {headers.map((header, index) => (
                        <td key={index}>{data[header]}</td>
                    ))}
                </tr>
            </tbody>
        </table>
    );

    const statTableHeaders = [
        "GP",
        "MPG",
        "FGM",
        "FGA",
        "FG_PCT",
        "FG3M",
        "FG3A",
        "FG3_PCT",
        "FTM",
        "FTA",
        "FT_PCT",
        "PTS",
        "PPG",
        "REB",
        "RPG",
        "AST",
        "APG",
        "STL",
        "SPG",
        "BLK",
        "BPG",
        "TOV",
        "TPG",
    ];

    return (
        <div className="player-details-container">
            <section className="player-details-upper">
                {/* <h1>Player Details</h1> */}
                {playerData && (
                    <div>
                        <h1>{playerData.DISPLAY_FIRST_LAST}</h1>
                        <p>
                            Height: {playerData.HEIGHT} {"|"} Weight:{" "}
                            {playerData.WEIGHT}
                        </p>
                        <p>
                            Jersey #: {playerData.JERSEY} {"|"} Position:{" "}
                            {playerData.POSITION}
                        </p>
                        <p>
                            Team: {playerData.TEAM_CITY} {playerData.TEAM_NAME}
                        </p>
                    </div>
                )}
            </section>
            <section className="player-stats-section">
                {seasonCurrentStats && (
                    <div>
                        <h2>
                            Current Season Stats ({seasonCurrentStats.SEASON_ID}
                            )
                        </h2>
                        {/* <p>GP: {seasonCurrentStats.GP}</p>
                        <p>MPG: {seasonCurrentStats.MPG}</p>
                        <p>FGM: {seasonCurrentStats.FGM}</p>
                        <p>FGA: {seasonCurrentStats.FGA}</p>
                        <p>FG%: {seasonCurrentStats.FG_PCT}</p>
                        <p>FG3M: {seasonCurrentStats.FG3M}</p>
                        <p>FG3A: {seasonCurrentStats.FG3A}</p>
                        <p>FG3%: {seasonCurrentStats.FG3_PCT}</p>
                        <p>FTM: {seasonCurrentStats.FTM}</p>
                        <p>FTA: {seasonCurrentStats.FTA}</p>
                        <p>FT%: {seasonCurrentStats.FT_PCT}</p>
                        <p>PTS: {seasonCurrentStats.PTS}</p>
                        <p>PPG: {seasonCurrentStats.PPG}</p>
                        <p>REB: {seasonCurrentStats.REB}</p>
                        <p>RPG: {seasonCurrentStats.RPG}</p>
                        <p>AST: {seasonCurrentStats.AST}</p>
                        <p>APG: {seasonCurrentStats.APG}</p>
                        <p>STL: {seasonCurrentStats.STL}</p>
                        <p>SPG: {seasonCurrentStats.SPG}</p>
                        <p>BLK: {seasonCurrentStats.BLK}</p>
                        <p>BPG: {seasonCurrentStats.BPG}</p>
                        <p>TOV: {seasonCurrentStats.TOV}</p>
                        <p>TPG: {seasonCurrentStats.TPG}</p> */}
                        {dataTable(seasonCurrentStats, statTableHeaders)}
                    </div>
                )}
            </section>
            <section className="player-stats-section">
                <h2>Season Stats</h2>
                {seasonStats &&
                    seasonStats.map((season, index) => (
                        <div key={index}>
                            <h3>{season.SEASON_ID}</h3>
                            {/* <p>GP: {season.GP}</p>
                            <p>MPG: {season.MPG}</p>
                            <p>FGM: {season.FGM}</p>
                            <p>FGA: {season.FGA}</p>
                            <p>FG%: {season.FG_PCT}</p>
                            <p>FG3M: {season.FG3M}</p>
                            <p>FG3A: {season.FG3A}</p>
                            <p>FG3%: {season.FG3_PCT}</p>
                            <p>FTM: {season.FTM}</p>
                            <p>FTA: {season.FTA}</p>
                            <p>FT%: {season.FT_PCT}</p>
                            <p>PTS: {season.PTS}</p>
                            <p>PPG: {season.PPG}</p>
                            <p>REB: {season.REB}</p>
                            <p>RPG: {season.RPG}</p>
                            <p>AST: {season.AST}</p>
                            <p>APG: {season.APG}</p>
                            <p>STL: {season.STL}</p>
                            <p>SPG: {season.SPG}</p>
                            <p>BLK: {season.BLK}</p>
                            <p>BPG: {season.BPG}</p>
                            <p>TOV: {season.TOV}</p>
                            <p>TPG: {season.TPG}</p> */}
                            {dataTable(season, statTableHeaders)}
                        </div>
                    ))}
            </section>
            <section className="player-stats-section">
                <h2>Career Stats</h2>
                {careerStats && (
                    <div>
                        {/* <p>GP: {careerStats.GP}</p>
                        <p>MPG: {careerStats.MPG}</p>
                        <p>FGM: {careerStats.FGM}</p>
                        <p>FGA: {careerStats.FGA}</p>
                        <p>FG%: {careerStats.FG_PCT.toFixed(3)}</p>
                        <p>FG3M: {careerStats.FG3M}</p>
                        <p>FG3A: {careerStats.FG3A}</p>
                        <p>FG3%: {careerStats.FG3_PCT.toFixed(3)}</p>
                        <p>FTM: {careerStats.FTM}</p>
                        <p>FTA: {careerStats.FTA}</p>
                        <p>FT%: {careerStats.FT_PCT.toFixed(3)}</p>
                        <p>PTS: {careerStats.PTS}</p>
                        <p>PPG: {careerStats.PPG}</p>
                        <p>REB: {careerStats.REB}</p>
                        <p>RPG: {careerStats.RPG}</p>
                        <p>AST: {careerStats.AST}</p>
                        <p>APG: {careerStats.APG}</p>
                        <p>STL: {careerStats.STL}</p>
                        <p>SPG: {careerStats.SPG}</p>
                        <p>BLK: {careerStats.BLK}</p>
                        <p>BPG: {careerStats.BPG}</p>
                        <p>TOV: {careerStats.TOV}</p>
                        <p>TPG: {careerStats.TPG}</p> */}
                        {dataTable(careerStats, statTableHeaders)}
                    </div>
                )}
            </section>
        </div>
    );
};

export default PlayerDetails;
