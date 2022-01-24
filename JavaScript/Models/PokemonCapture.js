import Pokemon from "./Pokemon"

export default class Pokemoncapture extends Pokemon {
    nom = "";
    niveau = 1;
    dateCapture = new Date();

    constructor(jsonPokemon, jsonEspece, nom) {
        super(jsonPokemon, jsonEspece); // Je dois absolument utiliser super comme je rédéfinis le constructor. Super = j'appelle le constructor de ma classe de base
        this.nom = nom;
    }
}