
function getAdapterFreeElementId(){
    for(var counterId=1 ; counterId<=sizeOfElementsArray ; counterId++){
        if(adapterJSON.elements[counterId-1].elementId == 0){
            return counterId;
        }
    }
    return 0;
}

function setAdapterElement_id_type_minSize(elementId, elementType, elementMinSize){
    adapterJSON.elements[elementId-1].elementId = elementId;
    adapterJSON.elements[elementId-1].elementType = elementType;
    adapterJSON.elements[elementId-1].elementMinSize = elementMinSize;
}

function setAdapterElement_size_verticalPosition_horizontalPosition(elementSize, elementVerticalPosition, elementHorizontalPosition){
    adapterJSON.elements[elementId-1].elementSize = elementSize;
    adapterJSON.elements[elementId-1].elementVerticalPosition = elementVerticalPosition;
    adapterJSON.elements[elementId-1].elementHorizontalPosition = elementHorizontalPosition;
}

function setTimeDiagramAdapterElementAttributes(elementId, type, display, text, fontSize){
    adapterJSON.elements[elementId-1].type = type;
    adapterJSON.elements[elementId-1].display = display;
    adapterJSON.elements[elementId-1].text = text;
    adapterJSON.elements[elementId-1].fontSize = fontSize;
}
