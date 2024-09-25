import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginFormModal({ redirectPath = "/" }) {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const serverResponse = await dispatch(
            thunkLogin({
                email,
                password,
            })
        );

        if (serverResponse) {
            setErrors(serverResponse);
        } else {
            closeModal();
            navigate(redirectPath);
        }
    };

    //Demo user login
    const demoUser = () => {
        setEmail("demo@aa.io");
        setPassword("password");
    };

    //Second user login
    const demoUserTwo = () => {
        setEmail("marnie@aa.io");
        setPassword("password");
    };

    return (
        <>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Email
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                {errors.email && <p>{errors.email}</p>}
                <label>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                {errors.password && <p>{errors.password}</p>}
                <button type="submit">Log In</button>
                <button onClick={demoUser}>Demo User</button>
                <button onClick={demoUserTwo}>Demo User 2</button>
            </form>
        </>
    );
}

export default LoginFormModal;
