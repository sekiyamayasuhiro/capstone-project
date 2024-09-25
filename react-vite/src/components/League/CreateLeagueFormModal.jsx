import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createLeague } from "../../redux/league";

const CreateLeagueFormModal = () => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [name, setName] = useState("");
    const [note, setNote] = useState("");
    const [leagueImg, setLeagueImg] = useState("");
    const [scoringType, setScoringType] = useState("head-to-head-categories");
    const [maxPlayers, setMaxPlayers] = useState(12);
    const [validationErrors, setValidationErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = {};

        if (!name) errors.name = "League name is required.";
        if (name.length > 30)
            errors.name = "League name cannot exceed 30 characters.";
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
            name,
            note,
            league_img: leagueImg,
            scoring_type: scoringType,
            max_players: maxPlayers,
        };

        dispatch(createLeague(leagueData));
        closeModal();
    };

    return (
        <div className="create-league-form-modal">
            <form onSubmit={handleSubmit}>
                <h1>Create a New League</h1>
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
                            setMaxPlayers(parseInt(e.target.value))
                        }
                        required
                    >
                        <option value={8}>8</option>
                        <option value={10}>10</option>
                        <option value={12}>12</option>
                    </select>
                </div>
                <button type="submit">Create League</button>
            </form>
        </div>
    );
};

export default CreateLeagueFormModal;
