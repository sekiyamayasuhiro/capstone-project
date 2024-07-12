import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchPlayers } from "../../redux/player";
// import "./GlobalSearchBar.css";

const GlobalSearchBar = () => {
    const [name, setName] = useState("");
    const dispatch = useDispatch();
    const players = useSelector(
        (state) => state.playerState.searchResults || []
    );
    const navigate = useNavigate();

    const handleSearch = () => {
        if (name.trim()) {
            dispatch(searchPlayers(name));
        }
    };

    const handlePlayerSelect = (player) => {
        console.log("Selected player:", player);
        navigate(`/players/${player.id}`);
    };

    return (
        <div className="global-search-bar">
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Search for active NBA players"
                className="input-field"
            />
            <button onClick={handleSearch}>Search</button>
            <ul className="suggestions-list">
                {players.map((player) => (
                    <li
                        key={player.id}
                        onClick={() => handlePlayerSelect(player)}
                    >
                        {player.full_name} {player.id}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GlobalSearchBar;
