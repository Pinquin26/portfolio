import { useCallback, useEffect, useState } from "react";

// Aangepaste hook voor het ophalen van data van een gegeven pad (path).
const useFetch = (path) => {
    // State voor het bijhouden van opgehaalde data en eventuele fouten.
    const [data, setData] = useState(); // Data die wordt opgehaald
    const [error, setError] = useState(); // Foutmeldingen, indien aanwezig

    // Functie om data op te halen van het opgegeven pad.
    const fetchData = useCallback(() => {
        let isActive = true; // Om te controleren of deze hook nog actief is

        fetch(path, {})
            .then((data) => data.json()) // Omzetten van de data naar JSON-formaat
            .then((data) => isActive && setData(data)) // Data instellen als deze hook nog actief is
            .catch((err) => isActive && setError(String(err))); // Foutafhandeling, error instellen als deze hook nog actief is

        // Return een cleanup functie om isActive op false te zetten wanneer de hook wordt unmounted
        return () => (isActive = false);
    }, [path]);

    // Effect hook om data op te halen bij het mounten (gebruiken) van de component of wanneer fetchData verandert.
    useEffect(() => {
        return fetchData(); // Data ophalen bij elke wijziging van de fetchData functie
    }, [fetchData]);

    // Functie om data opnieuw op te halen
    const invalidate = () => {
        fetchData(); // Ophalen van nieuwe data
    };

    // Bepalen of de data aan het laden is (nog niet opgehaald en geen fouten).
    const isLoading = !error && !data;

    // Return de gegevens en functies die beschikbaar zijn voor het gebruik van deze hook.
    return {
        isLoading, // Boolean om aan te geven of de data aan het laden is
        data, // De opgehaalde data
        error, // Eventuele foutmeldingen
        invalidate, // Functie om data opnieuw op te halen
    };
};

export default useFetch;
