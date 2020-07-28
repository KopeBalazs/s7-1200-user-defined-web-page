function rebuildElementsFromJSONAdapter() {
    for (var actInd = 0; actInd < sizeOfElementsArray; actInd++) {
        if (adapterJSON.elements[actInd].elementId != 0) {
            loadMonitorElementById(adapterJSON.elements[actInd].elementId);
        }
    }
}