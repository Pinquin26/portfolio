class Pokemon {
    constructor({ name, url, types, sprites }) {
        this.name = name;
        this.url = url;
        this.types = types;
        this.sprites = sprites;
    }

    get asJson() {
        return {
            name: this.name,
            url: this.url,
            types: this.types,
            sprites: this.sprites,
        };
    }
}

export default Pokemon;