function getIdFromPLC(htmResource, afterResultFunction, afterResultFunctionParam){

    $(document).ready(function(){
        $.ajaxSetup({ cache: false });
        $.get(htmResource, function(result){
            afterResultFunction(result, afterResultFunctionParam);
        });
    });

}