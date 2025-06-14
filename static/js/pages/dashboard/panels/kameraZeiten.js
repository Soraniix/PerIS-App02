
export function initialisiereKameraZeitenSektion(){
    console.log("initalisiere Kamerazeiten...")
    const kameraZeitenSektion = document.querySelector("#kamera-zeiten")

    if (kameraZeitenSektion) {
        const addKameraZeitenChange = kameraZeitenSektion.querySelector(".edit-times-button")
        const addKameraZeitenSave = kameraZeitenSektion.querySelector(".save-times-button")
        const nameToggelButton = kameraZeitenSektion.querySelector(".edit-times-button")

        if (addKameraZeitenChange) {
            addKameraZeitenChange.addEventListener("click", () => {
                const changeInputs = kameraZeitenSektion.querySelectorAll("input, select")
                const addZeitenForm = kameraZeitenSektion.querySelector("form")
                
            
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
        }

        if (addKameraZeitenSave) {
            addKameraZeitenSave.addEventListener("click", (event) => {
                event.preventDefault()
                let kameraDaten = {}
                const changeInputs = kameraZeitenSektion.querySelectorAll("input, select")
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
        }
    }
}
