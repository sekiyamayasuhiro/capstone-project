import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
    return (
        <div className="navigation-container">
            <ul>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>

                <li>
                    <ProfileButton />
                </li>
            </ul>
        </div>
    );
}

export default Navigation;
