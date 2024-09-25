import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaBars } from "react-icons/fa";
import { thunkLogout } from "../../redux/session";
import { Link } from "react-router-dom";

function ProfileButton() {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const user = useSelector((store) => store.session.user);
    const ulRef = useRef();

    const toggleMenu = (e) => {
        e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (ulRef.current && !ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const logout = (e) => {
        e.preventDefault();
        dispatch(thunkLogout());
        closeMenu();
    };

    return (
        <>
            <button onClick={toggleMenu} className="profile-button">
                <FaBars />
            </button>
            {showMenu && (
                <div className="profile-dropdown" ref={ulRef}>
                    <div>Ready to ball {user.username}?</div>
                    <div>{user.email}</div>
                    <div>
                        <Link to="/leagues">- Check Your Leagues</Link>
                    </div>
                    <div>
                        <Link to="/testing">- Write Some Notes</Link>
                    </div>
                    <div>
                        <button onClick={logout}>Log Out</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default ProfileButton;
