import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import style from "./Login.module.css";
import Loading from "../../components/Loading/Loading";
import { useShop } from "../../context/ShopContext";
import ROUTES from "../../consts/Routes";

const Login = ({ authService, lastPage }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const from = lastPage?.pathname || ROUTES.home;

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);
        authService
            .login(username, password)
            .then((response) => handleResponse(response));
    };

    const handleResponse = (response) => {
        if (response?.type === false) {
            if (response.message) setError(response.message);
        }
        setIsLoading(false);
        navigate(from, { replace: true });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        navigate(ROUTES.register);
    };

    

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    if (isLoading) return <Loading />;
    else
        return (
            <div className={style.loginContainer}>
                <h2 onClick={() => console.log(authService.isLoggedIn)}>
                    Login
                </h2>
                <form className={style.loginForm}>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <label htmlFor="showPassword">
                        <input
                            type="checkbox"
                            id="showPassword"
                            checked={showPassword}
                            onChange={togglePasswordVisibility}
                        />
                        Show Password
                    </label>

                    <button
                        className={style.form_button}
                        onClick={(e) => handleLogin(e)}
                    >
                        Login
                    </button>
                    <p>Heb je nog geen account? Registreer je dan.</p>
                    <button
                        className={`${style.register} ${style.form_button}`}
                        onClick={(e) => handleRegister(e)}
                    >
                        Register
                    </button>
                </form>
            </div>
        );
};

export default Login;
