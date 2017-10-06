module = (function(){
    console.log("in process");
    var model = require("myProcess/model");
    windowManager.setProcess("myProcess");

    function showFirstWindow(){
        var window = windowManager.getFirstWindow();
        window.connect([
                           ["returnSignal", returnSlot1],
                           ["returnSignal", returnSlot2],
                           ["nextPageSignal", showMenuWindow]
                       ]);
        function returnSlot1(){
            console.log("returnSlot1");
        };
        function returnSlot2(){
            console.log("returnSlot2");
        }
    }

    function showSecondWindow(){
        var window = windowManager.getSecondWindow();
        window.connect([
                           ["returnSignal", showFirstWindow]
                       ])
    }

    function showMenuWindow(){
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
