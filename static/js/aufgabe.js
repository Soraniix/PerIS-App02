import { initialisiereKommentarfunktion } from "./kommentare.js"
import { togglePanelVisibility } from "./uiHelpers.js"
import { markiereListenElementAlsSelektiert } from "./uiHelpers.js"


export function initialisiereAufgabenSektion() {
    console.log("initialisiere Aufgaben...")
    const aufgabenSektion = document.querySelector("#offene-aufgaben")

    if (aufgabenSektion){
        const addListenObjekteAufgaben = aufgabenSektion.querySelectorAll(".dashboard-list li")
        const addAufgabeDetailsPanel = aufgabenSektion.querySelector(".dashboard-details-panel")
        const addTaskCloseButton = aufgabenSektion.querySelector(".dashboard-details-panel .close-button")
        const addTaskForm = aufgabenSektion.querySelector(".task-form")
        const addTaskChangeButton = aufgabenSektion.querySelector(".dashboard-details-panel .change-button")
        const addTaskChangeList = aufgabenSektion.querySelectorAll(".dashboard-details-panel .task-info-field")
        const addTaskSaveButton = aufgabenSektion.querySelector(".dashboard-details-panel .save-button")
        const addTaskStatusSpan = aufgabenSektion.querySelectorAll(".dashboard-details-panel .task-vis-prio .task-status")

        const addKommentarButton = aufgabenSektion.querySelector(".add-comment-task-button")
        const addKommentarInhalt = aufgabenSektion.querySelector(".new-comment-task")
        const addKommentarListe = aufgabenSektion.querySelector(".task-comment-list")
        const USER = "Nico"

        // Aufgabe erstelle im Dashboard
        const addPanel = aufgabenSektion.querySelector(".dashboard-add-panel")
        const panelAddButton = aufgabenSektion.querySelector(".add-button")
        const addPanelCloseBtn = aufgabenSektion.querySelector(".dashboard-add-panel .close-button-new")
        const addPanelCreatBtn = aufgabenSektion.querySelector(".dashboard-add-panel .creat-button")
        const addPanelGoToBtn = aufgabenSektion.querySelector(".dashboard-add-panel .go-to-button")
        const addPanelForm = aufgabenSektion.querySelector(".dashboard-add-panel .task-form-add")


        const addAufgabeDelBtn = aufgabenSektion.querySelector(".dashboard-details-panel .task-buttons .del-button")



        panelAddButton.addEventListener("click", () => {
            togglePanelVisibility(addPanel, true)
        })

        addPanelCloseBtn.addEventListener("click", () => {
            togglePanelVisibility(addPanel, false)
        })

        if (addPanel) {
            addPanelForm.addEventListener("submit", async function (event) {
            if (!addPanelForm.checkValidity()) {
                return;
            }
            event.preventDefault();
            
            const titel = addPanel.querySelector("#task-titel").value
            const inhalt = addPanel.querySelector("#task-body").value
            const prioritaet = addPanel.querySelector("#task-prio").value

            const sichtbarkeitElement = addPanel.querySelector('input[name="task-visibility"]:checked')
            const sichtbarkeit = sichtbarkeitElement ? sichtbarkeitElement.value : null;

            const status = "offen"
            const rechercheangehoerigkeit = addPanel.querySelector(".id-tags")?.value || null;
            const personangehoerigkeit = addPanel.querySelector(".person-tags")?.value || null;


            const neueAufgabeDaten = {
                "titel": titel,
                "inhalt": inhalt,
                "prioritaet": prioritaet,
                "sichtbarkeit": sichtbarkeit,
                "status": status,
                "rechercheangehoerigkeit": rechercheangehoerigkeit,
                "personangehoerigkeit": personangehoerigkeit,
                "zuletzt_geaendert_am": null
            }
            console.log("Sende dieses Objekt an das Backend:", neueAufgabeDaten);
            try {
                const response = await fetch("/api/aufgaben", {
                    method: "POST",
                    headers: {"Content-Type" : "application/json"},
                    body: JSON.stringify(neueAufgabeDaten)
                })

                if (!response.ok){
                    throw new Error(`HTTP Fehler! Status: ${response.status}`);
                }

                const erstelleHinweisInfo = await response.json();
                console.log("Erfolgreich gespeichert! Server Antwort:", erstelleHinweisInfo);

                if (typeof ladeundZeigeAufgaben === "function") {
                    ladeundZeigeAufgaben()
                }
                addPanelForm.reset()
                togglePanelVisibility(addPanel, false)

            }
            catch (error) {
                console.error("Fehler beim Senden/Speichern der neuen Aufgabe", error);
                alert("Es gab einen Fehler bei der Speicherung oder Erstellung der neuen Aufgabe: " + error.message);
            }

            });
        }

        // Event zum Löschen von Aufgabe
        if (addAufgabeDelBtn){
            addAufgabeDelBtn.addEventListener("click", async () => {
                const aufgabeLi = aufgabenSektion.querySelector(".dashboard-list li.selected")

                if (aufgabeLi) {
                    const idSelected = aufgabeLi.dataset.taskId
                    const check = confirm("Sind Sie sicher, dass Sie diese Aufgabe löschen möchten?")
                    if (check) {
                        try {
                            console.log(idSelected)
                            const response = await fetch(`/api/aufgaben/${idSelected}`, {
                                method: "DELETE"
                            })
                            if (!response.ok) {
                                throw new Error(`HTTP Fehler! Status: ${response.status}`)
                            }
                            const erstelleAufgabeInfo = await response.json()
                            console.log("Erfolgreich gelöscht! Server Antwort: ", erstelleAufgabeInfo)

                            if (typeof ladeundZeigeAufgaben === "function") {
                                ladeundZeigeAufgaben()
                            }
                            addTaskForm.reset()
                            togglePanelVisibility(addAufgabeDetailsPanel, false)

                            
                        } catch (error) {
                            console.error("Fehler beim Löschen der Aufgabe", error)
                            alert("Fehler beim Löschen der Aufgabe: " + error.message)
                        }
                    }
                }
            })
        }
        


        addAufgabeDelBtn.addEventListener("click", (event) => {
            let selectedList = aufgabenSektion.querySelector("ul .selected")
            togglePanelVisibility(addAufgabeDetailsPanel, false)
            selectedList.remove()
        })

        if (addKommentarButton) {
            addKommentarButton.addEventListener("click", (event) => {
                event.preventDefault()
                if (addKommentarInhalt.value != "") {
            
                    const selectedListId = aufgabenSektion.querySelector("ul .selected").dataset.taskId
                    const new_comment = document.createElement("li");
                    new_comment.dataset.taskcommentId = 'new-' + Date.now();
                    new_comment.classList.add("test01");
                    new_comment.classList.add(`zu-task-id-${selectedListId}`)
                    let aktuelleZeit = new Date().toLocaleString('de-DE')
            
                    new_comment.innerHTML = `
                    <img class="rotes-kreuz" src="/static/images/rotesKreuz.png" alt="rotesKreuz">
                    <div>
                        <strong class="task-name-date-comment">${USER} - ${aktuelleZeit}:</strong>
                        <p class="task-comment-content">${addKommentarInhalt.value}</p>
            
                    </div>
            
                    `
                    const delButton = new_comment.querySelector(".rotes-kreuz") 
                    delButton.addEventListener("click", (event) => {
                        new_comment.remove()
                    })
            
            
                    if (addKommentarListe) {
                        addKommentarListe.prepend(new_comment)
                    }
            
                    addKommentarInhalt.value = ""
            
                }
            })
        }



        addTaskStatusSpan.forEach(eintrag => {
            eintrag.addEventListener("click", ()=> {
                statiButton(eintrag)
            })
        })

        function statiButton(eintrag){
            
            if (addTaskChangeButton.textContent==="Abbrechen")
            {
                eintrag.classList.remove("task-status-offen", "task-status-arbeit", "task-status-done")
                if (eintrag.textContent == "offen") {
                    eintrag.textContent = "in Arbeit"
                    eintrag.classList.add("task-status-arbeit")
                    return
                }if (eintrag.textContent == "in Arbeit") {
                    eintrag.textContent = "fertig"
                    eintrag.classList.add("task-status-done")
                    return
                }if (eintrag.textContent == "fertig") {
                    eintrag.textContent = "offen"
                    eintrag.classList.add("task-status-offen")
                    return
                }
                    
            }
            
        }

        if (addTaskSaveButton) {
            addTaskSaveButton.addEventListener("click",  async (event) => {
                event.preventDefault()
                const selectedList = document.querySelector("#offene-aufgaben ul .selected")
                console.log(selectedList)

                const selectId = selectedList.dataset.taskId

                if (!selectedList) return

                const newTitle = addAufgabeDetailsPanel.querySelector(".task-titel").value
                const newInhalt = addAufgabeDetailsPanel.querySelector(".task-body").value
                const newPrio = addAufgabeDetailsPanel.querySelector(".task-vis-prio select.task-prio").value
                const newVis = addAufgabeDetailsPanel.querySelector('input[name="task-visibility"]:checked').value
                const newStati = addAufgabeDetailsPanel.querySelector(".task-vis-prio .task-status").textContent.toLocaleLowerCase().trim()
                const zuID = addAufgabeDetailsPanel.querySelector(".id-tags")?.value || null
                const zuUser = addAufgabeDetailsPanel.querySelector(".person-tags")?.value || null
            
                const updateDaten = {
                    "titel": newTitle,
                    "inhalt": newInhalt,
                    "prioritaet": newPrio,
                    "sichtbarkeit": newVis,
                    "status": newStati,
                    "rechercheangehoerigkeit": zuID,
                    "personangehoerigkeit": zuUser,
                    "zuletzt_geaendert_am": null
                }
                
                try {
                    console.log(updateDaten)
                    const response = await fetch(`/api/aufgaben/${selectId}`, {
                        method: "PUT",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify(updateDaten)
                    });

                    if (!response.ok){
                        throw new Error(`HTTP Fehler! Status: ${response.status}`)
                    }

                    const erstelleAufgabeUpdateHinweis = await response.json()
                    console.log("Erfolgreich geändert! Server Antwort: ", erstelleAufgabeUpdateHinweis)

                    if (typeof ladeundZeigeAufgaben === "function"){
                        ladeundZeigeAufgaben()
                    }

                    addTaskChangeList.forEach(eintrag => eintrag.disabled = true)
                    addTaskSaveButton.classList.add("hidden")
                    addTaskChangeButton.textContent = "Bearbeiten"
                    addTaskStatusSpan.forEach(eintrag => {
                        eintrag.classList.toggle("disabled")
                    })
                    


                } catch (error) {
                    console.error("Fehler beim ändern der Aufgabe", error)
                    alert("Es gabe ein Fehler beim Versuch die Aufgabe zu ändern: " + error.message)
                }
            
            

            
                
                

                
            
            })
        }



        if (addTaskChangeButton) {
            addTaskChangeButton.addEventListener("click", () => {

            
                const isEditMode = addTaskChangeButton.textContent === "Bearbeiten";
                addTaskStatusSpan.forEach(eintrag => {
                    eintrag.classList.toggle("disabled")
                })
                
                addTaskChangeButton.textContent = isEditMode ? "Abbrechen" : "Bearbeiten";
                addTaskSaveButton.classList.toggle("hidden");
                
            
                addTaskChangeList.forEach(eintrag => {
                    eintrag.toggleAttribute("disabled");  // toggelt das disabled-Attribut
                });
                
                
                    
            })
        }


        if (addTaskCloseButton) {
            addTaskCloseButton.addEventListener("click", (event) => {
                togglePanelVisibility(addAufgabeDetailsPanel, false)
                addTaskChangeList.forEach(eintrag => eintrag.disabled = true)
                addTaskForm.reset()
                addTaskSaveButton.classList.add("hidden")
                addTaskStatusSpan.forEach(eintrag => eintrag.classList.add("disabled"))
            })
        }



        addListenObjekteAufgaben.forEach(eintrag => {
            eintrag.addEventListener("click", (event) => {
                oeffneAufgabeDetails(eintrag)
            })

        })


        function oeffneAufgabeDetails(eintrag){
            togglePanelVisibility(addAufgabeDetailsPanel, true)
            addTaskChangeButton.textContent = "Bearbeiten"

            markiereListenElementAlsSelektiert(eintrag, addListenObjekteAufgaben)

            // Hinzufügen der Kommentarfunktion!
            const aufgabeId = eintrag.dataset.taskId;
            const aufgabeType = "aufgaben";
            const kommentarContainer = addAufgabeDetailsPanel.querySelector(".comment-container")
            if (aufgabeId && aufgabeType && kommentarContainer) {
                initialisiereKommentarfunktion(kommentarContainer, aufgabeType, aufgabeId);
            }

            const titel = eintrag.querySelector(".task-dashboard-title").textContent
            const stati = eintrag.querySelector(".task-status").textContent.toLowerCase().trim()
            const text = eintrag.querySelector(".task-content-db").value
            const vis = eintrag.querySelector(".task-vis-db").textContent
            const prio = eintrag.querySelector(".task-prio-db").textContent
            const creater = eintrag.querySelector(".task-creater").textContent
            const date = eintrag.querySelector(".task-date").textContent
            const update = eintrag.querySelector(".task-update").textContent

            const panelTitle = addAufgabeDetailsPanel.querySelector(".task-titel")
            const panelText = addAufgabeDetailsPanel.querySelector(".task-body")
            const panelVis = addAufgabeDetailsPanel.querySelector(`input[name=task-visibility][value=${vis}]`)
            const panelStati = addAufgabeDetailsPanel.querySelector(".task-status")
            const panelPrio = addAufgabeDetailsPanel.querySelector("select.task-prio")
            const panelCreater = addAufgabeDetailsPanel.querySelector(".ersteller-von")
            const panelDate = addAufgabeDetailsPanel.querySelector(".erstellt-am")
            const panelUpdate = addAufgabeDetailsPanel.querySelector(".geaendert-am")
            

            panelTitle.value = titel
            panelText.value = text
            panelVis.checked = true
            panelPrio.value = prio
            panelCreater.textContent = creater
            panelDate.textContent = date
            panelUpdate.textContent = update


            // Zuerst alle alten Statusklassen entfernen
            panelStati.classList.remove("task-status-offen", "task-status-arbeit", "task-status-done");

            if (stati == "offen"){
                panelStati.classList.add("task-status-offen");
                panelStati.textContent = "offen";
            } else if (stati == "in arbeit") {
                panelStati.classList.add("task-status-arbeit");
                panelStati.textContent = "in Arbeit";
            } else if (stati == "fertig") {
                panelStati.classList.add("task-status-done");
                panelStati.textContent = "fertig"; 
            }
        }






        async function ladeundZeigeAufgaben() {
            console.log("Versuche, Aufgaben vom Backend zu laden...")
            const aufgabenListeUl = aufgabenSektion.querySelector(".dashboard-list");

            if(!aufgabenListeUl) {
                console.error("Aufgaben-Liste nicht gefunden!")
                return;
            }

            try {
                const response = await fetch("/api/aufgaben");
                if(!response.ok) {
                    throw new Error(`HTTP Fehler! Status: ${response.status}`);
                }

                const aufgabenDatenArray = await response.json();
                console.log("Empfangene Aufgaben: ", aufgabenDatenArray);

                aufgabenListeUl.innerHTML = ""

                if (aufgabenDatenArray.length === 0) {
                    aufgabenListeUl.innerHTML = "<li><p>Keine Aufgaben vorhanden</p></li>";
                    return;
                }

                aufgabenDatenArray.forEach(aufgabe => {
                    const newLi = document.createElement("li")
                    newLi.classList.add("dashboard-list-item")
                    newLi.dataset.taskId = aufgabe.id


                    const erstelldatumFormatiert = aufgabe.erstelldatum
                        ? new Date(aufgabe.erstelldatum).toLocaleString('de-DE', {dateStyle: 'short',  timeStyle: 'short'})
                        : "Unbekannt";

                    const updateDatumFormatiert = aufgabe.zuletzt_geaendert_am
                        ? new Date(aufgabe.zuletzt_geaendert_am).toLocaleString('de-De', {dateStyle: 'short', timeStyle: 'short'})
                        : "-"
                    
                    const statusKlein = aufgabe.status.toLowerCase().trim()

                    let statusTask = null

                    if (statusKlein === "offen") statusTask = "task-status-offen"
                    else if (statusKlein === "in arbeit") statusTask = "task-status-arbeit"
                    else if (statusKlein === "fertig") statusTask = "task-status-done"
                    

                    newLi.innerHTML = `
                    <span class="task-dashboard-title">${aufgabe.titel}</span>
                    <span class="task-status ${statusTask}">${statusKlein}</span>
                    <span hidden class="task-vis-db">${aufgabe.sichtbarkeit}</span>
                    <span hidden class="task-prio-db">${aufgabe.prioritaet}</span>
                    <span hidden class="task-creater">${aufgabe.ersteller}</span>
                    <span hidden class="task-date">${erstelldatumFormatiert}</span>
                    <span hidden class="task-update">${updateDatumFormatiert}</span>
                    <textarea hidden class="task-content-db" name="task-comment-content" id="task-comment-content">${aufgabe.inhalt}</textarea>
                    `

                    newLi.addEventListener("click", () => {
                        oeffneAufgabeDetails(newLi)
                    });

                    aufgabenListeUl.append(newLi)

                })

            }
            catch (error) {
                console.error("Fehler beim Laden und Anzeigen der Aufgaben", error)
                if (aufgabenListeUl) aufgabenListeUl.innerHTML=  "<li><p>Keine Aufgaben vorhanden</p></li>";
            }

        }




        ladeundZeigeAufgaben()

    }
}

