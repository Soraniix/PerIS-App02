import * as filters from '../../helpers/tableFilters.js';
import { initialisiereZeilenauswahl } from '../../components/tableRowSelector.js';
import { initialisiereKontextmenue } from '../../components/tableContextMenu.js';

export function initialisiereRechercheTabelleFilter() {
    const filterSektion = document.querySelector(".filter-tools-tabelle");
    if (!filterSektion) return;

    // 2. DOM-Elemente einmalig finden
    const sucheInput = filterSektion.querySelector("#tabelleSucheInput");
    const spaltenAuswahl = filterSektion.querySelector(".auswahl-suche");
    const filterBtnsSystem = filterSektion.querySelectorAll(".filter-btn-system button");
    const filterBtnsGrund = filterSektion.querySelectorAll(".filter-btn-grund button");
    const filterBtnsTyp = filterSektion.querySelectorAll(".filter-btn-typ button");
    const filterBtnsStatus = filterSektion.querySelectorAll(".filter-btn-status button");
    const filterBtnsStandort = filterSektion.querySelectorAll(".filter-btn-standort input");
    const filterBtnAusstehendeLoeschung = filterSektion.querySelector(".ausstehende-loeschung");
    const filterBtnAusstehendeTreffer = filterSektion.querySelector(".ausstehende-treffer");
    
    const rechercheTabelle = document.querySelector(".recherche-tabelle");
    if (!rechercheTabelle) return;
    const tabellenKoerper = rechercheTabelle.querySelector("tbody");
    const rechercheTabellenZeilen = tabellenKoerper.querySelectorAll("tr");
    const kontextMenue = document.querySelector(".kontext-menue");

    // 3. Spezialisten initialisieren
    initialisiereZeilenauswahl(rechercheTabellenZeilen);
    initialisiereKontextmenue(tabellenKoerper, kontextMenue);

    // 4. Die zentrale Filterfunktion, die die Logik der Spezialisten nutzt
    const tabellenFilter = () => {
        const suchbegriff = sucheInput.value.toLowerCase();
        const suchSpalteValue = spaltenAuswahl.value;
        const aktiveSystemButtons = Array.from(filterBtnsSystem).filter(btn => btn.classList.contains("active"));
        const aktiveGrundButtons = Array.from(filterBtnsGrund).filter(btn => btn.classList.contains("active"));
        const aktiveTypButtons = Array.from(filterBtnsTyp).filter(btn => btn.classList.contains("active")).map(btn => btn.textContent);
        const aktiveStatusButtons = Array.from(filterBtnsStatus).filter(btn => btn.classList.contains("active"));
        const aktiveStandorte = Array.from(filterBtnsStandort).filter(opt => opt.checked).map(opt => opt.value);
        const loeschungAktiv = filterBtnAusstehendeLoeschung.classList.contains("active");
        const trefferAktiv = filterBtnAusstehendeTreffer.classList.contains("active");

        rechercheTabellenZeilen.forEach(zeile => {
            const isVisible =
                filters.filterVolltext(zeile, suchbegriff, suchSpalteValue) &&
                filters.filterNachAktivenButtons(zeile, aktiveSystemButtons, 4) &&
                filters.filterNachAktivenButtons(zeile, aktiveGrundButtons, 9) &&
                filters.filterNachTyp(zeile, aktiveTypButtons) &&
                filters.filterNachAktivenButtons(zeile, aktiveStatusButtons, 14) &&
                filters.filterNachStandort(zeile, aktiveStandorte) &&
                filters.filterAusstehendeLoeschung(zeile, loeschungAktiv) &&
                filters.filterAusstehendeTreffer(zeile, trefferAktiv);
            
            zeile.style.display = isVisible ? "" : "table-row";
        });
    };

    // 5. Event-Listener einrichten
    const allSimpleToggleButtons = [
        ...filterBtnsSystem, ...filterBtnsGrund, ...filterBtnsTyp, ...filterBtnsStatus,
        filterBtnAusstehendeLoeschung, filterBtnAusstehendeTreffer
    ];

    sucheInput.addEventListener("input", tabellenFilter);
    spaltenAuswahl.addEventListener("change", tabellenFilter);
    
    allSimpleToggleButtons.forEach(button => {
        if(button) button.addEventListener("click", () => {
            button.classList.toggle("active");
            tabellenFilter();
        });
    });

    filterBtnsStandort.forEach(checkbox => {
        checkbox.addEventListener("change", tabellenFilter);
    });

    // Initialen Filterlauf starten, falls einige Filter voreingestellt sind
    tabellenFilter();
}