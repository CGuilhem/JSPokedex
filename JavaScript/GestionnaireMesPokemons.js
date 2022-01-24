import DAO from "./DAO"
import App from "./App"
import Pokemon from "./Models/Pokemon"
import DivSelectionPokemon from "./Composants/DivSelectionPokemon"

export default class GestionnaireMesPokemons {

    static clickBoutonMesPokemons() {

        App.afficherLoaderSectionPage();                                // Début  affichage loader
        const mesPokemons = DAO.chargerMesPokemons();
        App.sectionPage.innerHTML = "";                               	// Fin affichage loader
        
        const divMesPokemons = document.createElement("div");
        divMesPokemons.classList.add("divMesPokemons");
        App.sectionPage.append(divMesPokemons);
    
        mesPokemons.forEach(pokemon => {
			const divSelection = new DivSelectionPokemon(pokemon, this.afficherFicheMonPokemon.bind(this));
			divMesPokemons.append(divSelection.div);
		});
    }

    static afficherFicheMonPokemon(pokemon) {
        App.sectionPage.innerHTML = "";
    
        const divFicheMesPokemons = document.createElement("div");
        divFicheMesPokemons.classList.add("divFicheMesPokemons");
        App.sectionPage.append(divFicheMesPokemons);

        const divFicheMonPokemon = document.createElement("div");
        divFicheMonPokemon.classList.add("divFicheMonPokemon");
        divFicheMonPokemon.innerHTML = `
            <div class="fiche">
                <div class="blockImage">
                    <p>${pokemon.nom}</p>
                    <p>${pokemon.espece}</p>
                    <img src="${pokemon.image}" alt="Image pokemon ${pokemon.espece}">
                    <span>Date de la capture : ${pokemon.dateCapture.toLocaleDateString()}</span>
                    <span>Niveau : ${pokemon.niveau}</span>
                </div>
                <div class="blockBoutons">
                    <div class="encadrePokemon boutonFicheMonPokemon boutonRenommerPokemon">
                        Renommer ${pokemon.nom}
                    </div>
                    <div class="encadrePokemon boutonFicheMonPokemon boutonEntrainerPokemon">
                        Entraîner ${pokemon.nom}
                    </div>
                    <div class="encadrePokemon boutonFicheMonPokemon boutonRelacherPokemon">
                        Relâcher ${pokemon.nom}
                    </div>
                </div>
            </div>
        `;
        divFicheMesPokemons.append(divFicheMonPokemon);

        const boutonRenommerPokemon = App.sectionPage.querySelector("boutonRenommerPokemon");
        boutonRenommerPokemon.onclick = () => {
            const nom = Pokemon.obtenirNomPokemon();
            if (!nom) {
                alert("Nom invalide");
                return null;
            }
            DAO.renommerPokemon(pokemon, nom);
            this.afficherFicheMonPokemon(pokemon);
        }

        const boutonRelacherPokemon = App.sectionPage.querySelector("boutonRelacherPokemon");
        boutonRelacherPokemon.onclick = () => {
            const confirmation = confirm(`Relâcher ${pokemon.nom} ?`);
            if (confirmation) {
                DAO.relacherPokemon(pokemon);
                this.clickBoutonMesPokemons();
            }
        }
    }
}