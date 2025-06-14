import { initalisiereAllePanel } from "./pages/dashboard/dashboard.js";
import { initalisiereRechercheuebersicht } from "./pages/rechercheuebersicht/rechercheuebersicht.js";



document.addEventListener('DOMContentLoaded', () => {

    const dashboardPanelContainer = document.querySelector("#dashboard-panel-container")
    if (dashboardPanelContainer){
        initalisiereAllePanel();
    }

    const dashboardMainBereich = document.querySelector("#main-dashboard")
    if (dashboardMainBereich) {
        initalisiereRechercheuebersicht();
    }


    
});