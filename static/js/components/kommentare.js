

export function initialisiereKommentarfunktion(containerElement, commentableType, commentableId) {

    if(containerElement){

        containerElement.innerHTML = erstelleKommentarBereichHTML();

        const addKommentarButton = containerElement.querySelector(".add-comment-task-button")
        const addKommentarInhalt = containerElement.querySelector(".new-comment-task")
        const addKommentarForm = containerElement.querySelector("form")
        console.log("addKommentarForm nach querySelector:", addKommentarForm);

        

        async function ladeUndZeigeKommentare() {
            console.log("Versuche Kommentare vom Backend zu laden...")
            const kommentarListeUl = containerElement.querySelector(".task-comment-list")

            if(!kommentarListeUl){
                console.error("Kommentar-Liste nicht gefunden")
                return;
            }

            try {
                const response = await fetch(`/api/${commentableType}/${commentableId}/kommentare`);
                if(!response.ok){
                    throw new Error(`HTTP Fehler! Status: ${response.status}`)
                }

                const kommentareDatenArray = await response.json();
                console.log("Empfangene Kommentare: ", kommentareDatenArray);

                kommentarListeUl.innerHTML =""

                if (kommentareDatenArray.length === 0) {
                    kommentarListeUl.innerHTML = "<li><p>Keine Kommentare vorhanden</p></li>"
                    return;
                }

                kommentareDatenArray.forEach(kommentar => {
                    const newLi = document.createElement("li")
                    newLi.classList.add("comment-li")
                    newLi.dataset.commentID= kommentar.id

                    
                    const erstelldatum = kommentar.erstelldatum
                    ? new Date(kommentar.erstelldatum).toLocaleString('de-De', {dateStyle: 'short', timeStyle: 'short'})
                    : "-"
                    
                    newLi.innerHTML =`
                    <img class="rotes-kreuz" src="/static/images/rotesKreuz.png" alt="rotesKreuz">
                    <div>
                        <div class="task-name-date-comment">${kommentar.ersteller} - ${erstelldatum}:</div>
                        <p class="task-comment-content">${kommentar.inhalt}</p>
            
                    </div>
                    `

                    newLi.querySelector(".rotes-kreuz").addEventListener("click", async () => {
                        if (newLi){
                            const kommentar_id = newLi.dataset.commentID
                            const check = confirm("Sind Sie sicher, dass sie den Kommentar löschen möchten?")
                            if (check) {
                                try {
                                    const response = await fetch(`/api/kommentare/${kommentar_id}`, {method: "DELETE"})
                                    if (!response.ok){
                                        throw new Error(`HTTP FEHLER! STATUS: ${response.status}`)
                                    }

                                    const erstellKommentarHinweis = await response.json();
                                    console.log("Erfolgreich gelöscht! Server Antwort:", erstellKommentarHinweis)

                                    if (typeof ladeUndZeigeKommentare === "function"){
                                        ladeUndZeigeKommentare()
                                    }
                                    

                                } catch (error) {
                                    console.error("Fehler beim Löschen des Kommentares", error)
                                    alert("Fehler beim Löschen des Kommentares: "+ error.message)
                                }
                            }
                        }


                    })

                    kommentarListeUl.append(newLi)

                });

            } catch (error) {
                console.error("Fehler beim Laden und Anzeigen der Kommentare", error)
                if (kommentarListeUl) kommentarListeUl.innerHTML= "<li><p>Keine Kommentare vorhanden</p></li>"
            }

        }

        addKommentarForm.addEventListener("submit", async function(event) {
            event.preventDefault();
            if (!addKommentarForm.checkValidity()){
                return;
            }

            
            const daten_kommentar = {
                "commentable_id": commentableId,
                "commentable_type": commentableType,
                "inhalt": addKommentarInhalt.value
            }

            try {
                const response = await fetch("/api/kommentare", {
                    method: "Post",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(daten_kommentar)
                })

                if (!response.ok){
                    throw new Error(`HTTP Fehler! Status: ${response.status}`);
                }

                const erstelleKommentarInfo = await response.json();
                console.log("Erfolgreich gespeichert! Server Antwort:", erstelleKommentarInfo)

                if (typeof ladeUndZeigeKommentare === "function") {
                    ladeUndZeigeKommentare()
                }

                addKommentarForm.reset()

                

            } catch (error) {
                console.error("Fehler beim Senden/ Speichern des neuen Hinweises:", error);
                alert("Es gab einen Fehler beim Speichern des Kommentares: " + error.message);
            }
        })
        

        ladeUndZeigeKommentare()

    }
    
}


function erstelleKommentarBereichHTML() {
    const htmlCodeKommentare = 
    `               <div class="border-unten"></div>
                    <h4 style="text-align: center;">Kommentare</h4>
                    
                    <div class="existing-comments-list">
                        <ul class="task-comment-list">
                        </ul>
                    </div>


                    <form class="kommentar-form">
                        <textarea class="new-comment-task change-info-task" placeholder="Neuer Kommentar..." required></textarea>
                        <button type="submit" class="add-comment-task-button change-info-task">Kommentar hinzufügen</button>
                    </form>
                `;
    return htmlCodeKommentare;
}

