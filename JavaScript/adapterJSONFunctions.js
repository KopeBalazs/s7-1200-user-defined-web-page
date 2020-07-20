
function getAdapterFreeElementId(){
    for(var counterId=1 ; counterId<=sizeOfElementsArray ; counterId++){
        if(adapterJSON.elements[counterId-1].elementId == 0){
            return counterId;
        }
    }
    return 0;
}

function setAdapterElementId(elementIndex, elementId){
    adapterJSON.elements[elementIndex-1].elementId = elementId;
}
function setAdapterElementType(elementIndex, elementType){
    adapterJSON.elements[elementIndex-1].elementType = elementType;
}
function setAdapterElementName(elementIndex, elementName){
    adapterJSON.elements[elementIndex-1].elementName = elementName;
}
function setAdapterElementMinSize(elementIndex, elementMinSize){
    adapterJSON.elements[elementIndex-1].elementMinSize = elementMinSize;
}
function setAdapterElementSize(elementIndex, elementSize){
    adapterJSON.elements[elementIndex-1].elementSize = elementSize;
}
function setAdapterElementVerticalPosition(elementIndex, elementVerticalPosition){
    adapterJSON.elements[elementIndex-1].elementVerticalPosition = elementVerticalPosition;
}
function setAdapterElementHorizontalPosition(elementIndex, elementHorizontalPosition){
    adapterJSON.elements[elementIndex-1].elementHorizontalPosition = elementHorizontalPosition;
}

function setTimeDiagramAdapterType(elementIndex, type){
    adapterJSON.elements[elementIndex-1].type = type;
}
function setTimeDiagramAdapterDisplay(elementIndex, display){
    adapterJSON.elements[elementIndex-1].display = display;
}
function setTimeDiagramAdapterText(elementIndex, text){
    adapterJSON.elements[elementIndex-1].text = text;
}
function setTimeDiagramAdapterFontSize(elementIndex, fontSize){
    adapterJSON.elements[elementIndex-1].fontSize = fontSize;
}
