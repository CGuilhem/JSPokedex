import Pokemon from "./Models/Pokemon";
import Pokemoncapture from "./Models/PokemonCapture";

export default class DAO {
    static #mapPokemon = new Map(); // # est utilisé pour mettre en privé
    static #mesPokemons = new Map();

    static async telechargerDonneesPokemon() {
        if (this.#mapPokemon.size > 0) {
            return this.#mapPokemon;
        }
        try {
            const resListePokemons = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
            const jsonRequeteListe = await resListePokemons.json();
            const listePokemons = jsonRequeteListe.results;
            if (!listePokemons || !Array.isArray(listePokemons) || listePokemons.length === 0) {
                throw new Error("Données réponse non conformes");
            }
    
            const arrayPromisesPokemons = [];
			listePokemons.forEach(objListe => {
				const promisePokemon = fetch(objListe.url);                 //On attend pas le résultat ; on stocke la promise de toutes les requêtes dans un tableau pour télécharger tous les Pokémons en parallèle plutôt que d'attendre le résultat de chaque requête pour passer au Pokémon suivant.
				arrayPromisesPokemons.push(promisePokemon);
			});
    
            const resPokemons = await Promise.all(arrayPromisesPokemons);   //On renvoie un tableau qui contient toutes les valeurs de retour des promises stockées précédemment afin de les traiter. 
            const arrayPromisesJsonPokemons = [];
            resPokemons.forEach(resPokemon=>{
				arrayPromisesJsonPokemons.push(resPokemon.json());
			});
    
            const jsonPokemons = await Promise.all(arrayPromisesJsonPokemons);
            const arrayPromisesEspeces = [];
            jsonPokemons.forEach(jsonPokemon => {
                arrayPromisesEspeces.push(fetch(jsonPokemon.species.url));
            });
    
            const resEspeces = await Promise.all(arrayPromisesEspeces);
            const arrayPromisesJsonEspeces = [];
            resEspeces.forEach(resEspece => {
                arrayPromisesJsonEspeces.push(resEspece.json());
            });
    
            const jsonEspeces = await Promise.all(arrayPromisesJsonEspeces);
    
            for (let i = 0; i < listePokemons.length; i++) {
                const jsonPokemon = jsonPokemons[i];
                const jsonEspece =  jsonEspeces[i];
    
                const pokemon = new Pokemon(jsonPokemon, jsonEspece);
                this.#mapPokemon.set(pokemon.numero, pokemon);
            }
            return this.#mapPokemon;
        } catch(e) {
            console.error(e);
            alert("Erreur pendant le téléchargement des Pokémons");
        }
    }

    static verifierSiNomPokemonDisponible(nom) {
        return !this.#mesPokemons.has(nom); // On inverse car si on a déjà on veut un false au final pour dire que le nom n'est pas disponible
    }

    static ajouterAMesPokemons(pokemon, nom) {
        const pokemonCapture = new Pokemoncapture(pokemon.jsonPokemon, pokemon.jsonEspece, nom);
        this.#mesPokemons.set(nom, pokemonCapture);
        this.#sauvegarderMesPokemons();
    }

    static #sauvegarderMesPokemons() {
        const tableauMesPokemons = Array.from(this.#mesPokemons.values());
        window.localStorage.setItem("mesPokemons", JSON.stringify(tableauMesPokemons));  // à chaque fois, je repasserai ici avec la même clé donc j'écraserai le contenu de l'ancienne map
    }

    static chargerMesPokemons() {
        this.#mesPokemons = new Map();
        const json = window.localStorage.getItem("mesPokemons");
        if (!json) {
            return this.#mesPokemons;
        }

        const tableauParse = JSON.parse(json);
        tableauParse.forEach(pokemonObj => {
            const pokemonCapture = new Pokemoncapture(pokemonObj.jsonPokemon, pokemonObj.jsonEspece, pokemonObj.nom);
            pokemonCapture.niveau = pokemonObj.niveau;
            pokemonCapture.dateCapture = new Date(pokemonObj.dateCapture);
            this.#mesPokemons.set(pokemonCapture.nom, pokemonCapture);
        });
        return this.#mesPokemons;
    }

    static renommerPokemon(pokemon, nouveauNom) {
        this.#mesPokemons.delete(pokemon.nom);
        pokemon.nom = nouveauNom;
        this.#mesPokemons.set(nouveauNom, pokemon);
        this.#sauvegarderMesPokemons();
    }

    static relacherPokemon(pokemon) {
        this.#mesPokemons.delete(pokemon.nom);
        this.#sauvegarderMesPokemons();
    }
}