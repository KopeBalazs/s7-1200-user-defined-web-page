
var menuMonitorElements;
var monitorWindow;
var monitorElements=[];
var monitorDesignMenu;

main();
function main(){
  init();
  addEventListenerToMenuElements();
}

//Structure to save created monitor elements and its attributes
function monitorElement(elementID, elementType, elementName, elementSize, elementVerticalPosition, elementHorizontalPosition){
  this.elementID = elementID;
  this.elementType = elementType;
  this.elementName = elementName;
  this.elementMinSize = elementSize;
  this.elementVerticalPosition = elementVerticalPosition;
  this.elementHorizontalPosition = elementHorizontalPosition;
}

//Initiate frequently used and global variables
function init(){
  menuMonitorElements = document.getElementsByClassName("monitorElement");
  monitorWindow = document.getElementById("monitorWindow");
  monitorDesignMenu = document.getElementById("monitorDesignMenu");
  console.log("Init done");
}

//Add click event listener to menu elements
function addEventListenerToMenuElements(){
  for(var i=0; i<menuMonitorElements.length; i++){
    menuMonitorElements[i].addEventListener("click", monitorMenuClick);
  }
  console.log("Event listeners added to menu elements");
}

//When the user clicks a menu element, place the new monitor element in the monitor window
function monitorMenuClick(){
  
  //Append the container div to the monitor windows
  monitorWindow.appendChild(createMonitorElementByType(this.id));
}

