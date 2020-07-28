function dataProviderToMonitorElements() {
    var actElement;
    var actElementId;
    var data;

    for (var actIndex = 1; actIndex <= sizeOfElementsArray; actIndex++) {
        if (adapterJSON.elements[actIndex - 1].elementType == 'timeDiagram') {
            actElementId = adapterJSON.elements[actIndex - 1].elementId;
            actElement = document.getElementById(actElementId);
            data = adapterJSON.elements[actIndex - 1].data;
            console.log("SetIntervalTime " + adapterJSON.elements[actIndex - 1].dataSampleTime * 100);
            setInterval(getPlcData, adapterJSON.elements[actIndex - 1].dataSampleTime * 100, 'TagResources/programPlcDataInt.htm', addPlcData, {'paramJson':{'actElementId': actElementId, 'data': data}});
            console.log("setInterval added");
        }
    }
}

function addPlcData(resultJsonString, paramJson){

    var resultJson = resultStringToJson(resultJsonString);
    console.log(resultJson);
    console.log(paramJson.paramJson.data);
    var data = resultJson.vars[paramJson.paramJson.data-1].value;
    console.log("Data: "+ data);
    var actChart;
    for(var i = 0; i < charts.length; i++){
        console.log("In for chart id: " + charts[i].id);
        console.log("In for param id: " + paramJson.paramJson.actElementId);
        if(charts[i].id == paramJson.paramJson.actElementId){
            actChart = charts[i].chart;
        }
    }
    console.log("For ended");
    console.log(actChart);
    var datasetLength = actChart.config.data.datasets[0].data.length;
    actChart.config.data.labels[datasetLength] = '';
    actChart.config.data.datasets[0].data[datasetLength] = data;
    if(datasetLength > 100){
        actChart.config.data.labels.shift();
        actChart.config.data.datasets[0].data.shift();
    }
    actChart.update();

}

function resultStringToJson(resultJsonString){
    resultJsonString = resultJsonString.replace(/,([^,]*)$/, '$1');
    return JSON.parse(resultJsonString);
}