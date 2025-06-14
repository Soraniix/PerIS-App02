
import { togglePanelVisibility } from '../helpers/uiHelpers.js';
import { openRecherchePanel } from '../pages/rechercheuebersicht/addRecherche.js';

function handleKontextMenueAktion(event, kontextMenue) {
    const aktion = event.currentTarget.dataset.aktion;
    if (!aktion) return;

    if (aktion === "set-anzeigen") {
        const selektierteZeilen = document.querySelectorAll("tbody .row-selected");
        if (selektierteZeilen.length > 0) {
            openRecherchePanel(selektierteZeilen);
        }
    }
    togglePanelVisibility(kontextMenue, false);
}

function kontextMenuShow(event, kontextMenue) {
    event.preventDefault();
    kontextMenue.style.left = event.pageX + 'px';
    kontextMenue.style.top = event.pageY + 'px';
    togglePanelVisibility(kontextMenue, true);
}

export function initialisiereKontextmenue(tabellenKoerper, kontextMenue) {
    if (!tabellenKoerper || !kontextMenue) return;

    tabellenKoerper.addEventListener("contextmenu", (event) => {
        kontextMenuShow(event, kontextMenue);
    });

    kontextMenue.querySelectorAll("button[data-aktion]").forEach(btn => {
        btn.addEventListener("click", (event) => {
            handleKontextMenueAktion(event, kontextMenue);
        });
    });

    document.addEventListener("click", (event) => {
        if (!kontextMenue.contains(event.target)) {
            togglePanelVisibility(kontextMenue, false);
        }
    });
}