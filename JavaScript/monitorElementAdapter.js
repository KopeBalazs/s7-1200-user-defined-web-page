//Structure to save created monitor elements and its attributes
function monitorElementAdapter(elementID, elementType, elementName, elementSize, elementVerticalPosition, elementHorizontalPosition) {
    this.elementID = elementID;
    this.elementType = elementType;
    this.elementName = elementName;
    this.elementMinSize = elementSize;
    this.elementVerticalPosition = elementVerticalPosition;
    this.elementHorizontalPosition = elementHorizontalPosition;
  }