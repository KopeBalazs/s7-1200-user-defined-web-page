
function saveElements() {
    console.log("save elements - started");

    var actElement;
    var actSize;
    var actVerticalPosition;
    var actHorizontalPosition;

    for (var actId = 1; actId <= sizeOfElementsArray; actId++) {
        if (adapterJSON.elements[actId - 1].elementId != 0) {
            actElement = document.getElementById('' + actId);
            actSize = actElement.offsetWidth / window.innerWidth * 100;
            actVerticalPosition = actElement.getBoundingClientRect().left / window.innerWidth * 100;
            actHorizontalPosition = actElement.getBoundingClientRect().top / window.innerWidth * 100;
            setAdapterElement_size_verticalPosition_horizontalPosition(actId, actSize, actVerticalPosition, actHorizontalPosition);

            console.log("save elements - for cycle end");
        }
    }

    operationJsonCreate();
    postPLCData('TagResources/elements.htm', operationJson);

    console.log("save elements - ended");
}