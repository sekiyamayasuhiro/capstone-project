import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import logo from "../../../public/icon.png";
import "./Navigation.css";

function Navigation() {
    return (
        <div className="navigation-container">
            <div className="navigation-icon-container">
                <NavLink to="/">
                    <img src={logo} alt="site logo" />
                </NavLink>
            </div>
            <div className="navigation-profile-container">
                <ProfileButton />
            </div>
        </div>
    );
}

export default Navigation;
