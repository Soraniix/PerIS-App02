

export function filterVolltext(zeile, suchbegriff, suchSpalteValue) {
    if (!suchbegriff) {
        return true; // Wenn kein Suchbegriff da ist, passt jede Zeile
    }

    const spaltenIndizes = { "id": 0, "vn": 1, "name": 2, "standort": 3, "system": 4, "delikt": 5, "von": 6, "bis": 7, "grund-erhebung": 8, "grund-erstellung": 9, "ersteller": 10, "erstelldatum": 11, "restlaufzeit": 12, "ablaufdatum": 13, "status": 14, "löschung": 15, "löschgrund": 16, "löscher": 17, "treffer": 18, "anzahl-treffer": 19, "ausgeleitet": 20, "einsatz": 21, "wartung": 22 };

    if (suchSpalteValue === "all") {
        for (const zelle of Array.from(zeile.cells)) {
            if (zelle.textContent.toLowerCase().includes(suchbegriff)) {
                return true;
            }
        }
        return false;
    } else {
        const index = spaltenIndizes[suchSpalteValue];
        if (index !== undefined && zeile.cells[index]) {
            return zeile.cells[index].textContent.toLowerCase().includes(suchbegriff);
        }
    }
    return false;
}

export function filterNachAktivenButtons(zeile, aktiveButtons, spaltenIndex) {
    if (aktiveButtons.length === 0) {
        return true;
    }
    const zellenInhalt = zeile.cells[spaltenIndex]?.textContent.toLowerCase() || '';
    const aktiveWerte = aktiveButtons.map(btn => (btn.value || btn.textContent).toLowerCase());
    return aktiveWerte.some(wert => zellenInhalt.includes(wert));
}

export function filterNachTyp(zeile, aktiveTypen) {
    if (aktiveTypen.length === 0) {
        return true;
    }
    const nameZuSpaltenindex = { "treffer": 18, "einsatz": 21, "wartung": 22 };
    return aktiveTypen.every(typ => {
        const spaltenIndex = nameZuSpaltenindex[typ.toLowerCase()];
        if (spaltenIndex === undefined) return false;
        const zelle = zeile.cells[spaltenIndex];
        return zelle && zelle.textContent.toLowerCase() === "ja";
    });
}

export function filterAusstehendeLoeschung(zeile, istAktiv) {
    if (!istAktiv) return true;
    const zellenWert = zeile.cells[15]?.textContent.toLowerCase() || '';
    return zellenWert === "vorgemerkt";
}

export function filterAusstehendeTreffer(zeile, istAktiv) {
    if (!istAktiv) return true;
    const zellenWertAusgeleitet = zeile.cells[20]?.textContent.toLowerCase() || '';
    const zellenWertTreffer = zeile.cells[18]?.textContent.toLowerCase() || '';
    return zellenWertAusgeleitet === "nein" && zellenWertTreffer === "ja";
}

export function filterNachStandort(zeile, aktiveStandorte) {
    if (aktiveStandorte.length === 0) return true;
    const zellenInhalt = zeile.cells[3]?.textContent.toLowerCase() || '';
    return aktiveStandorte.some(standort => zellenInhalt.includes(standort.toLowerCase()));
}