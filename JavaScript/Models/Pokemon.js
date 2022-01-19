export default class Pokemon {
    numero = -1;
    espece = "";
    hp = -1;
    attaque = -1;
    defense = -1;
    special = -1;
    vitesse = -1;
    type1 = "";
    type2 = "";
    image = "";
    genre = "";
    description = "";
    taille = -1;
    poids = -1;

    constructor(jsonPokemon, jsonEspece) {
        this.numero = jsonPokemon.id;
        this.espece = jsonPokemon.name;

        const stats = jsonPokemon.stats;
        this.hp = stats[0].base_stat;
        this.attaque = stats[1].base_stat;
        this.defense = stats[2].base_stat;
        this.special = stats[3].base_stat;
        this.vitesse = stats[5].base_stat;

        this.type1 = jsonPokemon.types[0].type.name;
        this.type2 = jsonPokemon.types[1]?.type.name;

        this.image = jsonPokemon.sprites.versions["generation-i"]["red-blue"].front_default;

        this.taille = jsonPokemon.height;
        this.poids = jsonPokemon.weight;

        this.genre = jsonEspece.genera[7].genus.slice(0, -8);
        this.description = jsonEspece.flavor_text_entries[7].flavor_text;		
    }
}