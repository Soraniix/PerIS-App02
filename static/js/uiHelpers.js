

export function togglePanelVisibility(panelElement, show) {

    if (panelElement) {
        
        if (show) {
            panelElement.classList.remove("hidden")
        } else
            panelElement.classList.add("hidden")
    }    
}

export function markiereListenElementAlsSelektiert(listenElement, listeUnselectieren) {
    if(listeUnselectieren) {
        listeUnselectieren.forEach(element => element.classList.remove("selected"))
    }
    if (listenElement){
        listenElement.classList.add("selected")
    }
}