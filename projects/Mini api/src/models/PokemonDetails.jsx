class PokemonDetails {
    constructor({ name, url, types, species, sprites, forms, abilities, weight, height, stats}) {
        this.name = name;
        this.url = url;
        this.types = types;
        this.species = species;
        this.sprites = sprites;
        this.forms = forms;
        this.abilities = abilities;
        this.weight = weight;
        this.height = height;
        this.stats = stats;
    }

    get asJson() {
        return {
            name: this.name,
            url: this.url,
            types: this.types,
            species: this.species,
            sprites: this.sprites,
            forms: this.forms,
            abilities: this.abilities,
            weight: this.weight,
            height: this.height,
            stats: this.stats,
        };
    }
}

export default PokemonDetails;
