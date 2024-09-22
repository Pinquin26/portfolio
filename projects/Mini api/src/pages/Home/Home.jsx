import React, { useState } from "react";
import Pokemoncards from "../../components/Pokemoncards/Pokemoncards";
import style from "./Home.module.css";
import { usePokemon } from "../../contexts/PokemonContext";
import NotFound from "../../components/NotFound/NotFoud";

const Home = () => {
    const { allPokemonData, isLoading, errors, allTypes, pokemonData } = usePokemon();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [displayedPokemonCount, setDisplayedPokemonCount] = useState(10); // Aantal Pokémon dat momenteel wordt weergegeven
    let filteredPokemon = allPokemonData;

    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
        setDisplayedPokemonCount(10); // Reset de weergegeven Pokémon naar de eerste 10 wanneer er opnieuw wordt gezocht
    };

    const handleTypeChange = (event) => {
        const type = event.target.value;
        setSelectedType(type);
        setDisplayedPokemonCount(10); // Reset de weergegeven Pokémon naar de eerste 10 wanneer het type wordt gewijzigd
        // Als een type is geselecteerd, reset de zoekterm naar leeg
        if (type) {
            setSearchTerm("");
        }
    };
    
    const handleLoadMore = () => {
        setDisplayedPokemonCount((prevCount) => prevCount + 10); // Toon 10 meer Pokémon wanneer de knop wordt ingedrukt
    };

    if (errors) {
        return <p>Er is een fout opgetreden: {errors.message}</p>;
    }

    if (isLoading) {
        return <p>Loading...</p>;
    }

    // Filter op zoekterm
    if (searchTerm) {
        filteredPokemon = filteredPokemon.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(searchTerm)
        );
    }
    // Filter op type
    if (selectedType) {
        filteredPokemon = filteredPokemon.filter((pokemon) =>
            pokemon.types.map((type) => type.type.name).includes(selectedType)
        );
    }

    if (!searchTerm && !selectedType) {
        filteredPokemon = pokemonData;
    }

    // Slicen van de weergegeven Pokémon op basis van de huidige teller
    const slicedPokemon = filteredPokemon.slice(0, displayedPokemonCount);

    return (
        <div className={style.container}>
            <div className="">
                <div className={style.filters}>
                    <select
                        onChange={handleTypeChange}
                        className={style.filter_type}
                    >
                        <option value="">All types</option>
                        {allTypes.map((type, index) => (
                            <option key={index} value={type.name}>
                                {type.name}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        placeholder="Search your favorite Pokémon..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className={style.filter_search}
                    />
                </div>
                <div className={style.pokemon_list}>
                    {slicedPokemon.map((pokemon, index) => (
                        <Pokemoncards key={index} pokemon={pokemon} />
                    ))}
                </div>
                {displayedPokemonCount < filteredPokemon.length && (
                    <button
                        onClick={handleLoadMore}
                        className={style.load_more}
                    >
                        <p>Load More</p>
                    </button>
                )}

                {filteredPokemon.length === 0 && <NotFound />}
            </div>
        </div>
    );
};

export default Home;
