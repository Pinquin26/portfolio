import React, { useState } from "react";
import { useShop } from "../../context/ShopContext";
import style from "./Account.module.css";

const Account = () => {
    const { user, authService } = useShop();
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        username: user.username,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        city: user.city,
        postalCode: user.postalCode,
        street: user.street,
        number: user.number,
        bus: user.bus,
        country: user.country,
    });

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "2-digit", day: "2-digit" };
        return new Date(dateString).toLocaleDateString("nl-NL", options);
    };

    

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            alert("Ongeldig e-mailadres");
            return;
        }
        console.log(user);
        console.log(formData.email);
        const success = await authService.updateUser(user.id, formData);
        if (success) {
            toggleEditMode();
        }
    };

    return (
        <div className={style.account}>
            <div className={style.account_container}>
                <h1>Account</h1>
                <button onClick={toggleEditMode}>
                    {editMode ? "Annuleren" : "Bewerken"}
                </button>
                <table className={style.account_table}>
                    <tbody>
                        <tr>
                            <td className={style.account_label}>
                                Ingelogd als:
                            </td>
                            <td className={style.account_info}>
                                {user.username}
                            </td>
                        </tr>
                        <tr>
                            <td className={style.account_label}>Voornaam:</td>
                            <td className={style.account_info}>{user.name}</td>
                        </tr>
                        <tr>
                            <td className={style.account_label}>Achternaam:</td>
                            <td className={style.account_info}>
                                {user.lastName}
                            </td>
                        </tr>
                        <tr>
                            <td className={style.account_label}>Email:</td>
                            <td className={style.account_info}>{user.email}</td>
                        </tr>
                        <tr>
                            <td className={style.account_label}>Adres:</td>
                            <td className={style.account_info}>
                                {user.street}, {user.number}, {user.bus}
                            </td>
                        </tr>
                        <tr>
                            <td className={style.account_label}>Postcode:</td>
                            <td className={style.account_info}>
                                {user.postalCode}
                            </td>
                        </tr>
                        <tr>
                            <td className={style.account_label}>Woonplaats:</td>
                            <td className={style.account_info}>{user.city}</td>
                        </tr>
                        <tr>
                            <td className={style.account_label}>Land:</td>
                            <td className={style.account_info}>
                                {user.country}
                            </td>
                        </tr>
                        <tr>
                            <td className={style.account_label}>
                                Geboortedatum:
                            </td>
                            <td className={style.account_info}>
                                {formatDate(user.dateOfBirth)}
                            </td>
                        </tr>
                    </tbody>
                </table>
                {editMode && (
                    <form onSubmit={handleSubmit} className={style.edit_form}>
                        <label>Gebruikersnaam:</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            disabled
                        />
                        <label>Voornaam:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <label>Achternaam:</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <label>Straat:</label>
                        <input
                            type="text"
                            name="street"
                            value={formData.street}
                            onChange={handleChange}
                        />
                        <label>Nummer:</label>
                        <input
                            type="text"
                            name="number"
                            value={formData.number}
                            onChange={handleChange}
                        />
                        <label>Bus:</label>
                        <input
                            type="text"
                            name="bus"
                            value={formData.bus}
                            onChange={handleChange}
                        />
                        <label>Postcode:</label>
                        <input
                            type="text"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleChange}
                        />
                        <label>Woonplaats:</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                        />
                        <label>Land:</label>
                        <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                        />
                        <button type="submit">Opslaan</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Account;
