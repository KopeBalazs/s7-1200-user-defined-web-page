
main();
function main() {
  init();
  loadScreenSet("Loading monitor elements");
  getElements(
    //The function in the parameter will be called after the get method executed
    afterGetFunctions);

}

function afterGetFunctions() {
  loadScreenReset();
  rebuildElementsFromJSONAdapter();
  dataProviderToMonitorElements();
}

//Initiate frequently used and global variables
function init() {
  monitorWindow = document.getElementById("monitorWindow");
  monitorDesignBtn = document.getElementById("monitorDesignTxt");
  monitorDesignBtn.addEventListener("click", openMonitorDesignPage);
  console.log("Init done");

}

