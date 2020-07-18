
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
        $.get(htmResource, function (result) {
            afterResultFunction(result, afterResultFunctionParam);
        });
    });

}

function postPLCData(htmResource, operation) {
    $(document).ready(function () {
        $.ajaxSetup({ cache: false });

        url = htmResource;
        name = operation;
        sdata = escape(name);
        $.post(url, sdata, function (result) { });
    });
}