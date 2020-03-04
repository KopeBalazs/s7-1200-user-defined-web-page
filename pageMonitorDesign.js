//-- From: https://www.youtube.com/watch?v=NyZSIhzz5Do
const divChart=document.querySelector(".chart");

divChart.addEventListener('mousedown', mouseDown);

function mouseDown(e){
  if((e.clientX > divChart.getBoundingClientRect().right - 10) && (e.clientY > divChart.getBoundingClientRect().bottom - 10)){    //If the cursor is at the right bottom corner

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseup', mouseUp);

    let prevX = e.clientX;
    
    function mouseMove(e){
      const divRect = divChart.getBoundingClientRect();
      let newX = prevX - e.clientX;
      let widthVw = (divChart.offsetWidth - newX)/window.innerWidth*100;
      let heightVw = divChart.offsetWidth/window.innerWidth*100 * 42/80;

      if(widthVw > 15){ // Size limit
        if(divRect.left/window.innerWidth*100+widthVw <= 81.5 && divRect.top/window.innerWidth*100+heightVw <= 47  || newX>0){                // monitorWindow limit at resizing
          divChart.style.width = widthVw + "vw";
          divChart.style.height = heightVw + "vw";
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
  else{ //Dragging
      window.addEventListener('mousemove', mouseMove);
      window.addEventListener('mouseup', mouseUp);

      let prevX = e.clientX;
      let prevY = e.clientY;

      function mouseMove(e){
        const divRect = divChart.getBoundingClientRect();
        let newX = prevX - e.clientX;
        let newY = prevY - e.clientY;
        let divChartLeft=(divRect.left - newX)/window.innerWidth*100;
        let divChartTop=(divRect.top - newY)/window.innerWidth*100;
        let divChartBottom=(divRect.bottom - newY)/window.innerWidth*100;
        let divChartRight=(divRect.right - newX)/window.innerWidth*100;

        if(divChartLeft>=1.5 && divChartTop>=5 && divChartRight<81.5 && divChartBottom<47){
          divChart.style.left = divChartLeft + "vw";
          divChart.style.top = divChartTop + "vw" ;
        }
        
        prevX = e.clientX;
        prevY = e.clientY;
      }
      function mouseUp(){
        window.removeEventListener("mousemove", mouseMove);
        window.removeEventListener("mouseup", mouseUp);
      }
    }
    
    //--
}



let myChart = document.getElementById('myChart').getContext('2d');

    // Global Options
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontSize = 10;
    Chart.defaults.global.defaultFontColor = 'black';

    let massPopChart = new Chart(myChart, {
      type:'line', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
      
      options:{
        title:{
          display:true,
          text:'Time Series',
          fontSize: 15
        },
      }
    });