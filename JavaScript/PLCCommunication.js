
function getElements(nextFunction) {
    getElementsConfigFromPlc("TagResources/elements.htm", getElementsCont, null);

    function getElementsCont(result, notUsed) {
        var stringAdapterJSON = result;
        console.log(stringAdapterJSON);
        adapterJSON = JSON.parse(stringAdapterJSON);
        nextFunction();
    }
}

function getElementsConfigFromPlc(htmResource, afterResultFunction, afterResultFunctionParam) {
    plcComInProcess = true;
    $(document).ready(function () {
        $.ajaxSetup({ cache: false });

        url = 'TagResources/setDBSync.htm';
        sdata = {'"WebDBConf".WebDBElementsRead' : 1};

        $.post(url, sdata, function (result) {
            $(document).ready(function () {
                $.ajaxSetup({ cache: false });
                $.get(htmResource, function (result) {
                    plcComInProcess = false;
                    afterResultFunction(result, afterResultFunctionParam);
                });
            });
        });
    });
}

function getPlcData(htmResource, afterResultFunction, afterResultFunctionParam){
    console.log('get PLC data');
    $(document).ready(function () {
        $.ajaxSetup({ cache: false });
        $.get(htmResource, function (result) {
            plcComInProcess = false;
            console.log('get PLC data ended');
            afterResultFunction(result, afterResultFunctionParam);
            console.log(result);
        });
    });
}

function postPLCData(htmResource, postJson, afterPostFunction) {

    plcComInProcess = true;

    url = htmResource;
    sdata = postJson;
    $.post(url, sdata, function (result) { 
        syncLoadMem();
        plcComInProcess = false;
        afterPostFunction();
    });
}

function syncLoadMem() {
    $(document).ready(function () {
        $.ajaxSetup({ cache: false });

        url = 'TagResources/setDBSync.htm';
        sdata = {'"WebDBConf".WebDBElementsWrite' : 1};
        $.post(url, sdata, function (result) { });
    });
}