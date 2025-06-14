


export function initialisiereAusleitungSektion(){
    const ausleitungenSektion = document.querySelector("#offene-ausleitungen")
    if (ausleitungenSektion) {
        const addAuslCloseButton = ausleitungenSektion.querySelector(".ausl-details-panel .close-button")
        const addAuslDetailsPanel = ausleitungenSektion.querySelector(".ausl-details-panel")
        const addAuslListeLi = ausleitungenSektion.querySelectorAll(".ul-ausl-dashboard li")
        const addAuslFormDone = ausleitungenSektion.querySelector(".ausl-done")
        const addAuslFromComment = ausleitungenSektion.querySelector(".ausl-comment-form")
        const addAuslCommentBox = ausleitungenSektion.querySelector(".ausl-comment-send")
        const addAuslPanelCommentList = ausleitungenSektion.querySelector(".ausl-comment-ul")
        const USERAUSLCOMMENT = "Soranix"

        if (addAuslFromComment) {
            addAuslFromComment.addEventListener("submit", (event) => {
                event.preventDefault();

                const selectedLi = ausleitungenSektion.querySelector(".ul-ausl-dashboard li.selected");
                if (!selectedLi) {
                    alert("Bitte zuerst einen Ausleitungs-Eintrag auswählen!");
                    return;
                }

                const selectedID = selectedLi.dataset.rechercheId;

                if (addAuslCommentBox.value.trim() === "") return;

                const newComment = document.createElement("li");
                newComment.dataset.auslComment = "new-" + Date.now();
                newComment.classList.add(`zu-ausl-id-${selectedID}`);
                newComment.classList.add("ausl-comment-li");

                const time_now = new Date().toLocaleString('de-DE');
                newComment.innerHTML = `
                    <img class="ausl-rotes-kreuz" src="/static/images/rotesKreuz.png" alt="rotesKreuz">
                    <div class="ausl-comment-li-meta"><strong>${USERAUSLCOMMENT} am ${time_now}</strong></div>
                    <div class="ausl-comment-li-content">${addAuslCommentBox.value}</div>
                `;

                const delKreuz = newComment.querySelector(".ausl-rotes-kreuz");
                delKreuz.addEventListener("click", () => {
                    newComment.remove();
                });

                if (addAuslPanelCommentList) {
                    addAuslPanelCommentList.prepend(newComment);
                }

                addAuslCommentBox.value = "";
            });
        }

        if (addAuslFormDone) {
            addAuslFormDone.addEventListener("submit", (event) => {
                event.preventDefault()
            
                const selectedList = ausleitungenSektion.querySelector(".ul-ausl-dashboard li.selected")
                if (selectedList) {
                    selectedList.remove()
                }
                addAuslFormDone.reset()
                addAuslDetailsPanel.classList.add("hidden")
            })
            
            
            addAuslListeLi.forEach(li => {
                li.addEventListener("click", ()=> {
                    oeffneAuslDetails(li)
                })
            })
        }

        function oeffneAuslDetails(li) {
            addAuslListeLi.forEach(eintrag => eintrag.classList.remove("selected"))
            li.classList.add("selected")
            addAuslDetailsPanel.classList.remove("hidden")
            
            const allComment = ausleitungenSektion.querySelectorAll(".ausl-comment-li")
            const idSelected = li.dataset.rechercheId
            const allCommentZuId = ausleitungenSektion.querySelectorAll(`.zu-ausl-id-${idSelected}`)
            allComment.forEach(comment => comment.classList.add("hidden"))
            allCommentZuId.forEach(comment => comment.classList.remove("hidden"))
            
            allCommentZuId.forEach(commi => {
                const kreuz = commi.querySelector(".ausl-rotes-kreuz")
                kreuz.addEventListener("click", ()=> {
                    commi.remove();
                })
            })

        }

        if (addAuslCloseButton) {
            addAuslCloseButton.addEventListener("click", ()=> {
                addAuslDetailsPanel.classList.add("hidden")
            })
        }
    }
}

