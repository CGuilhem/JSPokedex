import DAO from "./DAO";
import GestionnaireMesPokemons from "./GestionnaireMesPokemons";
import GestionnairePokedex from "./GestionnairePokedex";

export default class App {
    static sectionPage;

    static init() {
        DAO.chargerMesPokemons();
        this.sectionPage = document.querySelector(".sectionPage");
        if (!this.sectionPage) {
            throw new Error("sectionPage introuvable");
        }
        const boutonPokedex = document.querySelector(".boutonPokedex");
        if (!boutonPokedex) {
            throw new Error("boutonPokedex introuvable");
        }
        boutonPokedex.addEventListener("click", GestionnairePokedex.clickBoutonPokedex.bind(GestionnairePokedex));

        const boutonMesPokemons = document.querySelector(".boutonMesPokemons");
        if (!boutonMesPokemons) {
            throw new Error("boutonMesPokemons introuvable");
        }
        boutonMesPokemons.addEventListener("click", GestionnaireMesPokemons.clickBoutonMesPokemons.bind(GestionnaireMesPokemons));
    }

    static afficherLoaderSectionPage() {
		//Je vide le contenu de sectionPage
		this.sectionPage.innerHTML = "";

		const divPokeball = document.createElement("div");  		
        divPokeball.classList.add("divPokeball");
        this.sectionPage.append(divPokeball);
    
        const divBoutonPokeball = document.createElement("div");
        divBoutonPokeball.classList.add("divBoutonPokeball");
        divPokeball.append(divBoutonPokeball);
    
        const divMiniBoutonPokeball = document.createElement("div");
        divMiniBoutonPokeball.classList.add("divMiniBoutonPokeball");
        divBoutonPokeball.append(divMiniBoutonPokeball); /* Dans la div bouton, j'affiche la mini */
	}
}

window.onload = App.init.bind(App); // On utilise bind pour retourner une copie de la méthode init en lui liant un contexte spécifique. Peu importe l'objet qui appelle init, on lui retournera le contexte de App. Si on ne le fait pas, sectionPage ne se verra pas attribuer de valeur lors de l'appel dans afficherLoaderSectionpage.