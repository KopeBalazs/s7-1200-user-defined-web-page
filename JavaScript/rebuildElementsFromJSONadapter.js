function rebuildElementsFromJSONAdapterForMonitorDesignPage() {
    for (var actInd = 0; actInd < 15; actInd++) {
        if (adapterJSON.elements[actInd].elementId != 0) {
            loadMonitorElementById(adapterJSON.elements[actInd].elementId);
        }
    }
}

function rebuildElementsFromJSONAdapterForMonitorDesignView() {
    for (var actInd = 0; actInd < 15; actInd++) {
        if (adapterJSON.elements[actInd].elementId != 0) {
            loadMonitorElementById(adapterJSON.elements[actInd].elementId);
        }
    }
}