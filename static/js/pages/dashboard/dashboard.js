import { initialisiereLoeschungenSektion } from "./panels/loeschungen.js";
import { initialisiereAusleitungSektion } from "./panels/ausleitungen.js";
import { initialisiereBeschluesse } from "./panels/beschluesse.js";
import { initialisiereAufgabenSektion } from "./panels/aufgabe.js";
import { initialisiereHinweisSektion } from "./panels/hinweise.js";
import { initialisiereKameraZeitenSektion } from "./panels/kameraZeiten.js";


export function initalisiereAllePanel(){
    const panelContainer = document.querySelector("#dashboard-panel-container")
    if (panelContainer) {

        // Löschungen - Dashboard
        const loeschungSelektionElement = document.querySelector("#offene-loeschungen")
        if (loeschungSelektionElement){
            initialisiereLoeschungenSektion();
        }

        // Ausleitungen - Dashboard 
        const ausleitungenSektionElement = document.querySelector("#offene-ausleitungen")
        if(ausleitungenSektionElement){
            initialisiereAusleitungSektion();
        }

        // Beschlüsse - Dashboard
        const beschluesseSektionElement = document.querySelector("#uebersicht-beschluesse")
        if (beschluesseSektionElement) {
            initialisiereBeschluesse();
        }

        // Aufgabensektion - Dashboard
        const aufgabenSektionElement = document.querySelector("#offene-aufgaben")
        if (aufgabenSektionElement){
            initialisiereAufgabenSektion();
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

    }

}
