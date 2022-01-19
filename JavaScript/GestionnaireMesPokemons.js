import App from "./App"

export class GestionnaireMesPokemons {
    static clickBoutonMesPokemons() {
        App.sectionPage.innerHTML = "";
    
        const divPokeball = document.createElement("div");
        divPokeball.classList.add("divPokeball");
        App.sectionPage.append(divPokeball);
    
        const divBoutonPokeball = document.createElement("div");
        divBoutonPokeball.classList.add("divBoutonPokeball");
        divPokeball.append(divBoutonPokeball);
    
        const divMiniBoutonPokeball = document.createElement("div");
        divMiniBoutonPokeball.classList.add("divMiniBoutonPokeball");
        divBoutonPokeball.append(divMiniBoutonPokeball); /* Dans la div bouton, j'affiche la mini */
    }
}