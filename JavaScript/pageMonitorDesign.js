
var menuMonitorElements;
var monitorWindow;
var monitorElementAdapters = [];
var monitorDesignMenu;

main();
function main() {
  init();
  addEventListenerToMenuElements();
}

//Initiate frequently used and global variables
function init() {
  menuMonitorElements = document.getElementsByClassName("monitorElement");
  monitorWindow = document.getElementById("monitorWindow");
  monitorDesignMenu = document.getElementById("monitorDesignMenu");
  console.log("Init done");
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

  //Append the container div to the monitor windows
  createMonitorElementByType(this.id);
}

