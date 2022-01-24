import Pokemoncapture from "../Models/PokemonCapture";

export default class DivSelectionPokemon {
    div;

	constructor(pokemon, callbackClick) {

		if (pokemon instanceof Pokemoncapture) {  // Si on compare avec la classe Pokemon, les deux seront valide puisque elle hérite de Pokemon. Choisir la plus spécifique
			const divPokemon = document.createElement("div");
			divPokemon.classList.add("divSelectionPokemon");
			divPokemon.innerHTML = `
			<p class="nomPokemon">${pokemon.nom}</p>
			<img src="${pokemon.image}" alt="Image pokemon ${pokemon.espece}">
			<p class="niveauPokemon">lvl. ${pokemon.niveau}</p>
			`;
			if (callbackClick) {
				divPokemon.onclick = () => {
					callbackClick(pokemon);
				};
			}
			this.div = divPokemon;
		} else {
			const divPokemon = document.createElement("div");
			divPokemon.classList.add("divSelectionPokemon");
			divPokemon.innerHTML = `
				<p class="numeroPokemon">No.${pokemon.numero}</p>
				<img src="${pokemon.image}" alt="Image pokemon ${pokemon.espece}">
				<p class="especePokemon">${pokemon.espece}</p>
			`;
			if (callbackClick) {
				divPokemon.onclick = () => {
					callbackClick(pokemon);
				};
			}
			this.div = divPokemon;
		}	
	}
}