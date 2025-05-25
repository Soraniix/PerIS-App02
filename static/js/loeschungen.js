import { togglePanelVisibility } from "./uiHelpers.js"
import { markiereListenElementAlsSelektiert } from "./uiHelpers.js"

export function initialisiereLoeschungenSektion() {
    const loeschungSelektion = document.querySelector("#offene-loeschungen")
    console.log("initalisiere Löschungen... ")
    if (loeschungSelektion) {
        const addDelCloseButton = loeschungSelektion.querySelector(".close-button")
        const addDelDetailsPanel = loeschungSelektion.querySelector(".loesch-detail-panel")
        const addDelListe = loeschungSelektion.querySelectorAll("ul li")
        const addDelForm = loeschungSelektion.querySelector(".del-form")


        if (addDelForm) { // Sicherstellen, dass das Formular existiert
            addDelForm.addEventListener("submit", (event) => {
                event.preventDefault()
                
                if (addDelForm.checkValidity()){
                    addDelForm.reset()
                    const selectedLis = document.querySelector("#offene-loeschungen li.selected");
                    addDelDetailsPanel.classList.add("hidden")
                    selectedLis.remove()
                }
                
            });
        }



        addDelListe.forEach(li => {
            li.addEventListener("click", ()=> {
                oeffneDelDetails(li)
            })
        })

        if (addDelCloseButton) {
            addDelCloseButton.addEventListener("click", ()=> {
                addDelDetailsPanel.classList.add("hidden")
                togglePanelVisibility(addDelDetailsPanel, false)
            })
        }




        function oeffneDelDetails(li){
            markiereListenElementAlsSelektiert(li, addDelListe)
            togglePanelVisibility(addDelDetailsPanel, true)


            const id = li.querySelector(".value-recherche-id")
            const system = li.querySelector(".value-recherche-system")
            const vn = li.querySelector(".value-recherche-vn")
            const delikt = li.querySelector(".value-recherche-delikt")
            const delTagger = li.querySelector(".value-recherche-delTagger")
            const grund = li.querySelector(".value-recherche-grund")
            const text = li.querySelector(".value-recherche-text")

            const infoId = addDelDetailsPanel.querySelector(".del-info-id")
            const infoSystem = addDelDetailsPanel.querySelector(".del-info-system")
            const infoVn = addDelDetailsPanel.querySelector(".del-info-vn")
            const infoDelikt = addDelDetailsPanel.querySelector(".del-info-delikt")
            const infoDelTagger = addDelDetailsPanel.querySelector(".del-info-delTagger")
            const infoGrund = addDelDetailsPanel.querySelector(".del-info-grund")
            const infoText = addDelDetailsPanel.querySelector(".del-info-text")

            infoId.textContent = id.textContent
            infoSystem.textContent = system.textContent
            infoVn.textContent = vn.textContent
            infoDelikt.textContent = delikt.textContent
            infoDelTagger.textContent = delTagger.textContent
            infoGrund.value = grund.textContent.trim()
            infoText.textContent = text.textContent

        }

    }

}



