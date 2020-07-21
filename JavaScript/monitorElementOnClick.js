function mouseDown(e){
    console.log("Mouse down on monitor element - program started");

    actualMonitorElementContainerDiv=this;

    //When the user clicks on one of the monitor element, show the configuration menu to set it up
    showMonitorElementConfigurationMenu(actualMonitorElementContainerDiv.id);

    //If the cursor is at the right bottom corner (Resizing)
    if((e.clientX/window.innerWidth*100 > actualMonitorElementContainerDiv.getBoundingClientRect().right/window.innerWidth*100 - 1) && (e.clientY/window.innerWidth*100 > actualMonitorElementContainerDiv.getBoundingClientRect().bottom/window.innerWidth*100 - 1)){    
  
      window.addEventListener('mousemove', mouseMove);
      window.addEventListener('mouseup', mouseUp);
  
      var prevX = e.clientX;
      
      function mouseMove(e){
        var divRect = actualMonitorElementContainerDiv.getBoundingClientRect();
        var newX = prevX - e.clientX;
        var widthVw = (actualMonitorElementContainerDiv.offsetWidth - (newX+2))/window.innerWidth*100;
        console.log(widthVw);
        var heightVw = actualMonitorElementContainerDiv.offsetWidth/window.innerWidth*100 * elementHeightWidthRatio;
        
        var elementId= parseInt(actualMonitorElementContainerDiv.id);
        console.log(elementId);
        console.log(adapterJSON.elements[elementId-1].elementMinSize);

        if(widthVw > adapterJSON.elements[elementId-1].elementMinSize){                                                                 // Size limit
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
    //Dragging
    else{
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
  
          if(divChartLeft>=1.5 && divChartTop>=5 && divChartRight<=81.6 && divChartBottom<=47){
            actualMonitorElementContainerDiv.style.left = divChartLeft + "vw";
            actualMonitorElementContainerDiv.style.top = divChartTop + "vw" ;
          }
          else{
            console.log("Out of window");
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
    console.log("Mouse down on monitor element - program ended");
  }
