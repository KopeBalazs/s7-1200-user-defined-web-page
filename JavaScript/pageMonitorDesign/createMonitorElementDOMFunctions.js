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

    if(monitorElementType == "timeDiagram"){
      elementHeightWidthRatio = 15 / 31;
    }
    if(monitorElementType == "textBoxOut"){
      elementHeightWidthRatio = 15 / 60;
    }
    if(monitorElementType == "alertLight"){
      elementHeightWidthRatio = 1;
    }
    if(monitorElementType == "plainText"){
      elementHeightWidthRatio = 15 / 60;
    }
    if(monitorElementType == "button"){
      elementHeightWidthRatio = 15 / 45;
    }

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

  if(adapterJSON.elements[monitorElementId-1].elementType == "timeDiagram"){
    elementHeightWidthRatio = 15 / 31;
  }
  if(adapterJSON.elements[monitorElementId-1].elementType == "textBoxOut"){
    elementHeightWidthRatio = 15 / 60;
  }
  if(adapterJSON.elements[monitorElementId-1].elementType == "alertLight"){
    elementHeightWidthRatio = 1;
  }
  if(adapterJSON.elements[monitorElementId-1].elementType == "plainText"){
    elementHeightWidthRatio = 15 / 60;
  }
  if(adapterJSON.elements[monitorElementId-1].elementType == "button"){
    elementHeightWidthRatio = 15 / 45;
  }

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

    setAdapterElementMinSize(elementId, 15);

    //Append the canvas to the tempDiv
    tempDiv.appendChild(canvasChart);
    tempDiv.style.width = "95%";
    tempDiv.style.height = "95%";

    // Global Options
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 10;
    Chart.defaults.global.defaultFontColor = 'black';

    let massPopChart = new Chart(canvasChart, {
      type: 'line', // bar, horizontalBar, pie, line, doughnut, radar, polarArea

      options: {
        title: {
          display: true,
          text: 'Time Diagram',
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
  if (monitorElementType == "textBoxOut") {
    var textBox = document.createElement("output");
    textBox.style.backgroundColor = "rgb(240, 240, 240)";
    textBox.value = "Text Box";
    setAdapterElementMinSize(elementId, 5);
    return textBox;
  }
  if (monitorElementType == "alertLight") {
    var img = document.createElement("img");
    img.src = "Images/greenLight-icn.png";
    img.class = "alertLight";
    setAdapterElementMinSize(elementId, 3);
    return img;
  }
  if (monitorElementType == "button") {
    var button = document.createElement("button");
    button.id = 'button_'+elementId;
    button.style.width = "100%";
    button.innerHTML = "Button";
    setAdapterElementMinSize(elementId, 3);
    return button;
  }
  if (monitorElementType == "textBoxIn") {
    
  }
  if (monitorElementType == "plainText"){
    var plainText = document.createElement("output");
    plainText.style.backgroundColor = "rgb(240, 240, 240)";
    plainText.value = "Plain text";
    setAdapterElementMinSize(elementId, 5);
    return plainText;
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
          text: "Time Diagram",
          fontSize: adapterJSON.elements[elementId-1].fontSize
        },
      }
    });

    return tempDiv;
  }
  if (monitorElementType == "textBoxOut") {
    var textBox = document.createElement("output");
    textBox.style.backgroundColor = "rgb(240, 240, 240)";
    textBox.value = "Text Box";
    return textBox;
  }
  if (monitorElementType == "alertLight") {
    var img = document.createElement("img");
    img.src = "Images/greenLight-icn.png";
    img.class = "alertLight";
    return img;
  }
  if (monitorElementType == "button") {
    var button = document.createElement("button");
    button.id = 'button'+elementId;
    button.style.width = "100%";
    button.innerHTML = "Button";
    return button;
  }
  if (monitorElementType == "textBoxOut") {

  }
  if (monitorElementType == "plainText"){
    var plainText = document.createElement("output");
    plainText.style.backgroundColor = "rgb(240, 240, 240)";
    plainText.value = "Plain Text";
    return plainText;
  }
  else return 0;
}