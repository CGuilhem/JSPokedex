import Pokemon from "./Models/Pokemon";

export default class DAO {
    static #mapPokemon = new Map(); // # est utilisé pour mettre en privé

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
}