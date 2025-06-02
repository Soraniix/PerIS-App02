import { initialisiereAufgabenSektion } from "./aufgabe.js"
import { togglePanelVisibility } from "./uiHelpers.js"




// Var Deklaration & DOM 
const recherchePanel = document.querySelector("#panel-recherche-oeffnen")

let rechercheCloseBtn = null;
let btnZurueck = null;
let btnweiter = null;

if (recherchePanel) {
    // Grundfunktion Öffnen und Schließen von Recherchen
    rechercheCloseBtn = recherchePanel.querySelector(".close-button-new");

    // Btn Weiter / Zurück
    btnZurueck = recherchePanel.querySelector(".btn-zurueck");
    btnweiter = recherchePanel.querySelector(".btn-weiter");
}

let aktuellAusgewaehlteRecherchenFuerPanel = []
let aktuellerIndexImPanel = 0


// Events

//Schließen
if (rechercheCloseBtn) {
    rechercheCloseBtn.addEventListener("click", () => {
        closeRecherchePanel()
    })
}

// öffnen
if (recherchePanel) {

    btnZurueck.addEventListener("click", () => {
        if (aktuellerIndexImPanel == 0){
            aktuellerIndexImPanel = aktuellAusgewaehlteRecherchenFuerPanel.length -1
            console.log(aktuellerIndexImPanel)
            zeigeRechercheImPanel(recherchePanel, aktuellAusgewaehlteRecherchenFuerPanel, aktuellerIndexImPanel);
        } else {
            aktuellerIndexImPanel -= 1
            console.log(aktuellerIndexImPanel)
            zeigeRechercheImPanel(recherchePanel, aktuellAusgewaehlteRecherchenFuerPanel, aktuellerIndexImPanel);
        }
        
    })

    btnweiter.addEventListener("click", () => {
        if (aktuellerIndexImPanel == aktuellAusgewaehlteRecherchenFuerPanel.length -1 ){
            aktuellerIndexImPanel = 0
            console.log(aktuellerIndexImPanel)
            zeigeRechercheImPanel(recherchePanel, aktuellAusgewaehlteRecherchenFuerPanel, aktuellerIndexImPanel);
        } else {
            aktuellerIndexImPanel += 1
            console.log(aktuellerIndexImPanel)
            zeigeRechercheImPanel(recherchePanel, aktuellAusgewaehlteRecherchenFuerPanel, aktuellerIndexImPanel);
        }

    })
}

















//Funktionen

//Funktion Recherche Öffnen
export function openRecherchePanel(selecedRecherchen){ // Export funktion
    aktuellAusgewaehlteRecherchenFuerPanel = Array.from(selecedRecherchen); // Hier speichern wir die ausgewählten <tr> Elemente
    btnZurueck.disabled = false
    btnweiter.disabled = false
    aktuellerIndexImPanel = 0;

    // Prüfen, ob überhaupt Recherchen ausgewählt wurden
    if (selecedRecherchen.length === 0) {
        return; // Wenn nichts ausgewählt ist, beende die Funktion
    }

    if (aktuellAusgewaehlteRecherchenFuerPanel.length === 1)
    {
        btnZurueck.disabled = true
        btnweiter.disabled = true
    }
    zeigeRechercheImPanel(recherchePanel, aktuellAusgewaehlteRecherchenFuerPanel, aktuellerIndexImPanel);

    togglePanelVisibility(recherchePanel, true);
}



//Hilfsfunktion Recherche Inhalt anzeigen
function zeigeRechercheImPanel(showPanel, selecedRecherchen, index){ // Export funktion prüfen! 
    let zuZeigendeRecherche = selecedRecherchen[index]; // Das ausgewählte <tr> Element

    if (zuZeigendeRecherche) {
        // Hole Inhalt aus den Zellen (<td>) der ausgewählten Zeile
        // .textContent.trim() holt den reinen Text und entfernt führende/nachfolgende Leerzeichen
        const id = zuZeigendeRecherche.cells[0].textContent.trim();
        const vn = zuZeigendeRecherche.cells[1].textContent.trim();
        const name = zuZeigendeRecherche.cells[2].textContent.trim();
        const standort = zuZeigendeRecherche.cells[3].textContent.trim();
        const system = zuZeigendeRecherche.cells[4].textContent.trim();
        const delikt = zuZeigendeRecherche.cells[5].textContent.trim();
        const von = zuZeigendeRecherche.cells[6].textContent.trim();
        const bis = zuZeigendeRecherche.cells[7].textContent.trim();
        const grundErhebung = zuZeigendeRecherche.cells[8].textContent.trim();
        const grundErstellung = zuZeigendeRecherche.cells[9].textContent.trim();
        const ersteller = zuZeigendeRecherche.cells[10].textContent.trim();
        const erstelldatum = zuZeigendeRecherche.cells[11].value;
        const restlaufzeit = zuZeigendeRecherche.cells[12].textContent.trim();
        const ablaufdatum = zuZeigendeRecherche.cells[13].textContent.trim();
        const status = zuZeigendeRecherche.cells[14].textContent.trim();
        const loeschung = zuZeigendeRecherche.cells[15].textContent.trim();
        const loeschgrund = zuZeigendeRecherche.cells[16].textContent.trim();
        const loescher = zuZeigendeRecherche.cells[17].textContent.trim();
        const treffer = zuZeigendeRecherche.cells[18].textContent.trim();
        const anzahlTreffer = zuZeigendeRecherche.cells[19].textContent.trim();
        const ausgeleitet = zuZeigendeRecherche.cells[20].textContent.trim();
        const einsatz = zuZeigendeRecherche.cells[21].textContent.trim();
        const wartung = zuZeigendeRecherche.cells[22].textContent.trim();

        // Hole die Referenzen zu den HTML-Elementen im recherchePanel,
        // in die die Daten eingefügt werden sollen.
        // Verwende querySelector für Elemente mit ID.
        const openId = showPanel.querySelector("#recherche-id");
        const openVn = showPanel.querySelector("#recherche-vn");
        const openName = showPanel.querySelector("#recherche-name");
        const openStandort = showPanel.querySelector("#recherche-standort");
        const openSystem = showPanel.querySelector("#recherche-system");
        const openDelikt = showPanel.querySelector("#recherche-delikt");
        const openVon = showPanel.querySelector("#recherche-von");
        const openBis = showPanel.querySelector("#recherche-bis");
        const openGrundErhebung = showPanel.querySelector("#recherche-grundErhebung");
        const openGrundErstellung = showPanel.querySelector("#recherche-grundErstellung");
        const openErsteller = showPanel.querySelector("#recherche-ersteller");
        const openErstelldatum = showPanel.querySelector("#recherche-erstelldatum");
        const openRestlaufzeit = showPanel.querySelector("#recherche-restlaufzeit");
        const openAblaufdatum = showPanel.querySelector("#recherche-ablaufdatum");
        const openStatus = showPanel.querySelector("#recherche-status");
        const openLoeschung = showPanel.querySelector("#recherche-loeschung");
        const openLoeschgrund = showPanel.querySelector("#recherche-loeschgrund");
        const openLoescher = showPanel.querySelector("#recherche-loescher");
        const openTreffer = showPanel.querySelector("#recherche-treffer");
        const openAnzahlTreffer = showPanel.querySelector("#recherche-anzahlTreffer");
        const openAusgeleitet = showPanel.querySelector("#recherche-ausgeleitet");
        const openEinsatz = showPanel.querySelector("#recherche-einsatz");
        const openWartung = showPanel.querySelector("#recherche-wartung");

        // Weisen die extrahierten Werte den entsprechenden HTML-Elementen zu.
        // Die meisten Input-Felder verwenden die 'value'-Eigenschaft.
        // Für Elemente wie <p>, <span> oder <div> würdest du .textContent verwenden.
        if (openId) openId.value = id;
        if (openVn) openVn.value = vn;
        if (openName) openName.value = name;
        if (openStandort) openStandort.value = standort;
        if (openSystem) openSystem.value = system;
        if (openDelikt) openDelikt.value = delikt;
        if (openVon) openVon.value = von;
        if (openBis) openBis.value = bis;
        if (openGrundErhebung) openGrundErhebung.value = grundErhebung;
        if (openGrundErstellung) openGrundErstellung.value = grundErstellung;
        if (openErsteller) openErsteller.value = ersteller;
        if (openErstelldatum) openErstelldatum.value = erstelldatum;
        if (openRestlaufzeit) openRestlaufzeit.value = restlaufzeit;
        if (openAblaufdatum) openAblaufdatum.value = ablaufdatum;
        if (openStatus) openStatus.value = status;
        if (openLoeschung) openLoeschung.value = loeschung;
        if (openLoeschgrund) openLoeschgrund.value = loeschgrund;
        if (openLoescher) openLoescher.value = loescher;
        if (openTreffer) openTreffer.value = treffer;
        if (openAnzahlTreffer) openAnzahlTreffer.value = anzahlTreffer;
        if (openAusgeleitet) openAusgeleitet.value = ausgeleitet;
        if (openEinsatz) openEinsatz.value = einsatz;
        if (openWartung) openWartung.value = wartung;

        // Wenn du ein Element hast, das kein Input ist (z.B. ein <p> Tag):
        // const someParagraph = recherchePanel.querySelector("#some-paragraph-id");
        // if (someParagraph) someParagraph.textContent = someValue;

    } else {
        console.warn("Keine Recherche für den Index", index, "gefunden.");
    }
}








//Funktion Recherche Schließen
function closeRecherchePanel() { // Export funktion! Prüfen ob notwendig

    togglePanelVisibility(recherchePanel, false)
}







