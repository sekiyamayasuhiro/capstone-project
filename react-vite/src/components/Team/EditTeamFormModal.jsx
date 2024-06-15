import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { updateTeamDetails } from "../../redux/team";

const EditTeamFormModal = ({ leagueId, team }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [name, setName] = useState(team.name);
    const [note, setNote] = useState(team.note);
    const [teamImg, setTeamImg] = useState(team.team_img);
    const [wins, setWins] = useState(team.wins);
    const [losses, setLosses] = useState(team.losses);
    const [ties, setTies] = useState(team.ties);
    const [validationErrors, setValidationErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = {};

        if (!name) errors.name = "Team name is required.";
        if (name.length > 30)
            errors.name = "Team name cannot exceed 30 characters.";
        if (!note) errors.note = "Note is required.";
        if (note.length > 100)
            errors.note = "Note cannot exceed 100 characters.";
        if (!teamImg) errors.teamImg = "Image URL is required.";
        if (
            !teamImg.endsWith(".jpg") &&
            !teamImg.endsWith(".jpeg") &&
            !teamImg.endsWith(".png")
        ) {
            errors.teamImg =
                "Please enter a valid URL image (.jpg, .jpeg, .png)";
        }

        if (Object.keys(errors).length) {
            setValidationErrors(errors);
            return;
        }

        const teamData = {
            league_id: leagueId,
            name,
            note,
            team_img: teamImg,
            wins,
            losses,
            ties,
        };

        dispatch(updateTeamDetails(leagueId, team.id, teamData));
        closeModal();
    };

    return (
        <div className="edit-team-form-modal">
            <form onSubmit={handleSubmit}>
                <h1>Edit Team</h1>
                <div className="form-group-name">
                    <label>Team Name</label>
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
                    <label>Note</label>
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
                    <label>Team Image URL</label>
                    <input
                        type="text"
                        value={teamImg}
                        onChange={(e) => setTeamImg(e.target.value)}
                        required
                    />
                    {validationErrors.teamImg && (
                        <div className="error">{validationErrors.teamImg}</div>
                    )}
                </div>
                <div className="form-group-wins">
                    <label>Wins</label>
                    <input
                        type="number"
                        min="0"
                        value={wins}
                        onChange={(e) => setWins(parseInt(e.target.value))}
                        required
                    />
                </div>
                <div className="form-group-losses">
                    <label>Losses</label>
                    <input
                        type="number"
                        min="0"
                        value={losses}
                        onChange={(e) => setLosses(parseInt(e.target.value))}
                        required
                    />
                </div>
                <div className="form-group-ties">
                    <label>Ties</label>
                    <input
                        type="number"
                        min="0"
                        value={ties}
                        onChange={(e) => setTies(parseInt(e.target.value))}
                        required
                    />
                </div>
                <button type="submit">Update Team</button>
            </form>
        </div>
    );
};

export default EditTeamFormModal;
