import { togglePanelVisibility } from "./uiHelpers.js";


export function initialisiereRechercheAddPanel() {
    const containerPanelNeueRecherche = document.querySelector("#panel-recherche-hinzufuegen")

    if (true) {
        // Öffnen - Schließen Panel Add Recherche
        const addPanelNeueRecherche = document.querySelector(".panel-content")
        const addPanelCloseBtn = document.querySelector(".close-button-new")
        const addPanelOeffnenBtn = document.querySelector(".open-button")
        const addPanelRahmen = document.querySelector("#panel-recherche-hinzufuegen")

        // Live-Suche Delik
        const deliktInput = containerPanelNeueRecherche.querySelector("#new-recherche-delikt")
        const deliktVorschlaegeContainer = containerPanelNeueRecherche.querySelector("#new-recherche-delik-vorschlaege")
        const moeglicheDelikte = [
                                    "§242 Diebstahl",
                                    "§243 Besonders schwerer Fall des Diebstahls",
                                    "§244 Diebstahl mit Waffen; Bandendiebstahl; Wohnungseinbruchdiebstahl",
                                    "§246 Unterschlagung",
                                    "§249 Raub",
                                    "§250 Schwerer Raub",
                                    "§223 Körperverletzung",
                                    "§224 Gefährliche Körperverletzung",
                                    "§263 Betrug",
                                    "§265a Erschleichen von Leistungen",
                                    "§266 Untreue",
                                    "§267 Urkundenfälschung",
                                    "§29 BtMG Handel mit Betäubungsmitteln",
                                    "§30 BtMG Bandenmäßiger Handel mit Betäubungsmitteln",
                                    "§129 Bildung krimineller Vereinigungen"
                                ];

        // Live-Suche Standort
        const standortInput = containerPanelNeueRecherche.querySelector("#new-recherche-standort")
        const standortVorschlaegeContainer = containerPanelNeueRecherche.querySelector("#new-recherche-standort-vorschlaege")
        const moeglicheStandorte = ["GR-SB", "GR-HW", "GR-ASB", "GR-JK", "GR-HS", "GR-NG", "ZI-B178", "ZI-FS", "ZI-CS", "PM-01", "PM-02"
                                    ];

        // Live-Suche Grund
        const grundInput = containerPanelNeueRecherche.querySelector("#new-recherche-grund")
        const grundVorschlaegeContainer = containerPanelNeueRecherche.querySelector("#new-recherche-grund-vorschlaege")
        const moeglicheGruende = ["Beschluss", "Repressiv", "Präventiv"]

        // Live-Suche User
        const userInput = containerPanelNeueRecherche.querySelector("#new-recherche-user")
        const userVorschlaegeContainer = containerPanelNeueRecherche.querySelector("#new-recherche-user-vorschlaege")
        const moeglicheUser = ["JeTo", "PuNi", "LiRo", "SuMa", "WaFr", "ScKa", "HaMa","RaMa", "WiMa"]

        // Speichern Recherche
        const creatBtn = containerPanelNeueRecherche.querySelector(".save-button")
        const rechercheTabelle = document.querySelector(".recherche-tabelle tbody")
        const neueRechercheFormular = containerPanelNeueRecherche.querySelector(".form-add-new-recherche");













        // Event Öffnen / Schließen Add Panel
        if(addPanelNeueRecherche && addPanelCloseBtn && addPanelOeffnenBtn) {
            addPanelCloseBtn.addEventListener("click", closeAddRecherchePanel)
            addPanelOeffnenBtn.addEventListener("click", openAddRecherchePanel)
        }
        // Live Suche - Delikt
        if (deliktInput && deliktVorschlaegeContainer && moeglicheDelikte){
            deliktInput.addEventListener("input", () => {
                zeigeVorschlage(moeglicheDelikte, deliktInput, deliktVorschlaegeContainer)
            })


            deliktInput.addEventListener('blur', () => {
                // Kurze Verzögerung, um Klicks auf die Vorschläge noch zu ermöglichen
                setTimeout(() => {
                    togglePanelVisibility(deliktVorschlaegeContainer, false);
                    validateInput(moeglicheDelikte, deliktInput)
                }, 150);
                // validi
                

            });
            deliktInput.addEventListener('focus', () => {
                zeigeVorschlage(moeglicheDelikte, deliktInput, deliktVorschlaegeContainer)
                togglePanelVisibility(deliktVorschlaegeContainer, true);
                
            });
        }
        //Live Suche - Standort
        if (standortInput && standortVorschlaegeContainer && moeglicheStandorte){
            standortInput.addEventListener("input", () => {
                zeigeVorschlage(moeglicheStandorte, standortInput, standortVorschlaegeContainer)
            })

            standortInput.addEventListener("blur", () => {
                setTimeout(() => {
                    togglePanelVisibility(standortVorschlaegeContainer, false)
                    validateInput(moeglicheStandorte, standortInput)
                }, 150);
            })
            
            standortInput.addEventListener('focus', () => {
                zeigeVorschlage(moeglicheStandorte, standortInput, standortVorschlaegeContainer)
                togglePanelVisibility(standortVorschlaegeContainer, true);
            });
        }
        // Live Suche - Grund
        if (grundInput && grundVorschlaegeContainer && moeglicheGruende){
            grundInput.addEventListener("input", ()=> {
                zeigeVorschlage(moeglicheGruende, grundInput, grundVorschlaegeContainer)
            })

            grundInput.addEventListener("blur", () => {
                setTimeout(() => {
                    togglePanelVisibility(grundVorschlaegeContainer, false)
                    validateInput(moeglicheGruende, grundInput)
                }, 150);
            })

                grundInput.addEventListener('focus', () => {
                zeigeVorschlage(moeglicheGruende, grundInput, grundVorschlaegeContainer)
                togglePanelVisibility(grundVorschlaegeContainer, true);
            });

        }

        // Live Suche - User
        if (userInput && userVorschlaegeContainer && moeglicheUser){
            userInput.addEventListener("click", ()=> {
                zeigeVorschlage(moeglicheUser, userInput, userVorschlaegeContainer)
            })

            userInput.addEventListener("blur", () => {
                setTimeout(() => {
                    togglePanelVisibility(userVorschlaegeContainer, false)
                    validateInput(moeglicheUser, userInput)
                }, 150);
            })
            
                userInput.addEventListener('focus', () => {
                zeigeVorschlage(moeglicheUser, userInput, userVorschlaegeContainer)
                togglePanelVisibility(userVorschlaegeContainer, true);
            });
        }

        // Event Speichern der Recherche
        if (creatBtn) {
            creatBtn.addEventListener("click", saveRecherche)
        }















        //Funktion Live-Vorschläge
        function zeigeVorschlage(liste, eingabe, vorschlagContainer){
            const suchbegriff = eingabe.value.trim().toLowerCase();
            vorschlagContainer.innerHTML = ""; // Immer zuerst leeren, wenn die Funktion aufgerufen wird

            if (true) { // Nur wenn wirklich ein Suchbegriff da ist
                const passendeWerte = liste.filter(werteString =>
                    werteString.trim().toLowerCase().includes(suchbegriff)
                );

                if (passendeWerte.length > 0) {
                    passendeWerte.forEach(vorschlagsText => {
                        const neuesVorschlagsLi = document.createElement('li');
                        neuesVorschlagsLi.classList.add("vorschlag-item");
                        neuesVorschlagsLi.textContent = vorschlagsText;

                        neuesVorschlagsLi.addEventListener("click", () => {
                            eingabe.value = vorschlagsText;
                            togglePanelVisibility(vorschlagContainer, false); // Verstecke nach Auswahl
                        });
                        vorschlagContainer.appendChild(neuesVorschlagsLi);
                    });
                    togglePanelVisibility(vorschlagContainer, true); // Zeige Container, da Vorschläge da sind
                } else {
                    togglePanelVisibility(vorschlagContainer, false); // Keine Treffer, verstecke Container
                }
            } 
        }

        // Funktion zur Validierung
        function validateInput(liste, eingabe) {
            const inputValue = eingabe.value.trim(); // Wert aus dem Input-Feld, Leerzeichen entfernen
            const isValid = liste.includes(inputValue); // Prüfen, ob der Wert in der Liste ist
            
            if (inputValue !== "") {
                    if (isValid) {
                    eingabe.style.borderColor = 'green'; // Optisches Feedback
                    eingabe.setCustomValidity(''); // Meldung löschen, falls vorhanden
                    return true;
                } else {
                    // Wert ist ungültig
                    eingabe.style.borderColor = 'red'; // Optisches Feedback
                    // Eine benutzerdefinierte Validierungsmeldung setzen
                    eingabe.setCustomValidity('Bitte wählen Sie ein gültigen Wert aus der Liste aus.');
                    return false;
            }
            } else {
                eingabe.style.borderColor = '#888'; // Optisches Feedback
                eingabe.setCustomValidity('');
            }
            
        }
        // Funktion Close Panel Add-Recherche
        function closeAddRecherchePanel(){
            togglePanelVisibility(addPanelNeueRecherche, false)
            togglePanelVisibility(addPanelRahmen, false)
        }
        // Funktion Open Panel Add-Recherche
        function openAddRecherchePanel(){
            togglePanelVisibility(addPanelNeueRecherche, true)
            togglePanelVisibility(addPanelRahmen, true)
        }
        // Funktion Speichern Recherche
        function saveRecherche(){
            // Erstelle eine neue Zeile
            const newRow = document.createElement("tr");


            // Hilfsfunktion, um den Wert aus einem Input-Feld zu holen
            // querySelector wird auf addPanelNeueRecherche angewendet, um sicherzustellen, dass die IDs einzigartig sind
            const getInputValue = (id) => {
                const element = addPanelNeueRecherche.querySelector(id);
                // Prüfe, ob es ein Input-Feld ist (hat .value) oder ein anderes Element (hat .textContent)
                // In den meisten Fällen für Formularfelder ist es .value!
                return element ? (element.value || element.textContent || '').trim() : '';
            };

            // Hilfsfunktion, um eine Zelle zu erstellen und mit Inhalt zu füllen
            const createAndAppendCell = (content) => {
                const cell = document.createElement("td");
                cell.textContent = content;
                newRow.appendChild(cell); // Füge die Zelle direkt zur Zeile hinzu
            };

            // --- Werte aus den Input-Feldern holen ---
            // Beachte: Input-Felder haben .value, keine .textContent für ihren Inhalt
            const id = getInputValue("#new-recherche-id");
            const vn = getInputValue("#new-recherche-vn");
            const standort = getInputValue("#new-recherche-standort");
            const delikt = getInputValue("#new-recherche-delikt");
            const vonValue = getInputValue("#new-recherche-von"); // Dies ist der Wert des datetime-local Input
            const bisValue = getInputValue("#new-recherche-bis"); // Dies ist der Wert des datetime-local Input
            const grundErstellung = getInputValue("#new-recherche-grund"); // Prüfe diese ID: Ist sie "new-recherche-grundErstellung"?
            const ersteller = getInputValue("#new-recherche-ersteller");
            const erstelldatumValue = getInputValue("#new-recherche-erstellt"); // Dies ist der Wert des datetime-local Input



            // --- Zellen erstellen und Inhalte zuweisen ---

            // ID
            createAndAppendCell(id);

            // VN
            createAndAppendCell(vn);

            // EV Name (noch offen)
            createAndAppendCell("noch offen");

            // Standort
            createAndAppendCell(standort);

            // System (logikbasiert)
            let systemText = "UNBEKANNT";
            if (standort.startsWith("GR-")) { // Mit .startsWith() ist es sicherer als "in"
                systemText = "PerIS-Görlitz";
            } else if (standort.startsWith("ZI-")) {
                systemText = "PerIS-Zittau";
            } else if (standort.startsWith("PM-")) {
                systemText = "PerIS-Mobil";
            }
            createAndAppendCell(systemText);

            // Delikt
            createAndAppendCell(delikt);

            // Von (Datum/Zeit)
            // Wenn es ein datetime-local input ist, wird der Wert im YYYY-MM-DDTHH:MM Format geliefert.
            // Diesen kannst du direkt nutzen. Wenn du ein anderes Format in der Zelle anzeigen willst,
            // müsstest du ihn mit new Date() parsen und neu formatieren.
            createAndAppendCell(vonValue);

            // Bis (Datum/Zeit)
            createAndAppendCell(bisValue);

            // Grund Erhebung (noch offen)
            createAndAppendCell("noch offen");

            // Grund Erstellung
            createAndAppendCell(grundErstellung);

            // Ersteller
            createAndAppendCell(ersteller);

            // Erstelldatum (Datum/Zeit)
            createAndAppendCell(erstelldatumValue);

            // Restlaufzeit (noch offen)
            createAndAppendCell("noch offen");

            // Ablaufdatum (noch offen)
            createAndAppendCell("noch offen");

            // Status (noch offen)
            createAndAppendCell("noch offen");

            // Löschung
            createAndAppendCell("nein");

            // Löschgrund
            createAndAppendCell("-");

            // Löscher
            createAndAppendCell("-");

            // Treffer
            createAndAppendCell("nein"); // War zuvor nicht angehängt

            // Anzahl Treffer
            createAndAppendCell("0"); // Zahlen als String für textContent

            // Ausgeleitet
            createAndAppendCell("nein");

            // Einsatz
            createAndAppendCell("nein");

            // Wartung
            createAndAppendCell("nein");

            // Eine Zelle für den "Aktionen"-Button (wichtig!)
            const aktionenCell = document.createElement("td");
            const editButton = document.createElement("button");
            editButton.setAttribute("type", "button");
            editButton.classList.add("edit-recherche-btn"); // Dieselbe Klasse wie bei den anderen Edit-Buttons
            editButton.textContent = "Bearbeiten";
            // Hier müsste man dem neuen Edit-Button auch einen Event Listener hinzufügen,
            // der z.B. ein Editier-Panel öffnet! (Für später)
            aktionenCell.appendChild(editButton);
            newRow.appendChild(aktionenCell);


            // Füge die neue Zeile dem tbody hinzu
            rechercheTabelle.append(newRow);

            // Optional: Panel schließen oder Felder leeren nach dem Speichern
            // togglePanelVisibility(addPanelRahmen, false); // Beispiel: Panel schließen
            // addPanelNeueRecherche.reset(); // Wenn es ein <form> Element wäre, sonst Felder manuell leeren

            console.log("Neue Recherchezeile erfolgreich zur Tabelle hinzugefügt.");
            togglePanelVisibility(containerPanelNeueRecherche, false)
        }
    }
}

