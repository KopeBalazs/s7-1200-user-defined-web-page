
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