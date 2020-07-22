
function showMonitorElementConfigurationMenu(elementId) {
  deletePreviousConfigMenu();
  createConfigMenuTitle();
  createConfigMenuUl();
  addConfigMenuElementName(elementId);
  addConfigMenuOptionsById(elementId);
  saveElementConfig(elementId);
  removeElement(elementId);
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
    var elementPlcVarLi = document.createElement("LI");
    elementPlcVarLi.className = "confMenu";

    var elementPlcVarTxt = document.createTextNode("PLC data:");

    var elementPlcVarDatalist = document.createElement("datalist");
    elementPlcVarDatalist.id = "plcTags";

    var elementPlcVarOptions;
    for (var i = 1; i <= sizeOfPlcVarArrays; i++) {
      elementPlcVarOptions = document.createElement("option");
      elementPlcVarOptions.setAttribute("value", "programVarsInt[" + i + "]");

      elementPlcVarDatalist.appendChild(elementPlcVarOptions);
    }
    for (var i = 1; i <= sizeOfPlcVarArrays; i++) {
      elementPlcVarOptions = document.createElement("option");
      elementPlcVarOptions.setAttribute("value", "programVarsReal[" + i + "]");

      elementPlcVarDatalist.appendChild(elementPlcVarOptions);
    }

    var elementPlcVarInput = document.createElement("INPUT");
    elementPlcVarInput.setAttribute("list", "plcTags");
    elementPlcVarInput.id = "elementPlcVarInput";
    elementPlcVarInput.className = "input";

    elementPlcVarInput.appendChild(elementPlcVarDatalist);
    elementPlcVarInput.value = adapterJSON.elements[elementId - 1].elementPlcVar;
    elementPlcVarInput.setAttribute("onfocus", "this.value=''");

    elementPlcVarLi.appendChild(elementPlcVarTxt);
    elementPlcVarLi.appendChild(elementPlcVarInput);

    elementConfigUl.appendChild(elementPlcVarLi);




    var elementPlcVarTxt = document.createTextNode("Sample time (s):");

    var elementPlcVarSampleTimeInput = document.createElement("INPUT");
    elementPlcVarSampleTimeInput.setAttribute("type", "text");
    elementPlcVarSampleTimeInput.value = adapterJSON.elements[elementId - 1].elementPlcVarSampleTime;
    elementPlcVarSampleTimeInput.id = "elementPlcVarSampleTimeInput";
    elementPlcVarSampleTimeInput.className = "input";

    var elementPlcVarSampleTimeLi = document.createElement("LI");
    elementPlcVarSampleTimeLi.className = "confMenu";

    elementPlcVarSampleTimeLi.appendChild(elementPlcVarTxt);
    elementPlcVarSampleTimeLi.appendChild(elementPlcVarSampleTimeInput);

    elementConfigUl.appendChild(elementPlcVarSampleTimeLi);




    var saveElementConfigBtn = document.createElement("div");
    var removeElementConfigBtn = document.createElement("div");

    var elementConfigBtns = document.createElement("LI");
    elementConfigBtns.appendChild(saveElementConfigBtn);
    elementConfigBtns.appendChild(removeElementConfigBtn);

    elementConfigUl.appendChild(elementConfigBtns);
  }
}

function saveElementConfig(elementId){
  var elementName = document.getElementById("elementNameInput").value;
  if (adapterJSON.elements[elementId - 1].elementType == 'timeDiagram') {
    var elementPlcVar = document.getElementById("elementPlcVarInput").value;
    var elementPlcVarSampleTime = document.getElementById("elementPlcVarSampleTime").value;
  }
  setAdapterElementName(elementId, elementName);
  setAdapterElementPlcVar(elementId, elementPlcVar);
  setAdapterElementPlcVarSampleTime(elementId, elementPlcVarSampleTime);
}

function removeElement(elementId){
  var monitorElement = document.getElementById(elementId);
  monitorElement.remove();
  setAdapterElementId(elementId, 0);
}