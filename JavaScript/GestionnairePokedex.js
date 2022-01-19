import App from "./App";
import DAO from "./DAO";
import DivSelectionPokemon from "./Composants/DivSelectionPokemon"

export default class GestionnairePokedex {
    static async clickBoutonPokedex() {
        App.afficherLoaderSectionPage();                                // Début  affichage loader
        
        const mapPokemon = await DAO.telechargerDonneesPokemon();
        App.sectionPage.innerHTML = "";                               	// Fin affichage loader
    
        const divPokedex = document.createElement("div");
        divPokedex.classList.add("divPokedex");
        App.sectionPage.append(divPokedex);
    
        mapPokemon.forEach(pokemon => {
			const divSelection = new DivSelectionPokemon(pokemon, this.afficherFichePokemon.bind(this));
			divPokedex.append(divSelection.div);
		});
    }
    
    static afficherFichePokemon(pokemon) {
        App.sectionPage.innerHTML = "";
    
        const divFichePokedex = document.createElement("div");
        divFichePokedex.classList.add("divFichePokedex");
        App.sectionPage.append(divFichePokedex);
    
        const divFicheStat = document.createElement("div");
        divFicheStat.classList.add("divFicheStats");
        divFicheStat.innerHTML = `
            <div class="ligne1">
                <div class="blockImage">
                    <img src="${pokemon.image}" alt="Image pokemon ${pokemon.espece}">
                    <span>No.${pokemon.numero}</span>
                </div>
                <div class="blockEspece bordureFlechee">
                     <span class="especePokemon">${pokemon.espece.toUpperCase()}</span>
                    <div class="blockHP">
                        <div class="ligne1HP">
                            <span>HP:</span>
                            <div class="barreHP"></div>
                        </div>
                        <div class="ligne2HP">${pokemon.hp}/${pokemon.hp}</div>
                    </div>
                    <span class="statusPokemon">STATUS/OK</span>			
                </div>
            </div>
            <div class="ligne2">
                <div class="blockStats encadrePokemon">
                    <div class="ligneStat">
                        <span class="nomLigneStat">ATTACK</span>
                        <span class="valeurLigneStat">${pokemon.attaque}</span>
                    </div>
                    <div class="ligneStat">
                        <span class="nomLigneStat">DEFENSE</span>
                        <span class="valeurLigneStat">${pokemon.defense}</span>
                    </div>
                    <div class="ligneStat">
                        <span class="nomLigneStat">SPEED</span>
                        <span class="valeurLigneStat">${pokemon.vitesse}</span>
                    </div>
                    <div class="ligneStat">
                        <span class="nomLigneStat">SPECIAL</span>
                        <span class="valeurLigneStat">${pokemon.special}</span>
                    </div>
                </div>
                <div class="blockTypes bordureFlechee">
                    <div class="ligneType">
                        <span class="nomLigneType">TYPE<span>1</span>/</span>
                        <span class="valeurLigneType">${pokemon.type1}</span>
                    </div>
                    <div class="ligneType">
                        <span class="nomLigneType">TYPE<span>2</span>/</span>
                        <span class="valeurLigneType">${pokemon.type2}</span>
                    </div>
                    <div class="ligneType">
                        <span class="nomLigneType">IDNo/</span>
                        <span class="valeurLigneType ecartSupplementaire">${pokemon.numero}</span>
                    </div>
                    <div class="ligneType">
                        <span class="nomLigneType">OT/</span>
                        <span class="valeurLigneType ecartSupplementaire">ASH</span>
                    </div>			
                </div>
            </div>
        `;
        divFichePokedex.append(divFicheStat);
    
        const divFicheDesc = document.createElement("div");
        divFicheDesc.classList.add("divFicheDesc");
        divFicheDesc.innerHTML = `
            <div class="ligne1">
                <div class="blockImage">
                    <img src="${pokemon.image}" alt="Image pokémon ${pokemon.espece}">
                    <span>No.${pokemon.numero}</span>
                </div>
                <div class="blockEspece">
                    <span class="spanEspece">${pokemon.espece.toUpperCase()}</span>
                    <span class="spanGenre">${pokemon.genre.toUpperCase()}</span>
                    <div class="divTaille">
                        HT<span>${pokemon.taille}</span>
                    </div>
                    <div class="divPoids">
                        WT<span>${pokemon.poids}</span>lb
                    </div>
                </div>
            </div>
            <div class="separateur">
                <div class="carre carreGauche carre1"></div>
                <div class="carre carreGauche carre2"></div>
                <div class="carre carreGauche carre3"></div>
                <div class="carre carreGauche carre4"></div>
                <div class="carre carreDroite carre1"></div>
                <div class="carre carreDroite carre2"></div>
                <div class="carre carreDroite carre3"></div>
                <div class="carre carreDroite carre4"></div>
            </div>
            <div class="ligne2">
                ${pokemon.description}
            </div>
        `;
        divFichePokedex.append(divFicheDesc);
    }
}