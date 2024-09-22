import style from "./Header.module.css";
import { Link } from "react-router-dom";
import ROUTES from "../../consts/Routes";

const Header = () => {

    return (
        <header>
            <Link to={ROUTES.home} className={style.header}>
                    <img
                        src="./pokeball.png"
                        alt="pokeball"
                        className={style.logo}
                    />
                <h1>Pokémon Api</h1>
            </Link>
        </header>
    );
};

export default Header;
