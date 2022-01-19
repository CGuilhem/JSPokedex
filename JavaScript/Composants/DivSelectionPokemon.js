export default class DivSelectionPokemon {
    div;

	constructor(pokemon, callbackClick) {
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