import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import logo from "../../../public/logo.png";
import "./Navigation.css";

function Navigation() {
    const user = useSelector((store) => store.session.user);

    return (
        <div className="navigation-container">
            <div className="navigation-icon-container">
                <NavLink to="/">
                    <img src={logo} alt="site logo" />
                </NavLink>
                <p>FANTASY BASKETBALL NOTEBOOK</p>
            </div>
            <div className="navigation-profile-container">
                {user ? (
                    <ProfileButton />
                ) : (
                    <div className="auth-buttons">
                        <OpenModalMenuItem
                            itemText="Log In"
                            modalComponent={<LoginFormModal />}
                        />
                        <OpenModalMenuItem
                            itemText="Sign Up"
                            modalComponent={<SignupFormModal />}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navigation;
