
export function initialisiereRechercheTabelleFilter(){
    const filterSektion = document.querySelector(".filter-tools-tabelle")

    if (filterSektion) {
        const sucheInput = filterSektion.querySelector("#tabelleSucheInput")
        const spaltenAuswahl = filterSektion.querySelector(".auswahl-suche")
        const rechercheTabellenZeilen = document.querySelectorAll(".recherche-tabelle tbody tr");

        if (sucheInput && spaltenAuswahl && (rechercheTabellenZeilen.length > 0)) {
            sucheInput.addEventListener("input", filterRechercheTabelle)
            spaltenAuswahl.addEventListener("change", filterRechercheTabelle)
        }


        function filterRechercheTabelle(){
            const suchbegriff = sucheInput.value.trim().toLowerCase()
            const suchSpalte = spaltenAuswahl.value

            const spaltenIndizes = {
                "id": 0,
                "vn": 1,
                "name":2,
                "delikt":5
            }

            rechercheTabellenZeilen.forEach(zeile => {
                let zeileEnthaeltSuchbegriff = false
                const alleZellen = zeile.querySelectorAll("td")

                if (suchSpalte === "all") {

                    alleZellen.forEach(zelle => {
                        let new_zelle = zelle.textContent.trim().toLowerCase()
                        if (new_zelle.includes(suchbegriff)) {
                            zeileEnthaeltSuchbegriff = true
                        }
                    })
                } else {
                    const zielSpaltenIndex = spaltenIndizes[suchSpalte]
                    if (zielSpaltenIndex !== undefined){
                        const spezifischeZelle =  zeile.cells[zielSpaltenIndex]
                        if (spezifischeZelle !== undefined){
                            const normalSpezifischeZelle = spezifischeZelle.textContent.trim().toLowerCase()
                            if (normalSpezifischeZelle.includes(suchbegriff))
                                zeileEnthaeltSuchbegriff = true
                        }
                    }
                }
                
                if (zeileEnthaeltSuchbegriff || suchbegriff === "") {
                    zeile.style.display = "";
                } else {
                    zeile.style.display = "none"
                }

            })
        }

    }

} 

