

let letzterAnkerZeilenIndex = -1;

function rowSelecting(event, alleZeilenArray) {
    const geklickteZeile = event.currentTarget;
    const aktuellerIndex = alleZeilenArray.indexOf(geklickteZeile);

    const isShiftPressed = event.shiftKey;
    const isCtrlPressed = event.ctrlKey || event.metaKey; // metaKey für macOS

    if (isShiftPressed && letzterAnkerZeilenIndex !== -1) {
        const [start, end] = [aktuellerIndex, letzterAnkerZeilenIndex].sort((a, b) => a - b);
        alleZeilenArray.forEach((zeile, index) => {
            if (index >= start && index <= end) {
                if (window.getComputedStyle(zeile).display !== "none") {
                    zeile.classList.add("row-selected");
                }
            }
        });
    } else if (isCtrlPressed) {
        geklickteZeile.classList.toggle("row-selected");
        letzterAnkerZeilenIndex = geklickteZeile.classList.contains("row-selected") ? aktuellerIndex : -1;
    } else {
        alleZeilenArray.forEach(zeile => zeile.classList.remove("row-selected"));
        geklickteZeile.classList.add("row-selected");
        letzterAnkerZeilenIndex = aktuellerIndex;
    }
}

export function initialisiereZeilenauswahl(zeilenNodeList) {
    const zeilenArray = Array.from(zeilenNodeList);
    zeilenArray.forEach(zeile => {
        zeile.addEventListener("click", (event) => {
            rowSelecting(event, zeilenArray);
        });
    });
}