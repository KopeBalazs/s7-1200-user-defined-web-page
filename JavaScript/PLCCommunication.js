
function getElements(nextFunction) {
    getPLCData("TagResources/elements.htm", getElementsCont, null);

    function getElementsCont(result, notUsed) {
        var stringAdapterJSON = result;
        console.log(stringAdapterJSON);
        adapterJSON = JSON.parse(stringAdapterJSON);
        nextFunction();
    }
}

function getPLCData(htmResource, afterResultFunction, afterResultFunctionParam) {
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

function postPLCData(htmResource, operationJson, afterPostFunction) {

    plcComInProcess = true;

    url = htmResource;
    sdata = operationJson;
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