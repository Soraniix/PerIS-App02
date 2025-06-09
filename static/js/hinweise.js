import { togglePanelVisibility } from "./uiHelpers.js";
import { markiereListenElementAlsSelektiert } from "./uiHelpers.js";

export function initialisiereHinweisSektion(){
    console.log("initialisiere Hinweise...");

    const hinweisSektion = document.querySelector("#hinweise")
    if (hinweisSektion){
        // Elemente 
        const addNoteButton = hinweisSektion.querySelector('.add-button');
        const addNotePanel = hinweisSektion.querySelector('.dashboard-add-panel');

        const closeNoteButton = hinweisSektion.querySelector(".dashboard-add-panel .close-button-new")
        const addNoteForm = hinweisSektion.querySelector(".dashboard-add-panel form")
        const filterTabButtons = hinweisSektion.querySelectorAll(".filter-tabs button")

        const closeNoteInfoButton = hinweisSektion.querySelector(".dashboard-details-panel .close-button-new")
        const changeNoteInfoButton = hinweisSektion.querySelector(".dashboard-details-panel .change-button")
        const changeListe = hinweisSektion.querySelectorAll(".change-info")
        const panelNoteDetails = hinweisSektion.querySelector(".dashboard-details-panel")
        const panelForm = hinweisSektion.querySelector(".dashboard-details-panel form")
        const saveNoteInfoButton = hinweisSektion.querySelector(".dashboard-details-panel .save-button");

        const hinweiseListe  =  hinweisSektion.querySelectorAll(".hinweis-liste li")
        const hinweisListeUl = hinweisSektion.querySelector(".hinweis-liste");
        const delListButton = hinweisSektion.querySelector(".del-button")
        const USER = "Nico"








        // Events
        
        // Event klick auf add button
        if (addNoteButton) {
        addNoteButton.addEventListener('click', () => {
            togglePanelVisibility(addNotePanel, true)
        });
        }

        // Event klick auf den Close btn
        if (closeNoteButton) {
            // Wenn auf close-button geklickt wird, ...
        closeNoteButton.addEventListener("click", () => {
            togglePanelVisibility(addNotePanel, false)

        })
        }

        if (closeNoteInfoButton) {
            closeNoteInfoButton.addEventListener("click", () => {
                togglePanelVisibility(panelNoteDetails, false)
                panelForm.reset()
                changeListe.forEach(e => e.disabled = true)
            })
        }

        if (changeNoteInfoButton) {
            changeNoteInfoButton.addEventListener("click", () => {
                changeListe.forEach(element => {
                    if (element.disabled) {
                        element.disabled = false
                        changeNoteInfoButton.textContent = "Abbrechen"
                        saveNoteInfoButton.classList.remove("hidden")
                    } else {
                        element.disabled = true
                        changeNoteInfoButton.textContent = "Bearbeiten"
                        saveNoteInfoButton.classList.add("hidden")
                    }
                    
                })

            })
        }

        // Event Ändere Hinweise
        if (saveNoteInfoButton) {
            saveNoteInfoButton.addEventListener("click", (event) => {
                event.preventDefault()
                saveHinweise()
            })  
        }



        // Event hinzufügen von Recherchen
        if(addNoteForm) {
        addNoteForm.addEventListener('submit', async function(event) {
                if (!addNoteForm.checkValidity()) {
                    return;
                }
                event.preventDefault();

                const titel = addNoteForm.querySelector("#note-title").value;
                const text = addNoteForm.querySelector("#note-text").value;
                const prio = addNoteForm.querySelector("#note-prio").value;
            
                const visChecker = addNoteForm.querySelector('input[name="visibility"]:checked');
                const vis = visChecker ? visChecker.value : null;


                const neueHinweisDaten = {
                    "titel": titel,
                    "inhalt": text,
                    "prioritaet": prio,
                    "sichtbarkeit": vis,
                    "zuletzt_geaendert_am": null
                }

                try {
                    const response = await fetch("/api/hinweise", {
                        method: "Post",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify(neueHinweisDaten)
                    });
                    // Innerhalb des try-Blocks:
                    // const response = await fetch(...); // Deine fetch-Zeile

                    // ... (Anfang des try-Blocks mit fetch und if(!response.ok) bleibt gleich) ...

                    if (!response.ok) {
                        // ... (deine Fehlerbehandlung für !response.ok) ...
                        throw new Error(`HTTP Fehler! Status: ${response.status}`);
                    }

                    // Wenn wir hier sind, war response.ok true!
                    const erstellterHinweisInfo = await response.json(); // Antwort als JSON verarbeiten
                    console.log("Erfolgreich gespeichert! Server-Antwort:", erstellterHinweisInfo);

                    // Frontend aktualisieren:
                    if (typeof ladeUndZeigeHinweise === 'function') { // Sicherstellen, dass die Funktion existiert
                        ladeUndZeigeHinweise(); // Lädt die Liste neu vom Server
                    }
                    panelForm.reset(); // Formular zurücksetzen
                    togglePanelVisibility(addNotePanel, false); // Panel schließen

                } catch (error) {
                    console.error("Fehler beim Senden/Speichern des neuen Hinweises:", error);
                    alert("Es gab einen Fehler beim Speichern des Hinweises: " + error.message);
                }



            });
        }

        // Event Filterbutton
        filterTabButtons.forEach(function(einButton) {
            einButton.addEventListener("click", function(event){
                if (einButton.classList.contains("active")){
                    einButton.classList.remove("active")
                } else {
                    einButton.classList.add("active")
                }
                filterHinweiseAnzeigen();
            })  
        })



        // Event zum Löschen von Hinweise
        if (delListButton) {
            delListButton.addEventListener("click", async () => {
                
                const hinweiseListeLi  =  hinweisSektion.querySelector(".hinweis-liste li.selected")
                if(hinweiseListeLi){
                    const idSelected = hinweiseListeLi.dataset.noteId
                    const check = confirm("Sind Sie sich sicher, dass Sie diesen Hinweis löschen möchsten?")
                    if (check) {
                        try {
                            const response = await fetch(`/api/hinweise/${idSelected}`, {method: "DELETE"})
                            if(!response.ok){
                                throw new Error(`HTTP Fehler! Status: ${response.status}`)
                            }
                            const erstelleHinweisInfor = await response.json();
                            console.log("Erfolgreich gelöscht! Server Antwort:", erstelleHinweisInfor)

                            if (typeof ladeUndZeigeHinweise === "function") {
                                ladeUndZeigeHinweise()
                            }
                            panelForm.reset()
                            togglePanelVisibility(panelNoteDetails, false)

                        }
                        catch (error) {
                            console.error("Fehler beim Löschen des Hinweises", error)
                            alert("Fehler beim Löschen des Hinweises: "+ error.message)
                        }
                    }
                }

                console.log("Löschen-Button im Hinweis-Detail-Panel geklickt")
            })
        }



        // Funktion Anzeige von Hinweisen
        function filterHinweiseAnzeigen() {
        const hinweiseListe = hinweisSektion.querySelectorAll('#hinweise .hinweis-liste li'); 
            // Finde alle aktiven Filter
            const aktiveFilter = Array.from(filterTabButtons)
                .filter(btn => btn.classList.contains("active"))
                .map(btn => btn.textContent.trim().toLowerCase());

                hinweiseListe.forEach(function(listeItem) {
                // Standard: ausblenden
                listeItem.classList.add("hidden");

                // Sichtbarkeit prüfen
                if (
                    (aktiveFilter.includes("öffentlich") && listeItem.classList.contains("note-public")) ||
                    (aktiveFilter.includes("privat") && listeItem.classList.contains("note-private"))
                ) {
                    listeItem.classList.remove("hidden");
                }
            });
        }
        hinweiseListe.forEach(eintrag => {
            eintrag.addEventListener("click", () => {
                oeffnenDetailsHinweise(eintrag)
            })
        })

        // Funktion öffnen von einem Hinweis
        function oeffnenDetailsHinweise(eintrag){
            const hinweiseListeLi  =  hinweisSektion.querySelectorAll(".hinweis-liste li")
            markiereListenElementAlsSelektiert(eintrag, hinweiseListeLi)

            changeNoteInfoButton.textContent = "Bearbeiten"
            saveNoteInfoButton.classList.add("hidden")

            if (!panelNoteDetails)
                return;

            const titel = eintrag.querySelector(".note-title").textContent
            const meta = eintrag.querySelector(".note-meta").textContent
            const metaZwei = eintrag.querySelector(".meta-02").textContent
            const prio = eintrag.querySelector(".note-prio-badge").childNodes[0].textContent.trim().toLowerCase()
            const vis = eintrag.querySelector(".note-vis-badge").textContent.trim().toLowerCase()
            const noteBody = eintrag.querySelector(".note-body").textContent
            
            


            const detailsTitel = panelNoteDetails.querySelector(".details-titel")
            const detailsMeta = panelNoteDetails.querySelector(".details-meta")
            const detailsMeta02 = panelNoteDetails.querySelector(".meta-02")
            const detailsPrio = panelNoteDetails.querySelector(".note-details-prio")
            const detailsVis = panelNoteDetails.querySelector(`input[name="note-details-vis"][value="${vis}"]`)
            const detailsNoteBody = panelNoteDetails.querySelector(".details-content")


            if (detailsTitel) detailsTitel.value = titel;
            if (detailsMeta) detailsMeta.value = meta;
            if (metaZwei) detailsMeta02.value = metaZwei;
            if (detailsPrio) detailsPrio.value = prio;
            if (detailsVis) detailsVis.checked = true;
            if (detailsNoteBody) detailsNoteBody.value = noteBody;

            togglePanelVisibility(panelNoteDetails, true)
        }
        // Funktion zum Ändern der Hinweise
        async function saveHinweise() {
            const selectedList = hinweisSektion.querySelector("#hinweise .hinweis-liste .selected")
            
                if (!selectedList) return
            
                const neuerTitel = panelNoteDetails.querySelector("#details-titel").value;
                const neuerInhalt = panelNoteDetails.querySelector("#details-content").value;
                const neuePrio = panelNoteDetails.querySelector("#note-details-prio").value;
                const neueVis = panelNoteDetails.querySelector('input[name="note-details-vis"]:checked')?.value || "public";
                const idVonGeaenderteID = selectedList.dataset.noteId

                const geaenderteDaten = { 
                    "titel": neuerTitel,
                    "inhalt": neuerInhalt,
                    "prioritaet": neuePrio,
                    "sichtbarkeit": neueVis,
                    "zuletzt_geaendert_am": null
                }
                
                try {
                    const response = await fetch(`/api/hinweise/${idVonGeaenderteID}`,{
                        method: "PUT",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify(geaenderteDaten)
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP Fehler! Status: ${response.status}`);
                    }

                    const erstelleHinweiseInfo = await response.json()
                    console.log("Erfolgreich geändert! Server Antwort:", erstelleHinweiseInfo)

                    if (typeof ladeUndZeigeHinweise === "function") {
                        ladeUndZeigeHinweise();
                    }

                    panelForm.reset()
                    togglePanelVisibility(panelNoteDetails, false)
                    changeListe.forEach(e => e.disabled = true)
                    changeNoteInfoButton.textContent = "Bearbeiten"
                    saveNoteInfoButton.classList.add("hidden")

                }
                catch (error) {
                    console.error("Fehler beim ändern der Daten", error);
                    alert("Es gab einen Fehler beim Versuch die Daten zu ändern: " + error.message);
                }

        }
        // Funktion Lade Hinweise aus DB
        async function ladeUndZeigeHinweise() {
            console.log("Versuche, Hinweise vom Backend zu laden...");
            const hinweisListeUl = hinweisSektion.querySelector(".hinweis-liste"); // Stelle sicher, dass diese Variable korrekt auf deine <ul> zeigt

            if (!hinweisListeUl) {
                console.error("Hinweis-Liste UL nicht gefunden!");
                return;
            }

            try {
                const response = await fetch("/api/hinweise");
                if (!response.ok) {
                    throw new Error(`HTTP Fehler! Status: ${response.status}`);
                }
                const hinweisDatenArray = await response.json();
                console.log("Empfangene Hinweise:", hinweisDatenArray);

                hinweisListeUl.innerHTML = ""; // Liste leeren, BEVOR neue Elemente hinzugefügt werden

                if (hinweisDatenArray.length === 0) {
                    hinweisListeUl.innerHTML = "<li><p>Keine Hinweise vorhanden.</p></li>"; // Nachricht für leere Liste
                    return;
                }

                hinweisDatenArray.forEach(hinweis => {
                    const newList = document.createElement("li");
                    newList.dataset.noteId = hinweis.id;

                    const prioritaetKlein = hinweis.prioritaet ? hinweis.prioritaet.toLowerCase().trim() : "niedrig";
                    const sichtbarkeitKlein = hinweis.sichtbarkeit ? hinweis.sichtbarkeit.toLowerCase().trim() : "privat";

                    if (prioritaetKlein === "niedrig") newList.classList.add("prio-niedrig");
                    else if (prioritaetKlein === "mittel") newList.classList.add("prio-mittel");
                    else if (prioritaetKlein === "hoch") newList.classList.add("prio-hoch");

                    if (sichtbarkeitKlein === "öffentlich" || sichtbarkeitKlein === "public") newList.classList.add("note-public");
                    else if (sichtbarkeitKlein === "privat") newList.classList.add("note-private");


                    const erstelldatumFormatiert = hinweis.erstelldatum 
                        ? new Date(hinweis.erstelldatum).toLocaleString('de-DE', { dateStyle: 'short', timeStyle: 'short' }) 
                        : 'Unbekannt';

                    const updateDatumFormatiert = hinweis.zuletzt_geaendert_am 
                        ? new Date(hinweis.zuletzt_geaendert_am).toLocaleString("de-DE", {dateStyle: 'short', timeStyle: 'short'})
                        : '-';
                    
                    const prioTextFormatted = hinweis.prioritaet ? hinweis.prioritaet.charAt(0).toUpperCase() + hinweis.prioritaet.slice(1) : "";
                    const visTextFormatted = hinweis.sichtbarkeit ? hinweis.sichtbarkeit.charAt(0).toUpperCase() + hinweis.sichtbarkeit.slice(1) : "";



                    newList.innerHTML = `
                        <div class="note-header">
                            <span class="note-title">${hinweis.titel || 'Ohne Titel'}</span>
                            <div class="meta-space"><span class="note-meta">von ${hinweis.ersteller || 'Unbekannt'} am ${erstelldatumFormatiert} </span><span class="note-meta meta-02">geändert: ${updateDatumFormatiert}</span></div>
                            <span class="note-prio-badge">${prioTextFormatted} <span> - </span><span class="note-vis-badge">${visTextFormatted}</span></span> 
                        </div>
                        <div class="note-body"><p>${hinweis.inhalt || ''}</p></div>`;
                    
                    // WICHTIG: Klick-Listener hinzufügen
                    newList.addEventListener("click", () => {
                        oeffnenDetailsHinweise(newList); // 'oeffnenDetailsHinweise' muss im Scope sein
                    });

                    hinweisListeUl.appendChild(newList);
                });

            } catch (error) {
                console.error("Fehler beim Laden und Anzeigen der Hinweise:", error);
                if (hinweisListeUl) hinweisListeUl.innerHTML = "<li><p>Fehler beim Laden der Hinweise.</p></li>";
            }
        }






        ladeUndZeigeHinweise()
            
    }

}

