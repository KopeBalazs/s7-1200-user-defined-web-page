
function getAdapterFreeElementId(){
    for(var counterId=1 ; counterId<=sizeOfElementsArray ; counterId++){
        if(adapterJSON.elements[counterId-1].elementId == 0){
            return counterId;
        }
    }
    return 0;
}

function setAdapterElement_id_type_minSize(elementIndex, elementId, elementType, elementMinSize){
    adapterJSON.elements[elementIndex-1].elementId = elementId;
    adapterJSON.elements[elementIndex-1].elementType = elementType;
    adapterJSON.elements[elementIndex-1].elementMinSize = elementMinSize;
}

function setAdapterElement_size_verticalPosition_horizontalPosition(elementIndex, elementSize, elementVerticalPosition, elementHorizontalPosition){
    adapterJSON.elements[elementIndex-1].elementSize = elementSize;
    adapterJSON.elements[elementIndex-1].elementVerticalPosition = elementVerticalPosition;
    adapterJSON.elements[elementIndex-1].elementHorizontalPosition = elementHorizontalPosition;
}

function setTimeDiagramAdapterElementAttributes(elementIndex, type, display, text, fontSize){
    adapterJSON.elements[elementIndex-1].type = type;
    adapterJSON.elements[elementIndex-1].display = display;
    adapterJSON.elements[elementIndex-1].text = text;
    adapterJSON.elements[elementIndex-1].fontSize = fontSize;
}
