import { initialisiereHinweisSektion } from "./hinweise.js";
import { initialisiereKameraZeitenSektion } from "./kameraZeiten.js";
import { initialisiereRechercheTabelleFilter } from "./filterRechercheTabelle.js";
import { initialisiereAufgabenSektion } from "./aufgabe.js";
import { initialisiereBeschluesse } from "./beschluesse.js";
import { initialisiereAusleitungSektion } from "./ausleitungen.js";
import { initialisiereLoeschungenSektion } from "./loeschungen.js";


document.addEventListener('DOMContentLoaded', () => {
    // Filterlogik aus der Rechercheübersicht-Tabelle 
    const sucheLogikSektionElement = document.querySelectorAll(".filter-tools-tabelle")
    if (sucheLogikSektionElement) {
        initialisiereRechercheTabelleFilter();
    }

    // Löschungen - Dashboard
    const loeschungSelektionElement = document.querySelector("#offene-loeschungen")
    if (loeschungSelektionElement){
        initialisiereLoeschungenSektion()
    }

    // Ausleitungen - Dashboard 
    const ausleitungenSektionElement = document.querySelector("#offene-ausleitungen")
    if(ausleitungenSektionElement){
        initialisiereAusleitungSektion()
    }

    // Beschlüsse - Dashboard
    const beschluesseSektionElement = document.querySelector("#uebersicht-beschluesse")
    if (beschluesseSektionElement) {
        initialisiereBeschluesse()
    }

    // Aufgabensektion - Dashboard
    const aufgabenSektionElement = document.querySelector("#offene-aufgaben")
    if (aufgabenSektionElement){
        initialisiereAufgabenSektion()
    }

    // Hinweissektion - Dashboard
    const hinweisSektionElement = document.querySelector("#hinweise")
    if (hinweisSektionElement) {
        initialisiereHinweisSektion();
    }
    
    // Kamerazeiten - Dashboard
    const kameraZeitenSektionElement = document.querySelector("#kamera-zeiten")
    if (kameraZeitenSektionElement) {
        initialisiereKameraZeitenSektion();
    }
});