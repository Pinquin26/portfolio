import { Link } from "react-router-dom";
import style from "./Footer.module.css";
import ROUTES from "../../consts/Routes";

const Footer = () => {
    return (
        <footer className={style.footer}>
            <p>© 2024 PokéAPI Quinten De Tavernier NMD2</p>
            <Link to={`${ROUTES.about}`}>Pokémon?</Link>
        </footer>
    );
};

export default Footer;
