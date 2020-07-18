//Create a variable to save the minimum width of each monitor element container div
var elementMinSize;
//Save the constant ratio between the element wheight and width
const elementHeightWidthRatio = 15 / 31;

function createMonitorElementByType(monitorElementType) {
  var freeElementId = getAdapterFreeElementId();
  console.log("ID of the free element slot: "+freeElementId);

  //If the ID returned by the PLC is zero, it means that the "Elements" array is full and no more elements can be added
  if (freeElementId != 0) {
    //Create a new div which will contain the monitor element
    var monitorElementContainerDiv = document.createElement("div");

    //Add ID to the container div
    monitorElementContainerDiv.id = freeElementId;

    console.log("Monitor element container div created");
    //Add class names to the container div: what kind of div it is ("monitorElementContainerDiv") and what kind of element it contains
    monitorElementContainerDiv.className = "monitorElementContainerDiv" + " " + monitorElementType;
    
    //Append monitor element to the container div
    monitorElementContainerDiv.appendChild(getMonitorElementAndMinSizeByType(monitorElementType, freeElementId));
    console.log("Element added to the container div");

    //Set the sizes of the created element to the minimum
    monitorElementContainerDiv.style.width = elementMinSize + "vw";
    //The ratio between the height and the width must be
    monitorElementContainerDiv.style.height = elementMinSize * elementHeightWidthRatio + "vw";

    //Upload the adapter with ID, type and the minimal size of the actual element
    setAdapterElement_id_type_minSize(freeElementId, monitorElementType, elementMinSize);

    //Create click event listener to drag and resize monitor element container div
    monitorElementContainerDiv.addEventListener('mousedown', mouseDown);
    console.log("Click event listener added to container div (resize and drag)");

    //Create a small div and place to the right bottom corner of the container div. This will be used to grab with the mouse at resizing
    monitorElementContainerDiv.appendChild(createResizerDiv());
    console.log("Resizer div added");

    //When the user clicks on one of the monitor elements, show the configuration menu to set it up
    //showMonitorElementConfigurationMenu(id);

    monitorWindow.appendChild(monitorElementContainerDiv);
  }

  else {
    alert("Limit of the monitor elements reached!");
  }

}

//Create a small div and place to the right bottom corner of the container div. This will be used to grab with the mouse at resizing
function createResizerDiv() {
  var divResizer = document.createElement("div");
  divResizer.className = "divResizer";
  return divResizer;
}

function getMonitorElementAndMinSizeByType(monitorElementType) {
  if (monitorElementType == "timeDiagram") {
    var canvasChart = document.createElement("canvas");

    //Created because the chart can't be created while it is "orphan", so it has to have a parent div
    var tempDiv = document.createElement("div");

    let chartContext = canvasChart.getContext('2d');

    elementMinSize = 15; //vw

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
          text: 'Time Diagram name',
          fontSize: 12
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