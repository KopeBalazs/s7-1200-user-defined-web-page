function mouseDown(e){
    console.log("Mouse down on monitor element - code started");

    actualMonitorElementContainerDiv=this;

    //When the user clicks on one of the monitor element, show the configuration menu to set it up
    showMonitorElementConfigurationMenu();

    //If the cursor is at the right bottom corner
    if((e.clientX/window.innerWidth*100 > actualMonitorElementContainerDiv.getBoundingClientRect().right/window.innerWidth*100 - 1) && (e.clientY/window.innerWidth*100 > actualMonitorElementContainerDiv.getBoundingClientRect().bottom/window.innerWidth*100 - 1)){    
  
      window.addEventListener('mousemove', mouseMove);
      window.addEventListener('mouseup', mouseUp);
  
      let prevX = e.clientX;
      
      function mouseMove(e){
        const divRect = actualMonitorElementContainerDiv.getBoundingClientRect();
        let newX = prevX - e.clientX;
        let widthVw = (actualMonitorElementContainerDiv.offsetWidth - newX)/window.innerWidth*100;
        let heightVw = actualMonitorElementContainerDiv.offsetWidth/window.innerWidth*100 * 15/31;
  
        if(widthVw > elementMinSize){                                                                                                             // Size limit
          if(divRect.left/window.innerWidth*100+widthVw <= 81.5 && divRect.top/window.innerWidth*100+heightVw <= 47  || newX>0){      // monitorWindow limit at resizing
            actualMonitorElementContainerDiv.style.width = widthVw + "vw";
            actualMonitorElementContainerDiv.style.height = heightVw + "vw";
            prevX = e.clientX;
          }
          else{
            
          }
        }
        else{
          console.log("Size limit");
        }
      }
  
      function mouseUp(){
        window.removeEventListener("mousemove", mouseMove);
        window.removeEventListener("mouseup", mouseUp);
      }
    }
    else{                                                                                                                             //Dragging
        window.addEventListener('mousemove', mouseMove);
        window.addEventListener('mouseup', mouseUp);
  
        let prevX = e.clientX;
        let prevY = e.clientY;
  
        function mouseMove(e){
          const divRect = actualMonitorElementContainerDiv.getBoundingClientRect();
          let newX = prevX - e.clientX;
          let newY = prevY - e.clientY;
          let divChartLeft=(divRect.left - newX)/window.innerWidth*100;
          let divChartTop=(divRect.top - newY)/window.innerWidth*100;
          let divChartBottom=(divRect.bottom - newY)/window.innerWidth*100;
          let divChartRight=(divRect.right - newX)/window.innerWidth*100;
  
          if(divChartLeft>=1.5 && divChartTop>=5 && divChartRight<81.5 && divChartBottom<47){
            actualMonitorElementContainerDiv.style.left = divChartLeft + "vw";
            actualMonitorElementContainerDiv.style.top = divChartTop + "vw" ;
          }
          
          prevX = e.clientX;
          prevY = e.clientY;
        }
        function mouseUp(){
          window.removeEventListener("mousemove", mouseMove);
          window.removeEventListener("mouseup", mouseUp);
        }
      }
                                                                                                                                      //-- *
    console.log("Mouse down on monitor element - code ended");
  }

  function showMonitorElementConfigurationMenu(){
    deletePreviousConfigMenu();
    createConfigMenuFrame();
    addConfigMenuOptions();
  }

  //Delete previous config menus to show only the actual config menu
  function deletePreviousConfigMenu(){
    var prevConfMenu= document.getElementsByClassName("confMenu");
    while(prevConfMenu.length > 0){
      prevConfMenu[0].parentNode.removeChild(prevConfMenu[0]);
    }
  }

  //Create the frame of the config menu to show
  function createConfigMenuFrame(){
    var elemConfigMenuTxt= document.createElement("h2");
    //Add class name "confMenu" to be able to delete all the configuration tags 
    elemConfigMenuTxt.className= "confMenu";
    elemConfigMenuTxt.innerHTML= "Monitor Element Config";
    var hr= document.createElement("hr");
    hr.className= "confMenu";
    monitorDesignMenu.appendChild(elemConfigMenuTxt);
    monitorDesignMenu.appendChild(hr);
  }

  //Show the options for the selected monitor element
  function addConfigMenuOptions(){
    
  }