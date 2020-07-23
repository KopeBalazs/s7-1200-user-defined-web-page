
function showMonitorElementConfigurationMenu(elementId) {
  deletePreviousConfigMenu();
  createConfigMenuTitle();
  createConfigMenuUl();
  addConfigMenuElementName(elementId);
  addConfigMenuOptionsById(elementId);
}

function deletePreviousConfigMenu() {
  var prevConfMenu = document.getElementsByClassName("confMenu");
  while (prevConfMenu.length > 0) {
    prevConfMenu[0].remove();
  }
}

function createConfigMenuTitle() {
  var elemConfigMenuTxt = document.createElement("h2");
  elemConfigMenuTxt.className = "confMenu";
  elemConfigMenuTxt.innerHTML = "Monitor Element Config";
  monitorDesignMenu.appendChild(elemConfigMenuTxt);
}

function createConfigMenuUl() {
  var elemConfigUl = document.createElement("ul");
  elemConfigUl.className = "confMenu";
  elemConfigUl.id = "elemConfigUl";
  monitorDesignMenu.appendChild(elemConfigUl);
}

function addConfigMenuElementName(elementId) {
  var elementNameInput = document.createElement("INPUT");
  elementNameInput.setAttribute("type", "text");
  elementNameInput.value = adapterJSON.elements[elementId - 1].elementName;
  elementNameInput.id = "elementNameInput";
  elementNameInput.className = "confMenu";

  var elemConfigUl = document.getElementById("elemConfigUl");
  elemConfigUl.appendChild(elementNameInput);
}

function addConfigMenuOptionsById(elementId) {
  var elementConfigUl = document.getElementById("elemConfigUl");
  if (adapterJSON.elements[elementId - 1].elementType == 'timeDiagram') {
    var dataLi = document.createElement("LI");
    dataLi.className = "confMenu";

    var dataTxt = document.createTextNode("PLC data:");

    var dataDatalist = document.createElement("datalist");
    dataDatalist.id = "plcTags";

    var dataOptions;
    for (var i = 1; i <= sizeOfPlcVarArrays; i++) {
      dataOptions = document.createElement("option");
      dataOptions.setAttribute("value", "programVarsInt[" + i + "]");

      dataDatalist.appendChild(dataOptions);
    }
    for (var i = 1; i <= sizeOfPlcVarArrays; i++) {
      dataOptions = document.createElement("option");
      dataOptions.setAttribute("value", "programVarsReal[" + i + "]");

      dataDatalist.appendChild(dataOptions);
    }

    var dataInput = document.createElement("INPUT");
    dataInput.setAttribute("list", "plcTags");
    dataInput.id = "dataInput";
    dataInput.className = "input";

    dataInput.appendChild(dataDatalist);
    dataInput.value = adapterJSON.elements[elementId - 1].data;
    dataInput.setAttribute("onfocus", "this.value=''");

    dataLi.appendChild(dataTxt);
    dataLi.appendChild(dataInput);

    elementConfigUl.appendChild(dataLi);




    var dataTxt = document.createTextNode("Sample time (s):");

    var dataSampleTimeInput = document.createElement("INPUT");
    dataSampleTimeInput.setAttribute("type", "text");
    dataSampleTimeInput.value = adapterJSON.elements[elementId - 1].dataSampleTime;
    dataSampleTimeInput.id = "dataSampleTimeInput";
    dataSampleTimeInput.className = "input";

    var dataSampleTimeLi = document.createElement("LI");
    dataSampleTimeLi.className = "confMenu";

    dataSampleTimeLi.appendChild(dataTxt);
    dataSampleTimeLi.appendChild(dataSampleTimeInput);

    elementConfigUl.appendChild(dataSampleTimeLi);




    var saveElementConfigBtn = document.createElement("div");
    saveElementConfigBtn.id = "saveElementConfigBtn";
    saveElementConfigBtn.innerHTML = "OK";
    var removeElementConfigBtn = document.createElement("div");
    removeElementConfigBtn.innerHTML = "Remove";
    removeElementConfigBtn.id = "removeElementConfigBtn";
    

    var elementConfigBtns = document.createElement("LI");
    elementConfigBtns.id = "elementConfigBtns";
    elementConfigBtns.appendChild(saveElementConfigBtn);
    elementConfigBtns.appendChild(removeElementConfigBtn);
    elementConfigUl.appendChild(elementConfigBtns);

    saveElementConfigBtn.addEventListener("click", saveElementConfigLoc);
    removeElementConfigBtn.addEventListener("click", removeElementLoc);

    function saveElementConfigLoc(){
      saveElementConfig(elementId);
    }
    function removeElementLoc(){
      removeElement(elementId);
    }
  }
}

function saveElementConfig(elementId){
  var elementName = document.getElementById("elementNameInput").value;
  console.log("Element name: "+elementName);
  if (adapterJSON.elements[elementId - 1].elementType == 'timeDiagram') {
    var data = document.getElementById("dataInput").value;
    var dataSampleTime = parseInt(document.getElementById("dataSampleTimeInput").value, 10);
    console.log("data: "+ typeof(data));
    console.log("dataSampleTime: "+typeof(dataSampleTime));
  }
  setAdapterElementName(elementId, elementName);
  setAdapterData(elementId, data);
  setAdapterDataSampleTime(elementId, dataSampleTime);
}

function removeElement(elementId){
  var monitorElement = document.getElementById(elementId);
  monitorElement.remove();
  setAdapterElementId(elementId, 0);
  deletePreviousConfigMenu();
}