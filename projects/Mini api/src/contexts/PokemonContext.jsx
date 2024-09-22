import { createContext, useContext, useEffect, useState } from "react";
import Pokemon from "../models/Pokemon";

const PokemonContext = createContext();
const PokemonProvider = ({ children }) => {
    const [pokemonData, setPokemons] = useState([]);
    const [allPokemonData, setAllPokemons] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState(false);
    const [allTypes, setAllTypes] = useState([]);
    const [fetched, setFetched] = useState(false); // State om bij te houden of de fetch al is uitgevoerd

    const fetchPokemonData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(
                "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0"
            );
            const data = await response.json();
            const pokemonPromises = data.results.map(async (pokemonData) => {
                const response = await fetch(pokemonData.url);
                const detailData = await response.json();
                return new Pokemon({
                    ...pokemonData,
                    ...detailData,
                    sprites: detailData.sprites.front_default,
                });
            });
            const pokemons = await Promise.all(pokemonPromises);
            setPokemons(pokemons);
        } catch (error) {
            setErrors(error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchAllPokemonData = async () => {
        if (!fetched) {
            // Voer fetch alleen uit als deze nog niet is gedaan
            setIsLoading(true);
            try {
                const response = await fetch(
                    "https://pokeapi.co/api/v2/pokemon?limit=15000&offset=0"
                );
                const data = await response.json();
                const pokemonPromises = data.results.map(
                    async (allPokemonData) => {
                        const response = await fetch(allPokemonData.url);
                        const detailData = await response.json();
                        return new Pokemon({
                            ...allPokemonData,
                            ...detailData,
                            sprites: detailData.sprites.front_default,
                        });
                    }
                );
                const allPokemons = await Promise.all(pokemonPromises);
                setAllPokemons(allPokemons);
                setFetched(true); // Zet fetched op true wanneer de fetch is gedaan
            } catch (error) {
                setErrors(error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const fetchTypes = async () => {
        try {
            const response = await fetch("https://pokeapi.co/api/v2/type");
            const data = await response.json();
            // Sorteer de typen alfabetisch op naam
            const sortedTypes = data.results.sort((a, b) =>
                a.name.localeCompare(b.name)
            );
            setAllTypes(sortedTypes);
        } catch (error) {
        }
    };

    useEffect(() => {
        fetchPokemonData();
        fetchAllPokemonData();
        fetchTypes();
    }, []);


    return (
        <PokemonContext.Provider
            value={{ pokemonData, allPokemonData, isLoading, errors, allTypes }}
        >
            {children}
        </PokemonContext.Provider>
    );
};

export default PokemonProvider;
export const usePokemon = () => useContext(PokemonContext);

