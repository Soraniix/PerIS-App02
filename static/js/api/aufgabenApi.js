

export async function createAufgabe(aufgabe_daten){
    
    try {
        const response = await fetch("/api/aufgaben", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(aufgabe_daten)
        })

        if (!response.ok){
            throw new Error(`HTTP Fehler! Status: ${response.status}`);
        }

        const erstelleAufgabeInfo = await response.json();
        console.log("Erfolgreich gespeichert! Server Antwort:", erstelleAufgabeInfo);


    }
    catch (error) {
        console.error("Fehler beim Senden/Speichern der neuen Aufgabe", error);
        throw error;
    }
}

export async function delAufgabe(idAufgabe) {
    try {
        console.log(idAufgabe)
        const response = await fetch(`/api/aufgaben/${idAufgabe}`, {
            method: "DELETE"
        })
        if (!response.ok) {
            throw new Error(`HTTP Fehler! Status: ${response.status}`)
        }
        const erstelleAufgabeInfo = await response.json()
        console.log("Erfolgreich gelöscht! Server Antwort: ", erstelleAufgabeInfo)

    } catch (error) {
        console.error("Fehler beim Löschen der Aufgabe", error)
        throw error
    }
    
}

export async function getAufgaben() {
    try {
        const response = await fetch("/api/aufgaben");
        if (!response.ok) {
            // Wirft einen Fehler, der von der aufrufenden Funktion gefangen werden kann
            throw new Error(`HTTP Fehler! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Daten vom API-Service empfangen:", data);
        return data; // Gibt das reine Array mit den Aufgaben-Objekten zurück
    } catch (error) {
        console.error("Fehler beim Laden der Aufgaben:", error);
        // Wirft den Fehler weiter, damit die UI darauf reagieren kann (z.B. Fehlermeldung anzeigen)
        throw error;
    }
}