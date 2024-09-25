import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { updateLeagueDetails } from "../../redux/league";

const EditLeagueFormModal = ({ league }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [name, setName] = useState(league.name);
    const [note, setNote] = useState(league.note);
    const [leagueImg, setLeagueImg] = useState(league.league_img);
    const [scoringType, setScoringType] = useState(league.scoring_type);
    const [maxPlayers, setMaxPlayers] = useState(league.max_players);
    const [validationErrors, setValidationErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = {};

        if (!name) errors.name = "League name is required.";
        if (name.length > 30)
            errors.name = "League name cannot exceed 20 characters.";
        if (!note) errors.note = "Note is required.";
        if (note.length > 100)
            errors.note = "Note cannot exceed 100 characters.";
        if (!leagueImg) errors.leagueImg = "Image URL is required.";
        if (
            !leagueImg.endsWith(".jpg") &&
            !leagueImg.endsWith(".jpeg") &&
            !leagueImg.endsWith(".png")
        ) {
            errors.leagueImg =
                "Please enter a valid URL image (.jpg, .jpeg, .png)";
        }

        if (Object.keys(errors).length) {
            setValidationErrors(errors);
            return;
        }

        const leagueData = {
            id: league.id,
            name,
            note,
            league_img: leagueImg,
            scoring_type: scoringType,
            max_players: maxPlayers,
        };

        dispatch(updateLeagueDetails(league.id, leagueData));
        closeModal();
    };

    return (
        <div className="edit-league-form-modal">
            <form onSubmit={handleSubmit}>
                <h1>Edit League</h1>
                <div className="form-group-name">
                    <label>League Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    {validationErrors.name && (
                        <div className="error">{validationErrors.name}</div>
                    )}
                </div>
                <div className="form-group-note">
                    <label>Note:</label>
                    <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        required
                    />
                    {validationErrors.note && (
                        <div className="error">{validationErrors.note}</div>
                    )}
                </div>
                <div className="form-group-image">
                    <label>League Image URL:</label>
                    <input
                        type="text"
                        value={leagueImg}
                        onChange={(e) => setLeagueImg(e.target.value)}
                        required
                    />
                    {validationErrors.leagueImg && (
                        <div className="error">
                            {validationErrors.leagueImg}
                        </div>
                    )}
                </div>
                <div className="form-group-scoring-type">
                    <label>Scoring Type:</label>
                    <select
                        value={scoringType}
                        onChange={(e) => setScoringType(e.target.value)}
                        required
                    >
                        <option value={"head-to-head-categories"}>
                            Head-to-Head: Categories
                        </option>
                    </select>
                </div>
                <div className="form-group-max-players">
                    <label>Max Players:</label>
                    <select
                        value={maxPlayers}
                        onChange={(e) =>
                            setMaxPlayers(parseInt(e.target.value, 10))
                        }
                        required
                    >
                        <option value={8}>8</option>
                        <option value={10}>10</option>
                        <option value={12}>12</option>
                    </select>
                </div>
                <button type="submit">Update League</button>
            </form>
        </div>
    );
};

export default EditLeagueFormModal;
