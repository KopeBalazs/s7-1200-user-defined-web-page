
  function showMonitorElementConfigurationMenu(elementId){
    deletePreviousConfigMenu();
    createConfigMenuTitle();
    createConfigMenuUl();
    addConfigMenuElementName(elementId);
  }

  function deletePreviousConfigMenu(){
    var prevConfMenu= document.getElementsByClassName("confMenu");
    while(prevConfMenu.length > 0){
      prevConfMenu[0].remove();
    }
  }

  function createConfigMenuTitle(){
    var elemConfigMenuTxt= document.createElement("h2");
    elemConfigMenuTxt.className= "confMenu";
    elemConfigMenuTxt.innerHTML= "Monitor Element Config";
    monitorDesignMenu.appendChild(elemConfigMenuTxt);
  }

  function createConfigMenuUl(){ 
    var elemConfigUl= document.createElement("ul");
    elemConfigUl.className= "confMenu";
    elemConfigUl.id= "elemConfigUl";
    monitorDesignMenu.appendChild(elemConfigUl);
  }

  function addConfigMenuElementName(elementId){
    var elementNameInput = document.createElement("INPUT");
    elementNameInput.setAttribute("type", "text");
    elementNameInput.value = adapterJSON.elements[elementId-1].elementName;
    elementNameInput.id = "elementNameInput";
    elementNameInput.className = "confMenu";

    var elemConfigUl = document.getElementById("elemConfigUl");
    elemConfigUl.appendChild(elementNameInput);
  }

  function addConfigMenuOptionsById(elementId){
    var elemConfigUl= document.createElement("ul");
    if(adapterJSON.elements[elementId-1].elementType == 'timeDiagram'){
        
    }
  }