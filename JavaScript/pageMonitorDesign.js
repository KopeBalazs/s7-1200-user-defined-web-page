
var menuMonitorElements;
var monitorWindow;
var monitorDesignMenu;
var adapterJSON;
var saveElementsBtn;
var resetElementsBtn;
var operationJson;
const sizeOfElementsArray=15;

var loadDiv;
var loadGIF;

main();
function main() {
  init();
  loadScreenSet();
  getElements(
  //The function in the parameter will be called after the get method executed
  afterGetFunctions);
  
}

function afterGetFunctions(){
  loadScreenReset();
  addEventListenerToMenuElements();
  rebuildElementsFromJSONAdapterForMonitorDesignPage();
}

//Initiate frequently used and global variables
function init() {
  menuMonitorElements = document.getElementsByClassName("monitorElement");
  monitorWindow = document.getElementById("monitorWindow");
  monitorDesignMenu = document.getElementById("monitorDesignMenu");

  saveElementsBtn = document.getElementById("saveTxt");
  saveElementsBtn.addEventListener("click", saveElements);

  resetElementsBtn = document.getElementById("resetTxt");
  resetElementsBtn.addEventListener("click", resetElements);

  console.log("Init done");
  
}

function loadScreenSet(){
  monitorWindow.style.backgroundColor = 'rgb(220,220,220)';

  loadDiv = document.createElement("div");
  loadDiv.id="loadDiv";
  
  loadGIF = document.createElement("img");
  loadGIF.setAttribute("src", "https://media.giphy.com/media/DtfgzTxPw7pPq/giphy.gif");
  loadGIF.id="loadGif";

  monitorWindow.appendChild(loadDiv);
  loadDiv.appendChild(loadGIF);
}

function loadScreenReset(){
  monitorWindow.style.backgroundColor = 'rgb(230, 230, 230)';
  loadGIF.remove();
  loadDiv.remove();
}

//Add click event listener to menu elements
function addEventListenerToMenuElements() {
  for (var i = 0; i < menuMonitorElements.length; i++) {
    menuMonitorElements[i].addEventListener("click", monitorMenuClick);
  }
  console.log("Event listeners added to menu elements");
}

//When the user clicks a menu element, place the new monitor element in the monitor window
function monitorMenuClick() {

  //Create the monitor element and append it to the monitor window
  createNewMonitorElementByType(this.id);
}

