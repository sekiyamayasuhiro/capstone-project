import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { fetchLeagues } from "../../redux/league";
import CreateLeagueFormModal from "./CreateLeagueFormModal";
import LeagueCard from "./LeagueCard";
import "./LeagueIndex.css";

const LeagueIndex = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { setModalContent } = useModal();

    const sessionUser = useSelector((state) => state.session.user);
    const leagues = useSelector((state) => state.leagueState.leagues);

    const [isRedirected, setRedirected] = useState(false);

    useEffect(() => {
        if (!sessionUser && !isRedirected) {
            setRedirected(true);
            navigate("/", { replace: true });
        } else {
            dispatch(fetchLeagues());
        }
    }, [dispatch, navigate, sessionUser, isRedirected]);

    if (!sessionUser && isRedirected) return null;

    const handleCreateNewLeague = () => {
        setModalContent(<CreateLeagueFormModal />);
    };

    return (
        <div className="league-index-container">
            <div className="league-index-create">
                {leagues && leagues.length <= 2 && (
                    <button
                        onClick={handleCreateNewLeague}
                        className="create-league-button"
                    >
                        Create New League
                    </button>
                )}
            </div>
            <div className="league-index-section">
                {leagues &&
                    leagues.map((league) => (
                        <LeagueCard key={league.id} league={league} />
                    ))}
            </div>
        </div>
    );
};

export default LeagueIndex;
