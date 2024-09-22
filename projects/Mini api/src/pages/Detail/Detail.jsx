import style from "./Detail.module.css";
import { useEffect, useState } from "react";
import PokemonDetails from "../../models/PokemonDetails";
import { Link, useParams } from "react-router-dom";
import NotFound from "../../components/NotFound/NotFoud";


const Detail = () => {

    const { name } = useParams();
    const [pokemonData, setPokemon] = useState();
    const [weightInKg, setWeightInKg] = useState(0);
    const [heightInM, setHeightInM] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false); 

    const fetchPokemonDetailData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${name}`
            );
            const data = await response.json();
            const pokemon = new PokemonDetails(data);
            setPokemon(pokemon);
            setWeightInKg(pokemon.weight / 10); // Omrekenen van hectogrammen naar kilogrammen
            setHeightInM(pokemon.height / 10); // Omrekenen van decimeters naar meters
        } catch (error) {
            setError(true);
        }
        finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPokemonDetailData();
    }, [name]); 

    if (isLoading) {
        return <p>Loading...</p>;
    }
    
    if (error) {
        return <NotFound />;
    }

    return (
        
        <div className={style.container}>
            {pokemonData && ( // Controleer of pokemonData niet null is voordat je probeert het te gebruiken
                <>
                    <Link to="/" className={style.back}>
                        <p>Return</p>
                    </Link>
                    <h2 className={style.name}>{pokemonData.name}</h2>
                    
                    <div className={style.container50}>
                        <img
                            className={style.image}
                            src={pokemonData.sprites.front_default}
                            alt={pokemonData.name}
                        />
                        <div className={style.info}>
                            <span className={style.detail}>
                                <p>Weight:</p> {weightInKg} Kg
                            </span>
                            <span className={style.detail}>
                                <p>Height:</p> {heightInM} M
                            </span>
                            <span className={style.detail}>
                                <p>Types:</p> {" "}
                                {pokemonData.types
                                    .map((type) => type.type.name)
                                    .join(", ")}
                            </span>
                            <span className={style.detail}>
                                <p>Forms:</p> {" "}
                                {pokemonData.forms
                                    .map((form) => form.name)
                                    .join(", ")}
                            </span>
                            <span className={style.detail}>
                                <p>Abilities:</p>{" "}
                                {pokemonData.abilities
                                    .map((ability) => ability.ability.name)
                                    .join(", ")}
                            </span>
                            <span className={style.detail}>
                                <p>Species:</p> {pokemonData.species.name}
                            </span>
                            <span className={style.detail}>Stats:</span>
                            <ul className={style.stats}>
                                {pokemonData.stats.map((stat) => (
                                    <li key={stat.stat.name} className={style.stat}>
                                        {stat.stat.name}: {stat.base_stat}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Detail;
