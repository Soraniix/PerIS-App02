import { togglePanelVisibility } from "./uiHelpers.js";
import { markiereListenElementAlsSelektiert } from "./uiHelpers.js";

export function initialisiereHinweisSektion(){
    console.log("initialisiere Hinweise...");

    const hinweisSektion = document.querySelector("#hinweise")
    if (hinweisSektion){

        const addNoteButton = hinweisSektion.querySelector('.add-button');
        const addNotePanel = hinweisSektion.querySelector('.dashboard-add-panel');

        const closeNoteButton = hinweisSektion.querySelector(".dashboard-add-panel .close-button")
        const addNoteForm = hinweisSektion.querySelector(".dashboard-add-panel form")
        const filterTabButtons = hinweisSektion.querySelectorAll(".filter-tabs button")

        const closeNoteInfoButton = hinweisSektion.querySelector(".dashboard-details-panel .close-button")
        const changeNoteInfoButton = hinweisSektion.querySelector(".dashboard-details-panel .change-button")
        const changeListe = hinweisSektion.querySelectorAll(".change-info")
        const panelNoteDetails = hinweisSektion.querySelector(".dashboard-details-panel")
        const panelForm = hinweisSektion.querySelector(".dashboard-details-panel form")
        const saveNoteInfoButton = hinweisSektion.querySelector(".dashboard-details-panel .save-button");

        const hinweiseListe  =  hinweisSektion.querySelectorAll(".hinweis-liste li")
        const hinweisListeUl = hinweisSektion.querySelector(".hinweis-liste");
        const delListButton = hinweisSektion.querySelector(".del-button")
        const USER = "Nico"



        if(addNoteForm) {
        addNoteForm.addEventListener('submit', function(event) {
                if (!addNoteForm.checkValidity()) {
                    return;
                }
                event.preventDefault();
                const hinweiseListe = addNoteForm.querySelector(".hinweis-liste");
            
                // Werte aus dem Formular holen
                const titel = addNoteForm.querySelector("#note-title").value;
                const text = addNoteForm.querySelector("#note-text").value;
                const prio = addNoteForm.querySelector("#note-prio").value;
            
                const visChecker = addNoteForm.querySelector('input[name="visibility"]:checked');
                const vis = visChecker ? visChecker.value : null;
            
                const newList = document.createElement("li");
                newList.dataset.noteId = 'new-' + Date.now();
            
                if (prio === 'hoch') {
                    newList.classList.add('prio-hoch');
                } else if (prio === "mittel") {
                    newList.classList.add('prio-mittel');
                } else if (prio === 'niedrig') {
                    newList.classList.add('prio-niedrig');
                }
            
                if (vis === 'public') {
                    newList.classList.add("note-public");
                } else if (vis === 'private') {
                    newList.classList.add('note-private');
                }
            
                const aktuelleZeit = new Date().toLocaleString('de-DE');
                const prioText = prio.charAt(0).toUpperCase() + prio.slice(1);
            
                newList.innerHTML = `
                    <div class="note-header">
                        <span class="note-title">${titel}</span>
                        <span class="note-meta">von ${USER} am ${aktuelleZeit}</span>
                        <span class="note-prio-badge">${prioText} <span> - </span><span class="note-vis-badge">${vis}</span></span>
                    </div>
                    <div class="note-body"><p>${text}</p></div>
                `;
            
                newList.addEventListener("click", () => {
                    oeffnenDetailsHinweise(newList);
                });
            
                if (hinweisListeUl) {
                    hinweisListeUl.prepend(newList);
                }
            
                addNoteForm.reset();
                togglePanelVisibility(addNotePanel, false)
            });
        }



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

        function oeffnenDetailsHinweise(eintrag){
            const hinweiseListeLi  =  hinweisSektion.querySelectorAll(".hinweis-liste li")
            markiereListenElementAlsSelektiert(eintrag, hinweiseListeLi)

            changeNoteInfoButton.textContent = "Bearbeiten"
            saveNoteInfoButton.classList.add("hidden")

            if (!panelNoteDetails)
                return;

            const titel = eintrag.querySelector(".note-title").textContent
            const meta = eintrag.querySelector(".note-meta").textContent
            const prio = eintrag.querySelector(".note-prio-badge").childNodes[0].textContent.trim().toLowerCase()
            const vis = eintrag.querySelector(".note-vis-badge").textContent.trim().toLowerCase()
            const noteBody = eintrag.querySelector(".note-body").textContent


            const detailsTitel = panelNoteDetails.querySelector(".details-titel")
            const detailsMeta = panelNoteDetails.querySelector(".details-meta")
            const detailsPrio = panelNoteDetails.querySelector(".note-details-prio")
            const detailsVis = panelNoteDetails.querySelector(`input[name="note-details-vis"][value="${vis}"]`)
            const detailsNoteBody = panelNoteDetails.querySelector(".details-content")


            if (detailsTitel)
                detailsTitel.value = titel
            if (detailsMeta)
                detailsMeta.value = meta
            if (detailsPrio)
                detailsPrio.value = prio
            if (detailsVis)
                detailsVis.checked = true
            if (detailsNoteBody)
                detailsNoteBody.value = noteBody

            togglePanelVisibility(panelNoteDetails, true)
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

        if (saveNoteInfoButton) {
            saveNoteInfoButton.addEventListener("click", (event) => {
                event.preventDefault()
                const selectedList = hinweisSektion.querySelector("#hinweise .hinweis-liste .selected")
            
                if (!selectedList) return
            
                const neuerTitel = panelNoteDetails.querySelector("#details-titel").value;
                const neuerInhalt = panelNoteDetails.querySelector("#details-content").value;
                const neuePrio = panelNoteDetails.querySelector("#note-details-prio").value;
                const neueVis = panelNoteDetails.querySelector('input[name="note-details-vis"]:checked')?.value || "public";
            
                selectedList.querySelector(".note-title").textContent = neuerTitel
                selectedList.querySelector(".note-body").textContent = neuerInhalt
            
                selectedList.classList.remove("prio-hoch", "prio-mittel", "prio-niedrig");
                selectedList.classList.remove("note-public", "note-private");
            
                if (neuePrio === "hoch") {
                    selectedList.classList.add("prio-hoch")
                    selectedList.querySelector(".note-prio-badge").textContent = neuePrio
                } else if (neuePrio === "mittel") {
                    selectedList.classList.add("prio-mittel")
                    selectedList.querySelector(".note-prio-badge").textContent = neuePrio
                } else if (neuePrio === "niedrig") {
                    selectedList.classList.add("prio-niedrig")
                    selectedList.querySelector(".note-prio-badge").textContent = neuePrio
                }
            
                selectedList.querySelector(".note-prio-badge").innerHTML = `
                ${neuePrio.charAt(0).toUpperCase() + neuePrio.slice(1)} <span> - </span><span class="note-vis-badge">${neueVis}</span>
            `;
            
            
                changeListe.forEach(e => e.disabled = true)
                changeNoteInfoButton.textContent = "Bearbeiten"
                saveNoteInfoButton.classList.add("hidden")
                togglePanelVisibility(panelNoteDetails, false)
            })  
        }




        if (delListButton) {
            // Wenn auf löschen gedrückt wird
            delListButton.addEventListener("click", () => {
                const selectedList = hinweisSektion.querySelector("#hinweise .hinweis-liste .selected")
                togglePanelVisibility(panelNoteDetails, false)
                selectedList.remove()
            })
        }

        if (addNoteButton) {
            // Wenn auf den addNoteButton geklickt wird, ...
        addNoteButton.addEventListener('click', () => {
            togglePanelVisibility(addNotePanel, true)
        });
        }

        if (closeNoteButton) {
            // Wenn auf close-button geklickt wird, ...
        closeNoteButton.addEventListener("click", () => {
            togglePanelVisibility(addNotePanel, false)

        })
        }
            
        }

}

