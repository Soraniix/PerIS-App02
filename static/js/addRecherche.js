import { togglePanelVisibility } from "./uiHelpers.js";


export function initialisiereRechercheAddPanel() {
    const containerPanelNeueRecherche = document.querySelector("#panel-recherche-hinzufuegen")

    if (true) {
        // Öffnen - Schließen Panel Add Recherche
        const addPanelNeueRecherche = document.querySelector(".panel-content")
        const addPanelCloseBtn = document.querySelector(".close-button-new")
        const addPanelOeffnenBtn = document.querySelector(".open-button")
        const addPanelRahmen = document.querySelector("#panel-recherche-hinzufuegen")








        // Event Öffnen / Schließen Add Panel
        if(addPanelNeueRecherche && addPanelCloseBtn && addPanelOeffnenBtn) {
            addPanelCloseBtn.addEventListener("click", closeAddRecherchePanel)
            addPanelOeffnenBtn.addEventListener("click", openAddRecherchePanel)
        }











        // Funktion Close Panel Add-Recherche
        function closeAddRecherchePanel(){
            togglePanelVisibility(addPanelNeueRecherche, false)
            togglePanelVisibility(addPanelRahmen, false)
        }

        // Funktion Open Panel Add-Recherche
        function openAddRecherchePanel(){
            togglePanelVisibility(addPanelNeueRecherche, true)
            togglePanelVisibility(addPanelRahmen, true)
        }
    }

}

