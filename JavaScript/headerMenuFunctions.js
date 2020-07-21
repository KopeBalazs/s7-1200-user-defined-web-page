
function saveElements() {
    if (!plcComInProcess) {
        console.log("save elements - started");

        var actElement;
        var actSize;
        var actVerticalPosition;
        var actHorizontalPosition;

        loadScreenSet();

        for (var actId = 1; actId <= sizeOfElementsArray; actId++) {
            if (adapterJSON.elements[actId - 1].elementId != 0) {
                actElement = document.getElementById('' + actId);
                actSize = actElement.offsetWidth / window.innerWidth * 100;
                actVerticalPosition = actElement.getBoundingClientRect().left / window.innerWidth * 100;
                actHorizontalPosition = actElement.getBoundingClientRect().top / window.innerWidth * 100;

                setAdapterElementSize(actId, actSize);
                setAdapterElementVerticalPosition(actId, actVerticalPosition);
                setAdapterElementHorizontalPosition(actId, actHorizontalPosition);

                console.log("save elements - for cycle end");
            }
        }

        saveElementsJson();
        postPLCData('TagResources/elements.htm', operationJson, loadScreenReset);

        console.log("save elements - ended");
    }

}

function resetElements() {
    if (!plcComInProcess) {
        var actElement;
        for (var actIndex = 1; actIndex <= sizeOfElementsArray; actIndex++) {
            if (adapterJSON.elements[actIndex - 1].elementId != 0) {
                actElement = document.getElementById('' + actIndex);
                actElement.remove();
                setAdapterElementId(actIndex, 0);
            }
        }
        
    }
}