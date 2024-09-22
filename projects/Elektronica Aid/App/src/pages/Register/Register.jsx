import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Register.module.css";
import Loading from "../../components/Loading/Loading";
import { useShop } from "../../context/ShopContext";
import ROUTES from "../../consts/Routes";

const Register = ({ authService, lastPage }) => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        name: "",
        lastName: "",
        email: "",
        city: "",
        postalCode: 0,
        street: "",
        number: 0,
        bus: "",
        country: "",
        dateOfBirth: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});
    const [maxDate, setMaxDate] = useState("");
    const navigate = useNavigate();
    const from = lastPage?.pathname || ROUTES.home;

    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        setMaxDate(today);
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.username) errors.username = "Gebruikersnaam is verplicht";
        if (!formData.password) {
            errors.password = "Wachtwoord is verplicht";
        } else if (formData.password.length < 5) {
            errors.password = "Wachtwoord moet minimaal 5 karakters lang zijn";
        }
        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = "Wachtwoorden komen niet overeen";
        }
        if (!formData.name) errors.name = "Voornaam is verplicht";
        if (!formData.lastName) errors.lastName = "Achternaam is verplicht";
        if (!formData.email) {
            errors.email = "Emailadres is verplicht";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Ongeldig emailadres";
        }
        if (!formData.city) errors.city = "Stad is verplicht";
        if (!formData.postalCode) errors.postalCode = "Postcode is verplicht";
        if (!formData.street) errors.street = "Straat is verplicht";
        if (!formData.number) errors.number = "Nummer is verplicht";
        if (!formData.country) errors.country = "Land is verplicht";
        if (!formData.dateOfBirth)
            errors.dateOfBirth = "Geboortedatum is verplicht";
        console.log(errors);
        return errors;
    };

    const handleRegister = (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        setIsLoading(true);
        authService
            .register(formData)
            .then((response) => handleResponse(response));
    };

    const handleResponse = (response) => {
        if (response?.type === false) {
            if (response.message) setError(response.message);
        }
        setIsLoading(false);
        navigate(from, { replace: true });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    if (isLoading) return <Loading />;
    else
        return (
            <div className={style.register_container}>
                <h2 onClick={() => console.log(authService.isLoggedIn)}>
                    Registreer
                </h2>
                {error && <p className={style.error}>{error}</p>}
                {validationErrors.password && (
                    <p className={style.error}>{validationErrors.password}</p>
                )}
                {validationErrors.confirmPassword && (
                    <p className={style.error}>
                        {validationErrors.confirmPassword}
                    </p>
                )}
                <form className={style.register_form}>
                    <label>Gebruikers naam:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    {validationErrors.username && (
                        <p className={style.error}>
                            {validationErrors.username}
                        </p>
                    )}

                    <label>Paswoord:</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {validationErrors.password && (
                        <p className={style.error}>
                            {validationErrors.password}
                        </p>
                    )}

                    <label>Herhaal Paswoord:</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    {validationErrors.confirmPassword && (
                        <p className={style.error}>
                            {validationErrors.confirmPassword}
                        </p>
                    )}

                    <label className={style.showPassword}>
                        <p>Toon passwoord</p>
                        <input
                            type="checkbox"
                            id="showPassword"
                            checked={showPassword}
                            onChange={togglePasswordVisibility}
                        />
                    </label>

                    <label>Voor naam:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {validationErrors.name && (
                        <p className={style.error}>
                            {validationErrors.name}
                        </p>
                    )}

                    <label>Achter naam:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                    {validationErrors.lastName && (
                        <p className={style.error}>
                            {validationErrors.lastName}
                        </p>
                    )}

                    <label>Emailadres:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {validationErrors.email && (
                        <p className={style.error}>{validationErrors.email}</p>
                    )}

                    <label>Stad:</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                    />
                    {validationErrors.city && (
                        <p className={style.error}>{validationErrors.city}</p>
                    )}

                    <label>Postcode:</label>
                    <input
                        type="number"
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                    />
                    {validationErrors.postalCode && (
                        <p className={style.error}>
                            {validationErrors.postalCode}
                        </p>
                    )}

                    <label>Straat:</label>
                    <input
                        type="text"
                        id="street"
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                    />
                    {validationErrors.street && (
                        <p className={style.error}>{validationErrors.street}</p>
                    )}

                    <label>Nummer, bus:</label>
                    <input
                        type="number"
                        id="number"
                        name="number"
                        value={formData.number}
                        onChange={handleChange}
                    />
                    {validationErrors.number && (
                        <p className={style.error}>{validationErrors.number}</p>
                    )}
                    <input
                        type="string"
                        id="bus"
                        name="bus"
                        value={formData.bus}
                        onChange={handleChange}
                    />

                    <label>Land:</label>
                    <input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                    />
                    {validationErrors.country && (
                        <p className={style.error}>
                            {validationErrors.country}
                        </p>
                    )}

                    <label>Geboorte datum:</label>
                    <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        max={maxDate}
                    />
                    {validationErrors.dateOfBirth && (
                        <p className={style.error}>
                            {validationErrors.birthDate}
                        </p>
                    )}

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

export default Register;
