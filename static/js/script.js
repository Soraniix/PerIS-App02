// Das Plus-Icon finden und in einer Variablen speichern
const addNoteButton = document.querySelector('.add-note-button');
console.log('Wert von addNoteButton:', addNoteButton); // NEUE TESTZEILE

// Das Panel zum Hinzufügen von Notizen finden und speichern
const addNotePanel = document.querySelector('.add-note-panel');
console.log('Wert von addNotePanel:', addNotePanel); // NEUE TESTZEILE (schadet nicht)

const closeNoteButton = document.querySelector(".add-note-panel .close-button")

//Referenz auf die Form selbst...
const addNoteForm = document.querySelector(".add-note-panel form")

//Filter  Button finden und Speichern: 
const filterTabButtons = document.querySelectorAll("#hinweise .filter-tabs button")






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
            <span class="note-prio-badge">${prioText} <span> - </span><span>${vis}</span></span>
        </div>
        <div class="note-body"><p>${text}</p></div>
    `;

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