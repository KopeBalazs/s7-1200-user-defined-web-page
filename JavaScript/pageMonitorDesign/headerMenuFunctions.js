
function saveElements() {
    if (!plcComInProgress) {
        console.log("save elements - started");

        var actElement;
        var actSize;
        var actVerticalPosition;
        var actHorizontalPosition;

        deletePreviousConfigMenu();
        loadScreenSet("Saving monitor elements");

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
        postPLCData('TagResources/elements.htm', postJson, loadScreenReset);

        console.log("save elements - ended");
    }

}

function resetElements() {
    if (!plcComInProgress) {
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

function openMonitorViewPage() {
    if (!plcComInProgress) {
        console.log("openMonitorViewPage");
        window.location.href = 'pageMonitorView.html';
    }
}