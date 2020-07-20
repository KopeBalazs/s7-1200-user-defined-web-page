
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

    $(document).ready(function () {
        $.ajaxSetup({ cache: false });

        url = 'TagResources/setDBSync.htm';
        sdata = {'"WebDBConf".WebDBElementsRead' : 1};

        $.post(url, sdata, function (result) {
            $(document).ready(function () {
                $.ajaxSetup({ cache: false });
                $.get(htmResource, function (result) {
                    afterResultFunction(result, afterResultFunctionParam);
                });
            });
        });
    });
}

function postPLCData(htmResource, operationJson) {

    url = htmResource;
    sdata = operationJson;
    $.post(url, sdata, function (result) { 
        syncLoadMem();
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