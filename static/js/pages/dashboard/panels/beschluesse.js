import { togglePanelVisibility } from "../../../helpers/uiHelpers.js"


export function initialisiereBeschluesse() {

    const beschluesseSektion = document.querySelector("#uebersicht-beschluesse")

    if (beschluesseSektion){

        const addBeschlussDetailsPanel = beschluesseSektion.querySelector(".beschlussdetails")
        const addBeschlussDetailsCloseButton = beschluesseSektion.querySelector(".close-button")
        const addAlleBeschluesse = beschluesseSektion.querySelectorAll(".dashboard-list li")



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

            togglePanelVisibility(addBeschlussDetailsPanel, true)

        }

        if (addBeschlussDetailsCloseButton) {
            addBeschlussDetailsCloseButton.addEventListener("click", ()=> {
                togglePanelVisibility(addBeschlussDetailsPanel, false)
            })
        }
    } 

}
