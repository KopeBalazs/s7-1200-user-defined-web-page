const el=document.querySelector(".chart");

el.addEventListener('mousedown', mouseDrag);

function mouseDrag(e){
    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseup', mouseUp);

    let prevX = e.clientX;
    let prevY = e.clientY;

    function mouseMove(e){
        let newX = prevX - e.clientX;
        let newY = prevY - e.clientY;

        const rect = el.getBoundingClientRect();

        el.style.left = (rect.left - newX)/window.innerWidth*100 + "vw";
        el.style.top = (rect.top - newY)/window.innerWidth*100 + "vw" ;

        prevX = e.clientX;
        prevY = e.clientY;
    }

    function mouseUp(){
        window.removeEventListener("mousemove", mouseMove);
        window.removeEventListener("mouseup", mouseUp);
    }
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