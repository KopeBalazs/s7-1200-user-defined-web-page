
//Save the constant ratio between the element wheight and width
const elementHeightWidthRatio = 15 / 31;

function createNewMonitorElementByType(monitorElementType) {
  var freeElementId = getAdapterFreeElementId();
  console.log("ID of the free element slot: " + freeElementId);

  //If the ID returned by the PLC is zero, it means that the "Elements" array is full and no more elements can be added
  if (freeElementId != 0) {
    //Create a new div which will contain the monitor element
    var monitorElementContainerDiv = document.createElement("div");

    //Add ID to the container div
    monitorElementContainerDiv.id = freeElementId;
    //Add ID to the JSON adapter
    setAdapterElementId(freeElementId, freeElementId);

    //Add element type to JSON adapter
    setAdapterElementType(freeElementId, monitorElementType);
    //Add class names to the container div: what kind of div it is ("monitorElementContainerDiv") and what kind of element it contains
    monitorElementContainerDiv.className = "monitorElementContainerDiv" + " " + monitorElementType;

    //Append monitor element to the container div
    monitorElementContainerDiv.appendChild(getNewMonitorElementAndMinSizeById(freeElementId));

    //Set the sizes of the created element to the minimum
    monitorElementContainerDiv.style.width = adapterJSON.elements[freeElementId-1].elementMinSize + "vw";
    //The ratio between the height and the width must be
    monitorElementContainerDiv.style.height = adapterJSON.elements[freeElementId-1].elementMinSize * elementHeightWidthRatio + "vw";

    //Create click event listener to drag and resize monitor element container div
    monitorElementContainerDiv.addEventListener('mousedown', mouseDown);
    console.log("Click event listener added to container div (resize and drag)");

    //Create a small div and place to the right bottom corner of the container div. This will be used to grab with the mouse at resizing
    monitorElementContainerDiv.appendChild(createResizerDiv());
    console.log("Resizer div added");

    //When the user clicks on one of the monitor elements, show the configuration menu to set it up
    //showMonitorElementConfigurationMenu(freeElementId);

    monitorWindow.appendChild(monitorElementContainerDiv);
  }

  else {
    alert("Limit of the monitor elements reached!");
  }
}

function loadMonitorElementById(monitorElementId) {

  //Create a new div which will contain the monitor element
  var monitorElementContainerDiv = document.createElement("div");
  console.log("Monitor element container div created");

  //Add ID to the container div
  monitorElementContainerDiv.id = monitorElementId;

  //Add class names to the container div: what kind of div it is ("monitorElementContainerDiv") and what kind of element it contains
  monitorElementContainerDiv.className = "monitorElementContainerDiv" + " " + adapterJSON.elements[monitorElementId-1].elementType;

  //Append monitor element to the container div
  monitorElementContainerDiv.appendChild(getMonitorElementAndMinSizeById(monitorElementId));
  console.log("Element added to the container div");

  //Create click event listener to drag and resize monitor element container div
  monitorElementContainerDiv.addEventListener('mousedown', mouseDown);
  console.log("Click event listener added to container div (resize and drag)");

  //Create a small div and place to the right bottom corner of the container div. This will be used to grab with the mouse at resizing
  monitorElementContainerDiv.appendChild(createResizerDiv());
  console.log("Resizer div added");

  //Load the sizes of the created element
  monitorElementContainerDiv.style.width = adapterJSON.elements[monitorElementId-1].elementSize + "vw";
  //The ratio between the height and the width must be "elementHeightWidthRatio"
  monitorElementContainerDiv.style.height = adapterJSON.elements[monitorElementId-1].elementSize * elementHeightWidthRatio + "vw";

  //Place the monitor element div at the saved position
  monitorElementContainerDiv.style.left = adapterJSON.elements[monitorElementId-1].elementVerticalPosition + "vw";
  monitorElementContainerDiv.style.top = adapterJSON.elements[monitorElementId-1].elementHorizontalPosition + "vw";;

  monitorWindow.appendChild(monitorElementContainerDiv);
}

//Create a small div and place to the right bottom corner of the container div. This will be used to grab with the mouse at resizing
function createResizerDiv() {
  var divResizer = document.createElement("div");
  divResizer.className = "divResizer";
  return divResizer;
}

function getNewMonitorElementAndMinSizeById(elementId) {
  var monitorElementType = adapterJSON.elements[elementId-1].elementType;
  if (monitorElementType == "timeDiagram") {
    var canvasChart = document.createElement("canvas");

    //Created because the chart can't be created while it is "orphan", so it has to have a parent div
    var tempDiv = document.createElement("div");

    let chartContext = canvasChart.getContext('2d');

    setAdapterElementMinSize(elementId, 15);

    //Append the canvas to the tempDiv
    tempDiv.appendChild(canvasChart);
    tempDiv.style.width = "100%";
    tempDiv.style.height = "100%";

    // Global Options
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 10;
    Chart.defaults.global.defaultFontColor = 'black';

    let massPopChart = new Chart(chartContext, {
      type: 'line', // bar, horizontalBar, pie, line, doughnut, radar, polarArea

      options: {
        title: {
          display: true,
          text: 'Time Diagram ' + elementId,
          fontSize: 12
        },
      }
    });
    setTimeDiagramAdapterType(elementId, 'line');
    setTimeDiagramAdapterDisplay(elementId, true);
    setAdapterElementName(elementId, 'Time Diagram ' + elementId);
    setTimeDiagramAdapterFontSize(elementId, 12);

    return tempDiv;
  }
  if (monitorElementType == "textBoxIn") {
    elementMinSize = 5; //vw


  }
  if (monitorElementType == "alertLight") {

  }
  if (monitorElementType == "gauge") {

  }
  if (monitorElementType == "buttom") {

  }
  if (monitorElementType == "textBoxOut") {

  }
  else return 0;
}

function getMonitorElementAndMinSizeById(elementId) {
  var monitorElementType = adapterJSON.elements[elementId-1].elementType;
  if (monitorElementType == "timeDiagram") {
    var canvasChart = document.createElement("canvas");

    //Created because the chart can't be created while it is "orphan", so it has to have a parent div
    var tempDiv = document.createElement("div");

    let chartContext = canvasChart.getContext('2d');

    //Append the canvas to the tempDiv
    tempDiv.appendChild(canvasChart);
    tempDiv.style.width = "100%";
    tempDiv.style.height = "100%";

    // Global Options
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 10;
    Chart.defaults.global.defaultFontColor = 'black';

    let massPopChart = new Chart(chartContext, {
      type: adapterJSON.elements[elementId-1].type, // bar, horizontalBar, pie, line, doughnut, radar, polarArea

      options: {
        title: {
          display: adapterJSON.elements[elementId-1].display,
          text: adapterJSON.elements[elementId-1].elementName,
          fontSize: adapterJSON.elements[elementId-1].fontSize
        },
      }
    });

    return tempDiv;
  }
  if (monitorElementType == "textBoxIn") {
    elementMinSize = 5; //vw


  }
  if (monitorElementType == "alertLight") {

  }
  if (monitorElementType == "gauge") {

  }
  if (monitorElementType == "buttom") {

  }
  if (monitorElementType == "textBoxOut") {

  }
  else return 0;
}