module = (function(){
    console.log("in process");
    var model = require("myProcess/model");
    windowManager.setProcess("myProcess");

    function showDocumentListWindow(){
        var window = windowManager.get();
        function showNextPage(){
            var documentList = model.getDocumentList();
            var nextPageMenuLines = [];

            showMenuWindow(nextPageMenuLines);
        }
    }

    function showSecondWindow(){
        var window = windowManager.getSecondWindow();
        window.connect([
                           ["returnSignal", showFirstWindow]
                       ])
    }

    function showMenuWindow(menuLines){
        var window = windowManager.getMenuWindow();
        window.connect([
                           ["returnSignal", showFirstWindow],
                           ["nextPageSignal", showCustomMenuPage]
                       ])
    }

    function showCustomMenuPage(){
        try{
            var window = windowManager.getCustomMenuWindow();
            window.connect([
                               ["returnSignal", showMenuWindow]
                           ]);
        }
        catch(err){
            showObject(err, "err");
            console.log(err.stack);
        }
    }


    return {
        start: function(){
            // showDocumentListWindow();
            showFirstWindow();
        }
    }
})();
