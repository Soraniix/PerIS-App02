import { togglePanelVisibility } from "./uiHelpers.js"
import { markiereListenElementAlsSelektiert } from "./uiHelpers.js"


export function initialisiereAufgabenSektion() {
    console.log("initialisiere Aufgaben...")
    const aufgabenSektion = document.querySelector("#offene-aufgaben")

    if (aufgabenSektion){
        const addListenObjekteAufgaben = aufgabenSektion.querySelectorAll(".dashboard-list li")
        const addAufgabeDetailsPanel = aufgabenSektion.querySelector(".dashboard-details-panel")
        const addTaskCloseButton = aufgabenSektion.querySelector(".close-button")
        const addTaskForm = aufgabenSektion.querySelector(".task-form")
        const addTaskChangeButton = aufgabenSektion.querySelector(".change-button")
        const addTaskChangeList = aufgabenSektion.querySelectorAll(".task-info-field")
        const addTaskSaveButton = aufgabenSektion.querySelector(".save-button")
        const addTaskStatusSpan = aufgabenSektion.querySelectorAll(".task-vis-prio .task-status")

        const addKommentarButton = aufgabenSektion.querySelector(".add-comment-task-button")
        const addKommentarInhalt = aufgabenSektion.querySelector(".new-comment-task")
        const addKommentarListe = aufgabenSektion.querySelector(".task-comment-list")
        const USER = "Nico"

        const addAufgabeDelBtn = aufgabenSektion.querySelector(".task-buttons .del-button")

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
            
            if (addTaskChangeButton.textContent=="Abbrechen")
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
            addTaskSaveButton.addEventListener("click", (event) => {
                event.preventDefault()
                const selectedList = document.querySelector("#offene-aufgaben ul .selected")
            
                const newTitle = addAufgabeDetailsPanel.querySelector(".task-titel").value
                const newText = addAufgabeDetailsPanel.querySelector(".task-body").value
                const newPrio = addAufgabeDetailsPanel.querySelector(".task-vis-prio select.task-prio").value
                const newVis = addAufgabeDetailsPanel.querySelector('input[name="task-visibility"]:checked').value
                const newStati = addAufgabeDetailsPanel.querySelector(".task-vis-prio .task-status").textContent
            
                selectedList.querySelector(".task-dashboard-title").textContent = newTitle
                selectedList.querySelector(".task-content-db").textContent = newText
                selectedList.querySelector(".task-prio-db").textContent = newPrio
                selectedList.querySelector(".task-vis-db").textContent = newVis
                const altStati = selectedList.querySelector(".task-status")
            
                altStati.textContent = newStati
            
                altStati.classList.remove("task-status-offen", "task-status-arbeit", "task-status-done")
                    if (newStati == "offen") {
                        altStati.classList.add("task-status-offen")
                    }else if (newStati == "in Arbeit") {
                        altStati.classList.add("task-status-arbeit")
                    }else if (newStati == "fertig") {
                        altStati.classList.add("task-status-done")
                    }
            
                addTaskChangeList.forEach(eintrag => eintrag.disabled = true)
                addTaskSaveButton.classList.add("hidden")
                addTaskChangeButton.textContent = "Bearbeiten"
            
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

            const titel = eintrag.querySelector(".task-dashboard-title").textContent
            const stati = eintrag.querySelector(".task-status").textContent
            const text = eintrag.querySelector(".task-content-db").value
            const vis = eintrag.querySelector(".task-vis-db").textContent
            const prio = eintrag.querySelector(".task-prio-db").textContent
            const creater = eintrag.querySelector(".task-creater").textContent
            const date = eintrag.querySelector(".task-date").textContent

            const panelTitle = addAufgabeDetailsPanel.querySelector(".task-titel")
            const panelText = addAufgabeDetailsPanel.querySelector(".task-body")
            const panelVis = addAufgabeDetailsPanel.querySelector(`input[name=task-visibility][value=${vis}]`)
            const panelStati = addAufgabeDetailsPanel.querySelector(".task-status")
            const panelPrio = addAufgabeDetailsPanel.querySelector("select.task-prio")
            const panelCreater = addAufgabeDetailsPanel.querySelector(".ersteller-von")
            const panelDate = addAufgabeDetailsPanel.querySelector(".erstellt-am")

            panelTitle.value = titel
            panelText.value = text
            panelVis.checked = true
            panelPrio.value = prio
            panelCreater.textContent = creater
            panelDate.textContent = date

            const allTaskComments = aufgabenSektion.querySelectorAll(".task-comment-list li")
            const taskPanelId = aufgabenSektion.querySelector("ul.dashboard-list .selected").dataset.taskId
            const allTaskCommentsId = aufgabenSektion.querySelectorAll(`.task-comment-list .zu-task-id-${taskPanelId}`)
            allTaskComments.forEach(eintrag => eintrag.classList.add("hidden"))
            allTaskCommentsId.forEach(eintrag => eintrag.classList.remove("hidden"))
            

            allTaskCommentsId.forEach(commi => {
                const delButton = commi.querySelector(".rotes-kreuz")

                delButton.addEventListener("click", () => {
                    commi.closest(".test01").remove()
                })
            })

            // Zuerst alle alten Statusklassen entfernen
            panelStati.classList.remove("task-status-offen", "task-status-arbeit", "task-status-done");

            if (stati == "offen"){
                panelStati.classList.add("task-status-offen");
                panelStati.textContent = "offen";
            } else if (stati == "in Arbeit") {
                panelStati.classList.add("task-status-arbeit");
                panelStati.textContent = "in Arbeit";
            } else if (stati == "fertig") {
                panelStati.classList.add("task-status-done");
                panelStati.textContent = "fertig"; 
            }
        }

        

    }
}

