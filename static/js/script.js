
const addNoteButton = document.querySelector('.add-button');
const addNotePanel = document.querySelector('#hinweise .dashboad-add-panel');

const closeNoteButton = document.querySelector("#hinweise .dashboad-add-panel .close-button")
const addNoteForm = document.querySelector("#hinweise .dashboad-add-panel form")
const filterTabButtons = document.querySelectorAll("#hinweise .filter-tabs button")

const closeNoteInfoButton = document.querySelector("#hinweise .dashboard-details-panel .close-button")
const changeNoteInfoButton = document.querySelector("#hinweise .dashboard-details-panel .change-button")
const changeListe = document.querySelectorAll(".change-info")
const panelNoteDetails = document.querySelector("#hinweise .dashboard-details-panel")
const panelForm = document.querySelector("#hinweise .dashboard-details-panel form")
const saveNoteInfoButton = document.querySelector("#hinweise .dashboard-details-panel .save-button");

const openNavHeader = document.querySelectorAll("header nav ul li a")

// const für Aufgaben

const addListenObjekteAufgaben = document.querySelectorAll("#offene-aufgaben .dashboard-list li")
const addAufgabeDetailsPanel = document.querySelector("#offene-aufgaben .dashboard-details-panel")
const addTaskCloseButton = document.querySelector("#offene-aufgaben .close-button")
const addTaskForm = document.querySelector("#offene-aufgaben .task-form")
const addTaskChangeButton = document.querySelector("#offene-aufgaben .change-button")
const addTaskChangeList = document.querySelectorAll("#offene-aufgaben .task-info-field")
const addTaskSaveButton = document.querySelector("#offene-aufgaben .save-button")
const addTaskStatusSpan = document.querySelectorAll("#offene-aufgaben .task-vis-prio .task-status")

const addKommentarButton = document.querySelector("#offene-aufgaben .add-comment-task-button")
const addKommentarInhalt = document.querySelector("#offene-aufgaben .new-comment-task")
const addKommentarListe = document.querySelector("#offene-aufgaben .task-comment-list")
const USER = "Nico"

// Übersicht Beschlüsse

const addBeschlussDetailsPanel = document.querySelector("#uebersicht-beschluesse .beschlussdetails")
const addBeschlussDetailsCloseButton = document.querySelector("#uebersicht-beschluesse .close-button")
const addAlleBeschluesse = document.querySelectorAll("#uebersicht-beschluesse .dashboard-list li")


addAlleBeschluesse.forEach(geklickteLi => {
    geklickteLi.addEventListener("click", () => {
        oeffneBeschluesse(geklickteLi)
    })
})

function oeffneBeschluesse(geklickteLi) {

    addAlleBeschluesse.forEach(einLi => einLi.classList.remove("selected"))
    geklickteLi.classList.add("selected")

    const titel = geklickteLi.querySelector(".beschluss-titel").textContent
    const vn = geklickteLi.querySelector(".beschluss-vn").textContent
    const ablauf = geklickteLi.querySelector(".beschluss-ablaufdatum").textContent
    const az = geklickteLi.querySelector(".beschluss-az-db").textContent
    const org = geklickteLi.querySelector(".beschluss-org-einheit-db").textContent
    const bl = geklickteLi.querySelector(".beschluss-bl-db").textContent
    const orte = geklickteLi.querySelector(".beschluss-orte-db").textContent
    const beginn = geklickteLi.querySelector(".beschluss-beginnU-db").textContent
    const ende = geklickteLi.querySelector(".beschluss-endeU-db").textContent
    const treffer = geklickteLi.querySelector(".beschluss-treffer-db").textContent
    const einsaetze = geklickteLi.querySelector(".beschluss-einsaetze-db").textContent
    const schaden = geklickteLi.querySelector(".beschluss-schaden-db").textContent

    const detailTitel = addBeschlussDetailsPanel.querySelector(".beschluss-details-titel")
    const detailVn = addBeschlussDetailsPanel.querySelector(".beschluss-fakten .beschluss-details-vn")
    const detailsAblauf = addBeschlussDetailsPanel.querySelector(".beschluss-fakten .beschluss-details-ablauf")
    const detailsAz = addBeschlussDetailsPanel.querySelector(".beschluss-fakten .beschluss-details-az")
    const detailsOrg = addBeschlussDetailsPanel.querySelector(".beschluss-fakten .beschluss-details-org")
    const detailsBl = addBeschlussDetailsPanel.querySelector(".beschluss-fakten .beschluss-details-bl")
    const detailsOrte = addBeschlussDetailsPanel.querySelector(".beschluss-fakten .beschluss-details-orte")
    const detailsBeginn = addBeschlussDetailsPanel.querySelector(".beschluss-fakten .beschluss-details-beginn")
    const detailsEnde = addBeschlussDetailsPanel.querySelector(".beschluss-fakten .beschluss-details-ende")
    const detailsTreffer = addBeschlussDetailsPanel.querySelector(".beschluss-details-treffer")
    const detailsEinsaetze = addBeschlussDetailsPanel.querySelector(".beschluss-details-einsaetze")
    const detailsSchaden = addBeschlussDetailsPanel.querySelector(".beschluss-details-schaden")

    detailTitel.textContent = titel
    detailVn.textContent = vn
    detailsAblauf.textContent = ablauf
    detailsAz.textContent = az
    detailsOrg.textContent = org
    detailsBl.textContent = bl
    detailsOrg.textContent = orte
    detailsBeginn.textContent = beginn
    detailsEnde.textContent = ende
    detailsTreffer.textContent = treffer
    detailsEinsaetze.textContent = einsaetze
    detailsSchaden.textContent = schaden


    


    addBeschlussDetailsPanel.classList.remove("hidden")
}


addBeschlussDetailsCloseButton.addEventListener("click", ()=> {
    addBeschlussDetailsPanel.classList.add("hidden")
    
})




addKommentarButton.addEventListener("click", (event) => {
    event.preventDefault()
    if (addKommentarInhalt.value != "") {

        const selectedListId = document.querySelector("#offene-aufgaben ul .selected").dataset.taskId
        const new_comment = document.createElement("li");
        new_comment.dataset.taskcommentId = 'new-' + Date.now();
        new_comment.classList.add("test01");
        new_comment.classList.add(`zu-task-id-${selectedListId}`)
        aktuelleZeit = new Date().toLocaleString('de-DE')

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
    altStati = selectedList.querySelector(".task-status")

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


addTaskCloseButton.addEventListener("click", (event) => {
    addAufgabeDetailsPanel.classList.add("hidden")
    addTaskChangeList.forEach(eintrag => eintrag.disabled = true)
    addTaskForm.reset()
    addTaskSaveButton.classList.add("hidden")
    addTaskStatusSpan.forEach(eintrag => eintrag.classList.add("disabled"))

})


addListenObjekteAufgaben.forEach(eintrag => {
    eintrag.addEventListener("click", (event) => {
        oeffneAufgabeDetails(eintrag)
    })

})


function oeffneAufgabeDetails(eintrag){
    addAufgabeDetailsPanel.classList.remove("hidden")
    addTaskChangeButton.textContent = "Bearbeiten"

    addListenObjekteAufgaben.forEach(element => element.classList.remove("selected"))
    eintrag.classList.add("selected")

    titel = eintrag.querySelector(".task-dashboard-title").textContent
    stati = eintrag.querySelector(".task-status").textContent
    text = eintrag.querySelector(".task-content-db").textContent
    vis = eintrag.querySelector(".task-vis-db").textContent
    prio = eintrag.querySelector(".task-prio-db").textContent
    creater = eintrag.querySelector(".task-creater").textContent
    date = eintrag.querySelector(".task-date").textContent

    panelTitle = addAufgabeDetailsPanel.querySelector(".task-titel")
    panelText = addAufgabeDetailsPanel.querySelector(".task-body")
    panelVis = addAufgabeDetailsPanel.querySelector(`input[name=task-visibility][value=${vis}]`)
    panelStati = addAufgabeDetailsPanel.querySelector(".task-status")
    panelPrio = addAufgabeDetailsPanel.querySelector("select.task-prio")
    panelCreater = addAufgabeDetailsPanel.querySelector(".ersteller-von")
    panelDate = addAufgabeDetailsPanel.querySelector(".erstellt-am")

    panelTitle.value = titel
    panelText.value = text
    panelVis.checked = true
    panelPrio.value = prio
    panelCreater.textContent = creater
    panelDate.textContent = date

    const allTaskComments = document.querySelectorAll("#offene-aufgaben .task-comment-list li")
    const taskPanelId = document.querySelector("#offene-aufgaben ul.dashboard-list .selected").dataset.taskId
    const allTaskCommentsId = document.querySelectorAll(`#offene-aufgaben .task-comment-list .zu-task-id-${taskPanelId}`)
    allTaskComments.forEach(eintrag => eintrag.classList.add("hidden"))
    allTaskCommentsId.forEach(eintrag => eintrag.classList.remove("hidden"))
    

    allTaskCommentsId.forEach(commi => {
        const delButton = commi.querySelector(".rotes-kreuz")

        delButton.addEventListener("click", () => {
            commi.closest(".test01").remove()
        })
    })



    alert

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
        panelStati.textContent = "fertig"; // Hier den Text ergänzen
    }
}













openNavHeader.forEach(eintrag => {
    eintrag.addEventListener("click", () => {  
        openNavHeader.forEach(i => {
            i.classList.remove("active")
        })
        localStorage.setItem("letztesNavElement", eintrag.href)
        eintrag.classList.add("active")
    })
} )



document.addEventListener("DOMContentLoaded", () => {
    let refLink = localStorage.getItem("letztesNavElement")
    if (refLink) {
        openNavHeader.forEach(eintrag => {
            let vergleichRef = eintrag.href
            eintrag.classList.remove("active")
            if (refLink == vergleichRef){
                eintrag.classList.add("active")
            }
        })
    }
})



// Wenn auf den addNoteButton geklickt wird, ...
addNoteButton.addEventListener('click', () => {
    addNotePanel.classList.remove("hidden")
});

// Wenn auf close-button geklickt wird, ...
closeNoteButton.addEventListener("click", () => {
    addNotePanel.classList.add("hidden")
})

//From submit Änderung!
addNoteForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const hinweiseListe = document.querySelector("#hinweise .hinweis-liste");

    // Werte aus dem Formular holen
    const titel = document.querySelector("#note-title").value;
    const text = document.querySelector("#note-text").value;
    const prio = document.querySelector("#note-prio").value;

    const visChecker = document.querySelector('input[name="visibility"]:checked');
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
            <span class="note-meta">von Dir am ${aktuelleZeit}</span>
            <span class="note-prio-badge">${prioText} <span> - </span><span class="note-vis-badge">${vis}</span></span>
        </div>
        <div class="note-body"><p>${text}</p></div>
    `;

    newList.addEventListener("click", () => {
        oeffnenDetailsHinweise(newList);
    });

    if (hinweiseListe) {
        hinweiseListe.prepend(newList);
    }

    addNoteForm.reset();
    addNotePanel.classList.add("hidden");
});


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
    
const hinweiseListe = document.querySelectorAll('#hinweise .hinweis-liste li'); 
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

// -- Funktion öffnen der Hinweise //

const hinweiseListe  =  document.querySelectorAll("#hinweise .hinweis-liste li")

hinweiseListe.forEach(eintrag => {
    eintrag.addEventListener("click", () => {
        oeffnenDetailsHinweise(eintrag)
    })
})

function oeffnenDetailsHinweise(eintrag){
    const panel = document.querySelector("#hinweise .dashboard-details-panel")
    document.querySelectorAll(".hinweis-liste li").forEach(li => li.classList.remove("selected"))
    eintrag.classList.add("selected")
    changeNoteInfoButton.textContent = "Bearbeiten"
    saveNoteInfoButton.classList.add("hidden")

    if (!panel)
        return;

    const titel = eintrag.querySelector(".note-title").textContent
    const meta = eintrag.querySelector(".note-meta").textContent
    const prio = eintrag.querySelector(".note-prio-badge").childNodes[0].textContent.trim().toLowerCase()
    const vis = eintrag.querySelector(".note-vis-badge").textContent.trim().toLowerCase()
    const noteBody = eintrag.querySelector(".note-body").textContent


    const detailsTitel = panel.querySelector(".details-titel")
    const detailsMeta = panel.querySelector(".details-meta")
    const detailsPrio = panel.querySelector(".note-details-prio")
    const detailsVis = panel.querySelector(`input[name="note-details-vis"][value="${vis}"]`)
    const detailsNoteBody = panel.querySelector(".details-content")


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

    panel.classList.toggle("hidden")

}


closeNoteInfoButton.addEventListener("click", () => {
    
    panelNoteDetails.classList.add("hidden")
    panelForm.reset()
    changeListe.forEach(e => e.disabled = true)
    
})

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

saveNoteInfoButton.addEventListener("click", (event) => {
    event.preventDefault()
    const selectedList = document.querySelector("#hinweise .hinweis-liste .selected")

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

})

const delListButton = document.querySelector(".del-button")

delListButton.addEventListener("click", () => {
    const selectedList = document.querySelector("#hinweise .hinweis-liste .selected")
    panelNoteDetails.classList.add("hidden")
    selectedList.remove()
})

//---------------------------------------------------------------------//
//Kamera Zeiten

const addKameraZeitenChange = document.querySelector(".edit-times-button")
const addKameraZeitenSave = document.querySelector(".save-times-button")
const nameToggelButton = document.querySelector(".edit-times-button")

addKameraZeitenChange.addEventListener("click", () => {
    const changeInputs = document.querySelectorAll("#kamera-zeiten input, select")
    const addZeitenForm = document.querySelector("#kamera-zeiten form")
    

    changeInputs.forEach(feld => feld.toggleAttribute("disabled"))
    
    if (addKameraZeitenSave.classList.contains("hidden"))
        addKameraZeitenSave.classList.remove("hidden")
    else
        addKameraZeitenSave.classList.add("hidden")
    

    if (nameToggelButton.textContent  == "Abbrechen") {
        nameToggelButton.textContent  = "Bearbeiten"
        addZeitenForm.reset()
    } else {
        nameToggelButton.textContent  = "Abbrechen"
    }
})

addKameraZeitenSave.addEventListener("click", (event) => {
    event.preventDefault()
    let kameraDaten = {}
    const changeInputs = document.querySelectorAll("#kamera-zeiten input, select")
    changeInputs.forEach(function(feld) {
         
        if (feld.name) {
            kameraDaten[feld.name] = feld.value
            feld.disabled = true
        }
        
    } )
    console.log(kameraDaten)
    nameToggelButton.textContent = "Bearbeiten"
    addKameraZeitenSave.classList.add("hidden")
})

