function getIdFromPLC(monitorElementType){

    $(document).ready(function(){
        $.ajaxSetup({ cache: false });
        $.get("TagResources/ID.htm", function(result){
            return result;
        });
    });

}