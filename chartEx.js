
Chart.defaults.global.defaultFontFamily = 'Lato';
Chart.defaults.global.defaultFontSize = 10;
Chart.defaults.global.defaultFontColor = 'black';

var canvasChart= document.createElement("canvas");

var tempDiv= document.createElement("div");

let chartContext = canvasChart.getContext('2d');

tempDiv.appendChild(canvasChart);
tempDiv.style.width= "100%";
tempDiv.style.height= "100%";

var myLineChart = new Chart(chartContext, {
  type: 'line',
  data: {
    labels: [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050],
    datasets: [{ 
        data: [86,114,106,106,107,111,133,221,783,2478],
        label: "Africa",
        borderColor: "#3e95cd",
        fill: false
      }
    ]
  },
  options:{
    title:{
      display:true,
      text:'Time Diagram name',
      fontSize: 12
    }
  }
});

  var body = document.getElementsByTagName("BODY")[0];
  body.appendChild(tempDiv);