import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlayers } from "../../redux/player";
import "./PlayerSearch.css";

const PlayerSearch = ({ onPlayerSelect }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const players = useSelector((state) => state.playerState.players);
    const error = useSelector((state) => state.playerState.error);

    const handleSearch = () => {
        if (name.trim()) {
            dispatch(fetchPlayers(name));
        }
    };

    return (
        <div className="player-search-container">
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Search for active NBA players"
                className="input-field"
            />
            <button onClick={handleSearch}>Search</button>
            {error && <p>{error}</p>}
            <ul className="suggestions-list">
                {players.map((player) => (
                    <li key={player.id} onClick={() => onPlayerSelect(player)}>
                        {player.full_name} {player.id}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PlayerSearch;
