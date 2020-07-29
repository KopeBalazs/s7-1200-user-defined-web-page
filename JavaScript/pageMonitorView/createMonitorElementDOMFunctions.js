function loadMonitorElementById(monitorElementId) {

  //Create a new div which will contain the monitor element
  var monitorElementContainerDiv = document.createElement("div");
  console.log("Monitor element container div created");

  //Add ID to the container div
  monitorElementContainerDiv.id = monitorElementId;

  //Add class names to the container div: what kind of div it is ("monitorElementContainerDiv") and what kind of element it contains
  monitorElementContainerDiv.className = "monitorElementContainerDiv" + " " + adapterJSON.elements[monitorElementId - 1].elementType;

  //Append monitor element to the container div
  monitorElementContainerDiv.appendChild(getMonitorElementAndMinSizeById(monitorElementId));
  console.log("Element added to the container div");

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

  //Load the sizes of the created element
  monitorElementContainerDiv.style.width = adapterJSON.elements[monitorElementId - 1].elementSize * monitorDesignToViewRatio + "vw";
  //The ratio between the height and the width must be "elementHeightWidthRatio"
  monitorElementContainerDiv.style.height = adapterJSON.elements[monitorElementId - 1].elementSize * elementHeightWidthRatio * monitorDesignToViewRatio + "vw";

  //Place the monitor element div at the saved position
  monitorElementContainerDiv.style.left = (adapterJSON.elements[monitorElementId - 1].elementVerticalPosition - padding) * monitorDesignToViewRatio + padding + "vw";
  monitorElementContainerDiv.style.top = (adapterJSON.elements[monitorElementId - 1].elementHorizontalPosition - headerMenuHeight) * monitorDesignToViewRatio + headerMenuHeight + "vw";;

  monitorWindow.appendChild(monitorElementContainerDiv);
}

var charts = new Array();

function getMonitorElementAndMinSizeById(elementId) {
  var monitorElementType = adapterJSON.elements[elementId - 1].elementType;
  if (monitorElementType == "timeDiagram") {
    var canvasChart = document.createElement("canvas");

    //Created because the chart can't be created while it is "orphan", so it has to have a parent div
    var tempDiv = document.createElement("div");

    //Append the canvas to the tempDiv
    tempDiv.appendChild(canvasChart);
    tempDiv.style.width = "95%";
    tempDiv.style.height = "95%";

    // Global Options
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 10;
    Chart.defaults.global.defaultFontColor = 'black';

    var massPopChart = new Chart(canvasChart, {
      type: adapterJSON.elements[elementId - 1].type, // bar, horizontalBar, pie, line, doughnut, radar, polarArea
      data: {
        labels: [],
        datasets: [{
          label: '',
          data: []
        }]
      },
      options: {
        title: {
          display: adapterJSON.elements[elementId - 1].display,
          text: adapterJSON.elements[elementId - 1].elementName,
          fontSize: adapterJSON.elements[elementId - 1].fontSize
        },
      }

    });
    
    charts.push({'id': elementId, 'chart': massPopChart});

    return tempDiv;
  }
  if (monitorElementType == "textBoxOut") {
    var textBox = document.createElement("output");
    textBox.style.backgroundColor = "rgb(240, 240, 240)";
    textBox.id = "textBoxOut_"+elementId;
    return textBox;
  }
  if (monitorElementType == "alertLight") {
    var img = document.createElement("img");
    img.src = "Images/greenLight-icn.png";
    img.class = "alertLight";
    img.id = "alertLight_"+elementId;
    return img;
  }
  if (monitorElementType == "gauge") {

  }
  if (monitorElementType == "buttom") {

  }
  if (monitorElementType == "textBoxIn") {

  }
  if (monitorElementType == "plainText") {
    var plainText = document.createElement("output");
    plainText.style.backgroundColor = "rgb(240, 240, 240)";
    plainText.id = 'plainText_'+elementId;
    return plainText;
  }
  else return 0;
}