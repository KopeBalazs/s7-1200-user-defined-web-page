                                                                                                                                    //Create chart on click

var monitorElements=document.getElementsByClassName("monitorElement");
var chartID=0;
var divChartAct;
var divChartMinSize;

for(var i=0; i<monitorElements.length; i++){
  monitorElements[i].addEventListener("click", monitorMenuClick);
}

function monitorMenuClick(){
  var monitorWindow=document.getElementById("monitorWindow");

  var divChart= document.createElement("div");
  divChart.className= "chartDiv";
  divChart.addEventListener('mousedown', mouseDown);

  if(this.id == "timeDiagram"){
    divChartMinSize= 15;
    var canvasChart= document.createElement("canvas");
    canvasChart.id= "canvasChart"+chartID;
    divChart.appendChild(canvasChart);

    let chartContext = canvasChart.getContext('2d');

    // Global Options
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 10;
    Chart.defaults.global.defaultFontColor = 'black';

    let massPopChart = new Chart(chartContext, {
      type:'line', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
      
      options:{
        title:{
          display:true,
          text:'Time Series',
          fontSize: 15
        },
      }
    });
  }
  if(this.id == "textBoxIn"){
    divChartMinSize= 4;
    var txtInput= document.createElement("input");
    txtInput.id= "canvasChart"+chartID;
    divChart.appendChild(txtInput);
    divChart.style.width= 4;
  }
  
  chartID++;

  var divChartMenu=document.createElement("div");
  divChartMenu.className= "divChartMenu";
  divChartMenu.addEventListener("click", monitorElementMenuClick);
  divChart.appendChild(divChartMenu);

  var divResizer=document.createElement("div");
  divResizer.className= "divResizer";
  divChart.appendChild(divResizer);

  monitorWindow.appendChild(divChart);
  
}


                                                                                                                                    //-- *From: https://www.youtube.com/watch?v=NyZSIhzz5Do

function mouseDown(e){
  divChartAct=this;
  if((e.clientX/window.innerWidth*100 > divChartAct.getBoundingClientRect().right/window.innerWidth*100 - 1) && (e.clientY/window.innerWidth*100 > divChartAct.getBoundingClientRect().bottom/window.innerWidth*100 - 1)){    //If the cursor is at the right bottom corner

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseup', mouseUp);

    let prevX = e.clientX;
    
    function mouseMove(e){
      const divRect = divChartAct.getBoundingClientRect();
      let newX = prevX - e.clientX;
      let widthVw = (divChartAct.offsetWidth - newX)/window.innerWidth*100;
      let heightVw = divChartAct.offsetWidth/window.innerWidth*100 * 15/31;

      if(widthVw > divChartMinSize){                                                                                                             // Size limit
        if(divRect.left/window.innerWidth*100+widthVw <= 81.5 && divRect.top/window.innerWidth*100+heightVw <= 47  || newX>0){      // monitorWindow limit at resizing
          divChartAct.style.width = widthVw + "vw";
          divChartAct.style.height = heightVw + "vw";
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
        const divRect = divChartAct.getBoundingClientRect();
        let newX = prevX - e.clientX;
        let newY = prevY - e.clientY;
        let divChartLeft=(divRect.left - newX)/window.innerWidth*100;
        let divChartTop=(divRect.top - newY)/window.innerWidth*100;
        let divChartBottom=(divRect.bottom - newY)/window.innerWidth*100;
        let divChartRight=(divRect.right - newX)/window.innerWidth*100;

        if(divChartLeft>=1.5 && divChartTop>=5 && divChartRight<81.5 && divChartBottom<47){
          divChartAct.style.left = divChartLeft + "vw";
          divChartAct.style.top = divChartTop + "vw" ;
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
}

function monitorElementMenuClick(){

}
