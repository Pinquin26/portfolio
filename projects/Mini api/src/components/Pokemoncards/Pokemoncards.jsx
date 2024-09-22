import style from "./Pokemoncards.module.css";
import { Link } from "react-router-dom";
import ROUTES from "../../consts/Routes";
const Pokemoncards = ({ pokemon }) => {
    return (
        <div className={style.pokemoncard}>
            <h3>{pokemon.name}</h3>
            <img src={pokemon.sprites} alt={pokemon.name} className={ style.sprites } />
            <ul>
                {pokemon.types.map((type, index) => (
                    <li key={index}>{type.type.name}</li>
                ))}
            </ul>
            <Link to={`${ROUTES.detail.to}${pokemon.name}`}>
                <button>Learn more about {pokemon.name} </button>
            </Link>
        </div>
    );
};

export default Pokemoncards;
