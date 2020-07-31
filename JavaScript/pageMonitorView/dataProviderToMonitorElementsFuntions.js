function dataProviderToMonitorElements() {
    var actElementId;
    var data;
    var htmRes;
    var minus;

    for (var actIndex = 1; actIndex <= sizeOfElementsArray; actIndex++) {
        if (adapterJSON.elements[actIndex - 1].elementId != 0) {
            actElementId = adapterJSON.elements[actIndex - 1].elementId;
            if (adapterJSON.elements[actIndex - 1].elementType == 'timeDiagram') {
                
                data = adapterJSON.elements[actIndex - 1].data;

                if (data <= 10) {
                    htmRes = 'TagResources/programPlcDataInt.htm';
                    minus = 1;
                }
                else {
                    htmRes = 'TagResources/programPlcDataReal.htm';
                    minus = 11;
                }

                console.log("SetIntervalTime " + adapterJSON.elements[actIndex - 1].dataSampleTime * 100);
                setInterval(getPlcData, adapterJSON.elements[actIndex - 1].dataSampleTime * 100, htmRes, addPlcDataTimeDiag, { 'paramJson': { 'actElementId': actElementId, 'data': data, 'minus': minus } });
                console.log("setInterval added");
            }
            if (adapterJSON.elements[actIndex - 1].elementType == 'textBoxOut') {
                data = adapterJSON.elements[actIndex - 1].data;

                if (data <= 10) {
                    htmRes = 'TagResources/programPlcDataInt.htm';
                    minus = 1;
                }
                else if (data > 10 && data <= 20) {
                    htmRes = 'TagResources/programPlcDataReal.htm';
                    minus = 11;
                }
                else if (data > 20 && data <= 30) {
                    htmRes = 'TagResources/programPlcDataBool.htm';
                    minus = 21;
                }
                else if (data > 30 && data <= 40) {
                    htmRes = 'TagResources/programPlcDataString.htm';
                    minus = 31;
                }
                console.log(htmRes);
                setInterval(getPlcData, adapterJSON.elements[actIndex - 1].dataSampleTime * 100, htmRes, addPlcDataTextBoxOut, { 'paramJson': { 'actElementId': actElementId, 'data': data, 'minus': minus } });
                console.log("setInterval added");
            }
            if (adapterJSON.elements[actIndex - 1].elementType == 'alertLight') {
                data = adapterJSON.elements[actIndex - 1].data;

                htmRes = 'TagResources/programPlcDataBool.htm';
                minus = 21;

                console.log(htmRes);
                setInterval(getPlcData, adapterJSON.elements[actIndex - 1].dataSampleTime * 100, htmRes, addPlcDataAlertLight, { 'paramJson': { 'actElementId': actElementId, 'data': data, 'minus': minus } });
                console.log("setInterval added");
            }
            if (adapterJSON.elements[actIndex - 1].elementType == 'plainText') {

                var plainText = document.getElementById('plainText_' + actElementId);

                plainText.value = adapterJSON.elements[actIndex - 1].elementName;
            }
        }

    }
}

function addPlcDataTimeDiag(resultJsonString, paramJson) {

    var resultJson = resultStringToJson(resultJsonString);
    console.log(resultJson);
    console.log(paramJson.paramJson.data);
    var data = resultJson.vars[paramJson.paramJson.data - paramJson.paramJson.minus].value;
    console.log("Data: " + data);
    var actChart;
    for (var i = 0; i < charts.length; i++) {
        console.log("In for chart id: " + charts[i].id);
        console.log("In for param id: " + paramJson.paramJson.actElementId);
        if (charts[i].id == paramJson.paramJson.actElementId) {
            actChart = charts[i].chart;
        }
    }
    console.log("For ended");
    console.log(actChart);
    var datasetLength = actChart.config.data.datasets[0].data.length;
    actChart.config.data.labels[datasetLength] = '';
    actChart.config.data.datasets[0].data[datasetLength] = data;
    if (datasetLength > 100) {
        actChart.config.data.labels.shift();
        actChart.config.data.datasets[0].data.shift();
    }
    actChart.update();

}

function addPlcDataTextBoxOut(resultJsonString, paramJson) {
    console.log(resultJsonString);
    var resultJson = resultStringToJson(resultJsonString);
    console.log(resultJson);
    console.log(paramJson.paramJson.data);
    var data = resultJson.vars[paramJson.paramJson.data - paramJson.paramJson.minus].value;
    console.log("Data: " + data);
    var actTextBoxOut = document.getElementById("textBoxOut_" + paramJson.paramJson.actElementId);

    actTextBoxOut.value = data;
}

function addPlcDataAlertLight(resultJsonString, paramJson) {
    var resultJson = resultStringToJson(resultJsonString);
    var data = resultJson.vars[paramJson.paramJson.data - paramJson.paramJson.minus].value;
    var actImg = document.getElementById("alertLight_" + paramJson.paramJson.actElementId);
    console.log(data);

    if (data) {
        actImg.src = "Images/redLight-icn.png";
    }
    else {
        actImg.src = "Images/greenLight-icn.png";
    }
}

function setPlcProgramData(dataTag, value) {
    var json = {};
    json[dataTag] = value;
    console.log(json);
    postPLCData('TagResources/programPlcDataWrite.htm', json, null);
}

function resultStringToJson(resultJsonString) {
    resultJsonString = resultJsonString.replace(/,([^,]*)$/, '$1');
    return JSON.parse(resultJsonString);
}