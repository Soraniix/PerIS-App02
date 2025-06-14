import { initialisiereRechercheTabelleFilter } from "./filterRechercheTabelle.js";
import { initialisiereRechercheAddPanel } from "./addRecherche.js";


export function initalisiereRechercheuebersicht(){

    const mainBereich = document.querySelector("#main-dashboard")
    if (mainBereich) {

        // Add-Panel-Recherche - Rechercheübersicht
        const containerPanelNeueRechercheElement = document.querySelector("#panel-recherche-hinzufuegen")
        if (containerPanelNeueRechercheElement) {
            initialisiereRechercheAddPanel();
        }
        
        
        // Filterlogik aus der Rechercheübersicht-Tabelle 
        const sucheLogikSektionElement = document.querySelector(".filter-tools-tabelle")
        if (sucheLogikSektionElement) {
            initialisiereRechercheTabelleFilter();
        }

    }

}


