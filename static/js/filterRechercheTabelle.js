import { togglePanelVisibility } from "./uiHelpers.js";
import { openRecherchePanel } from "./oeffneRecherche.js";



export function initialisiereRechercheTabelleFilter(){
    const filterSektion = document.querySelector(".filter-tools-tabelle")


    if (filterSektion) {
        // Volltextsuche
        const sucheInput = filterSektion.querySelector("#tabelleSucheInput")
        const spaltenAuswahl = filterSektion.querySelector(".auswahl-suche")
        const rechercheTabellenZeilen = document.querySelectorAll(".recherche-tabelle tbody tr");
        
        // FilterbuttonSystem
        const filterBtnsSystem = filterSektion.querySelectorAll(".filter-btn-system button")

        // FilterGrundButton
        const filterBtnsGrund = filterSektion.querySelectorAll(".filter-btn-grund button")

        // FilterTypButton
        const filterBtnsTyp = filterSektion.querySelectorAll(".filter-btn-typ button")

        // FilterStatus
        const filterBtnsStatus = filterSektion.querySelectorAll(".filter-btn-status button")

        // Filter Standort
        const filterBtnsStandort = filterSektion.querySelectorAll(".filter-btn-standort input")

        // Filter für ausstehende Löschungen
        const filterBtnAusstehendeLoeschung = filterSektion.querySelector(".ausstehende-loeschung")

        // Filter für ausstehende Treffer
        const filterBtnAusstehendeTreffer = filterSektion.querySelector(".ausstehende-treffer")
        
        // Shift Seleced:
        let letzterAnkerZeilenIndex = -1;

        // Kontextmenü
        const kontextMenue = document.querySelector(".kontext-menue")
        const tabellenKoerper = document.querySelector(".recherche-tabelle tbody")
        const kontextMenueButtons = kontextMenue.querySelectorAll("ul li button")











        

        // Event ausstehende Treffer
        if (filterBtnAusstehendeTreffer){
            filterBtnAusstehendeTreffer.addEventListener("click", () => {
                filterBtnAusstehendeTreffer.classList.toggle("active")
                tabellenFilter()
            })
        }
        // Event ausstehende Löschung
        if (filterBtnAusstehendeLoeschung){
            filterBtnAusstehendeLoeschung.addEventListener("click", () => {
                filterBtnAusstehendeLoeschung.classList.toggle("active")
                tabellenFilter()
            })
        }
        // Event für Filter Standort
        if (filterBtnsStandort){
            filterBtnsStandort.forEach(standort => {
                standort.addEventListener("change", ()=> {
                    tabellenFilter()
                })
            })
        }
        // Event für Filter Status
        if (filterBtnsStatus) {
            filterBtnsStatus.forEach(btn => {
                btn.addEventListener("click", ()=> {
                    btn.classList.toggle("active")
                    tabellenFilter()
                })
            })
        }
        // Event für Filter Typ
        if (filterBtnsTyp) {
            filterBtnsTyp.forEach(btn => {
                btn.addEventListener("click", () => {
                    btn.classList.toggle("active")
                    tabellenFilter()
                })
            })
        }
        // Event für Filter Grund
        if (filterBtnsGrund) {
            filterBtnsGrund.forEach(btn => {
                btn.addEventListener("click", ()=> {
                    btn.classList.toggle("active")
                    tabellenFilter()
                })
            })
        }
        // Event für Volltextsuche
        if (sucheInput && spaltenAuswahl && (rechercheTabellenZeilen.length > 0)) {
            sucheInput.addEventListener("input", tabellenFilter)
            spaltenAuswahl.addEventListener("change", tabellenFilter)
        }
        // Event für System-Filter-Buttons
        if (filterBtnsSystem) {
            filterBtnsSystem.forEach(button => {
                button.addEventListener("click", () => {
                    button.classList.toggle("active")
                    tabellenFilter()
                })
            })
            
        }
        // Event für Row-Seleced
        if (rechercheTabellenZeilen){
            rechercheTabellenZeilen.forEach(zeile => {
                zeile.addEventListener("click", (event) => {
                    rowSelecting(event)
                })
            })
        }
        // Kontextmenü öffnen
        if (kontextMenue && tabellenKoerper) {
            tabellenKoerper.addEventListener("contextmenu", (event) => {
                kontextMenuShow(event)
            })
        }
        // Event Kontextmenü Handler Aufruf
        if (kontextMenueButtons){
            kontextMenueButtons.forEach(btn => {
                btn.addEventListener("click", (event) => {
                    handleKontextMenueAktion(event)
                })
            })
        }

        // Event Dokument
        document.addEventListener("click", (event) => {
            if (event.target.closest("#kontext-menue-rechercheuebersicht") !== kontextMenue){
                togglePanelVisibility(kontextMenue, false)
            }
        })










        // Funktion Ausstehende Treffer
        function filterAusstehendeTreffer(zeile){
            if (filterBtnAusstehendeTreffer.classList.contains("active")){
                const indexAusgeleitet = 20
                const indexTreffer = 18
                const zellenWertAusgeleitet = zeile.cells[indexAusgeleitet].textContent.trim().toLowerCase()
                const zellenWertTreffer = zeile.cells[indexTreffer].textContent.trim().toLowerCase()

                if (zellenWertAusgeleitet === "nein" && zellenWertTreffer === "ja" )
                    return true
            } else {
                return true
            }
        }

        // Funktion Ausstehende Löschungen
        function filterAusstehendeLoeschung(zeile){
            if (filterBtnAusstehendeLoeschung.classList.contains("active")){
                const indexLoeschung = 15
                const zellenWert = zeile.cells[indexLoeschung].textContent.trim().toLowerCase()

                if (zellenWert === "vorgemerkt")
                    return true
            } else {
                return true
            }
        }

        //Funktion Filter Standort
        function filterBtnStandort(zeile){
            const aktiveStandorte = Array.from(filterBtnsStandort).filter(opt => opt.checked)

            if (aktiveStandorte.length === 0)
                return true

            const aktiveWerte = aktiveStandorte.map(standort => standort.value)
            const spaltenIndex = 3
            const zellenInhalt = zeile.cells[spaltenIndex].textContent.trim().toLowerCase()

            return aktiveWerte.some(wert => zellenInhalt.includes(wert))
        }

        // Funktion Filter Status
        function filterBtnStatus(zeile){
            const aktiveBtn = Array.from(filterBtnsStatus).filter(btn => btn.classList.contains("active"))

            if (aktiveBtn.length === 0)
                return true

            const aktiveWerte = aktiveBtn.map(btn => btn.textContent.trim().toLowerCase())
            const spaltenIndex = 14
            const zellenInhalt = zeile.cells[spaltenIndex].textContent.trim().toLowerCase()

            return aktiveWerte.some(wert => zellenInhalt.includes(wert))

        }

        // Funktion Filter Typ
        function filterBtnTyp(zeile){
            const aktiveBtn = Array.from(filterBtnsTyp).filter(btn => btn.classList.contains("active"))

            if (aktiveBtn.length === 0){
                return true
            }

            const nameZuSpaltenindex= {"treffer": 18, "einsatz": 21, "wartung": 22}
            const aktiveWerte = aktiveBtn.map(btn => btn.textContent.trim().toLowerCase())
            
            return aktiveWerte.every(pruefung => {
                const spaltenIndex = nameZuSpaltenindex[pruefung]
                if (spaltenIndex === undefined)
                    return false
                const zelle = zeile.cells[spaltenIndex]
                return zelle && zelle.textContent.trim().toLowerCase() === "ja"

            }) 

        }

        // Funktion Filter Grund
        function filterBtnGrund(zeile){
            
            const aktiveGrundBtn = Array.from(filterBtnsGrund).filter(btn => btn.classList.contains("active"))
            
            if (aktiveGrundBtn.length === 0)
                return true

            const aktiveWerte = aktiveGrundBtn.map(btn => btn.textContent.trim().toLowerCase())
            const spaltenIndex = 9
            const zellenInhalt = zeile.cells[spaltenIndex].textContent.trim().toLowerCase()
            return aktiveWerte.some(wert => zellenInhalt.includes(wert))



        }

        // Funktion der System-Filter-Buttons
        function filterBtnSystem(zeile) {
            const activeFilterButton = Array.from(filterBtnsSystem).filter(btn => btn.classList.contains("active"));
            
            if (activeFilterButton.length === 0) {
                return true
            } 
            const aktiveWerte = activeFilterButton.map(btn => btn.value || btn.textContent.trim().toLowerCase())
            const spaltenIndex = 4
            const zellenInhalt = zeile.cells[spaltenIndex].textContent.trim().toLowerCase()
            return aktiveWerte.some(wert => zellenInhalt.includes(wert)) 

        }

        // Funktion der Volltext-Filter
        function filterVolltext(zeile){
            const suchbegriff = sucheInput.value.trim().toLowerCase();
            const suchSpalte = spaltenAuswahl.value;
            const spaltenIndizes = {
                                    "id": 0,
                                    "vn": 1,
                                    "name": 2,
                                    "standort": 3,
                                    "system": 4,
                                    "delikt": 5,
                                    "von": 6,
                                    "bis": 7,
                                    "grund-erhebung": 8,    // Beachte: Bindestrich im value, daher String-Schlüssel
                                    "grund-erstellung": 9,  // Beachte: Bindestrich im value
                                    "ersteller": 10,
                                    "erstelldatum": 11,
                                    "restlaufzeit": 12,
                                    "ablaufdatum": 13,
                                    "status": 14,
                                    "löschung": 15,        // Beachte: Umlaute im value
                                    "löschgrund": 16,      // Beachte: Umlaute im value
                                    "löscher": 17,         // Beachte: Umlaute im value
                                    "treffer": 18,
                                    "anzahl-treffer": 19,  // Beachte: Bindestrich im value
                                    "ausgeleitet": 20,
                                    "einsatz": 21,
                                    "wartung": 22
                                };

            // KORREKTUR HIER:
            if (suchbegriff === "") { // Wenn das Suchfeld leer ist, passt JEDE Zeile zu DIESEM Filter
                return true;
            }

            let matchGefunden = false; // Initialisiere mit false

            if (suchSpalte === "all") {
                const alleZellen = zeile.querySelectorAll("td"); // oder zeile.cells
                // Deine forEach-Schleife hier ist gut, aber sie braucht eine Möglichkeit,
                // matchGefunden zu setzen und die Schleife dann effektiv zu beenden.
                // Einfacher mit .some() oder einer for...of Schleife:
                for (const zelle of Array.from(alleZellen)) { // Array.from, falls querySelectorAll eine NodeList liefert, die .some nicht direkt hat
                    if (zelle.textContent.trim().toLowerCase().includes(suchbegriff)) {
                        matchGefunden = true;
                        break; // Verlässt die for...of Schleife, sobald ein Treffer da ist
                    }
                }
            } else {
                const zielSpaltenIndex = spaltenIndizes[suchSpalte];
                if (zielSpaltenIndex !== undefined) {
                    const spezifischeZelle = zeile.cells[zielSpaltenIndex];
                    if (spezifischeZelle) { // if (spezifischeZelle !== undefined) war auch ok
                        const normalSpezifischeZelle = spezifischeZelle.textContent.trim().toLowerCase();
                        if (normalSpezifischeZelle.includes(suchbegriff)) {
                            matchGefunden = true; // Hier war vorher ein 'return true', das beendet die Funktion
                        }
                    }
                }
            }
            return matchGefunden; // Gib am Ende zurück, ob ein Match gefunden wurde oder nicht
        }

        // Funktion Markieren
        function rowSelecting(event){
            
            if(event.shiftKey) {

                if (letzterAnkerZeilenIndex !== -1){
                    const aktuellerShiftKlickIndex = Array.from(rechercheTabellenZeilen).indexOf(event.currentTarget)
                    
                    const startIndex = Math.min(aktuellerShiftKlickIndex, letzterAnkerZeilenIndex)
                    const endIndex = Math.max(aktuellerShiftKlickIndex, letzterAnkerZeilenIndex)
                    
                    //rechercheTabellenZeilen.forEach(zeile => zeile.classList.remove("row-selected"))

                    for (let i = startIndex; i <= endIndex; i++){
                        const elementDisplay = window.getComputedStyle(rechercheTabellenZeilen[i]).display
                        if (elementDisplay !== "none") {
                            rechercheTabellenZeilen[i].classList.add("row-selected")
                        }
                        
                    }

                } else {
                    event.currentTarget.classList.toggle("row-selected")
                    letzterAnkerZeilenIndex = Array.from(rechercheTabellenZeilen).indexOf(event.currentTarget)
                }
            }
            else if(event.ctrlKey || event.metaKey) {
                event.currentTarget.classList.toggle("row-selected")
                letzterAnkerZeilenIndex = Array.from(rechercheTabellenZeilen).indexOf(event.currentTarget)
            } else {
                rechercheTabellenZeilen.forEach(zeile => zeile.classList.remove("row-selected"))
                event.currentTarget.classList.add("row-selected")
                letzterAnkerZeilenIndex = Array.from(rechercheTabellenZeilen).indexOf(event.currentTarget)
            }
        }

        // Funktion Kontextmenü
        function kontextMenuShow(event){
            event.preventDefault()
            kontextMenue.style.left = event.pageX + 'px'
            kontextMenue.style.top = event.pageY + 'px'
            togglePanelVisibility(kontextMenue, true)
            
        }








        // Kontext Handler
        function handleKontextMenueAktion(event){
            const aktionsLi = event.currentTarget.closest("li")
            const selecedRecherchen = document.querySelectorAll("tbody .row-selected")
            if (aktionsLi.classList.contains("set-anzeigen")){
                openRecherchePanel(selecedRecherchen)
            }
            togglePanelVisibility(kontextMenue, false);
        }

        // Filter Zusammenschluss 
        function tabellenFilter() {
            rechercheTabellenZeilen.forEach(zeile => {
                
                // Hole die Ergebnisse deiner Hilfsfunktionen
                const bestehtVolltextFilter = filterVolltext(zeile);
                const bestehtSystemFilter = filterBtnSystem(zeile);
                const bestehtGrundFilter = filterBtnGrund(zeile);
                const bestehtTypFilter = filterBtnTyp(zeile);
                const bestehtStatusFilter = filterBtnStatus(zeile);
                const bestehtStandortFilter = filterBtnStandort(zeile);
                const bestehtLoeschungFilter = filterAusstehendeLoeschung(zeile);
                const bestehtAusleitungFilter = filterAusstehendeTreffer(zeile);

                if (bestehtVolltextFilter && bestehtSystemFilter && bestehtGrundFilter && bestehtTypFilter && bestehtStatusFilter && bestehtStandortFilter && bestehtLoeschungFilter && bestehtAusleitungFilter) {
                    zeile.style.display = "";
                } else {
                    zeile.style.display = "none";
                }
            });
        }

    }

}    

