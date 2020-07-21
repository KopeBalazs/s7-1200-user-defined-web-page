
  function showMonitorElementConfigurationMenu(elementId){
    deletePreviousConfigMenu();
    createConfigMenuFrame();
    addConfigMenuOptions(elementId);
  }

  //Delete previous config menus to show only the actual config menu
  function deletePreviousConfigMenu(){
    var prevConfMenu= document.getElementsByClassName("confMenu");
    while(prevConfMenu.length > 0){
      prevConfMenu[0].remove();
    }
  }

  //Create the frame of the config menu to show
  function createConfigMenuFrame(){
    var elemConfigMenuTxt= document.createElement("h2");
    //Add class name "confMenu" to be able to delete all the configuration tags 
    elemConfigMenuTxt.className= "confMenu";
    elemConfigMenuTxt.innerHTML= "Monitor Element Config";
    monitorDesignMenu.appendChild(elemConfigMenuTxt);
  }

  //Show the options for the selected monitor element
  function addConfigMenuOptions(elementId){
    
  }