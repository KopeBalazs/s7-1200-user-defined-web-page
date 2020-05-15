//Create a variable to save the minimum width of each monitor element container div
var elementMinSize;

function createMonitorElementByType(monitorElementType){
  
  //Create a new div which will contain the monitor element
  var monitorElementContainerDiv= document.createElement("div");
  monitorElementContainerDiv.className= "monitorElementContainerDiv";
  console.log("Monitor element container div created");

  //Append monitor element to the container div
  monitorElementContainerDiv.appendChild(getMonitorElementAndMinSizeByType(monitorElementType));
  console.log("Element added to the container div");

  //Set the sizes of the created element to the minimum
  monitorElementContainerDiv.style.width= elementMinSize + "vw";
  //The ratio between the height and the width must be
  monitorElementContainerDiv.style.height= elementMinSize*15/31 + "vw";
  
  //Create click event listener to drag and resize monitor element container div
  monitorElementContainerDiv.addEventListener('mousedown', mouseDown);
  console.log("Click event listener added to container div (resize and drag)");

  //Create a new monitor element struct, save the container div and its attributes in it, then add it to the monitorElements array
  monitorElements.push(new monitorElement(this.id, elementMinSize, monitorElementContainerDiv));  //The id of the html element is the type of the chosen monitor element
  console.log("Element structure added to the element array");

  //Create a small div and place to the right bottom corner of the container div. This will be used to grab with the mouse at resizing
  monitorElementContainerDiv.appendChild(createResizerDiv());
  console.log("Resizer div added");

  //Return the created monitor element
  return monitorElementContainerDiv;
}

//Create a small div and place to the right bottom corner of the container div. This will be used to grab with the mouse at resizing
function createResizerDiv(){
  var divResizer=document.createElement("div");
  divResizer.className= "divResizer";
  return divResizer;
}

function getMonitorElementAndMinSizeByType(monitorElementType){
  if(monitorElementType == "timeDiagram"){
    var canvasChart= document.createElement("canvas");

    //Created bcs the chart can't be created while it is "orphan", so it needs to have a parent div
    var tempDiv= document.createElement("div");
    
    let chartContext = canvasChart.getContext('2d');

    elementMinSize = 15; //vw

    //Append the canvas to the tempDiv
    tempDiv.appendChild(canvasChart);
    tempDiv.style.width= "100%";
    tempDiv.style.height= "100%";
    
    // Global Options
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 10;
    Chart.defaults.global.defaultFontColor = 'black';
    
    let massPopChart = new Chart(chartContext, {
      type:'line', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
          
      options:{
        title:{
          display:true,
          text:'Time Diagram name',
          fontSize: 12
        },
      }
    });

    
    return tempDiv;
  }
  if(monitorElementType == "textBoxIn"){
    elementMinSize = 5; //vw
    

  }
  if(monitorElementType == "alertLight"){
        
  }
  if(monitorElementType == "gauge"){
        
  }
  if(monitorElementType == "buttom"){
        
  }
  if(monitorElementType == "textBoxOut"){
        
  }
  else return 0;
}