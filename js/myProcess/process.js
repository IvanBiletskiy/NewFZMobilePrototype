module = (function(){
    console.log("in process");
    var model = require("myProcess/model");
    windowManager.setProcess("myProcess");

    function showFirstWindow(){
        var window = windowManager.getFirstWindow();
        window.connect([
            ["returnSignal", returnSlot1],
            ["returnSignal", returnSlot2],
            ["nextPageSignal", showSecondWindow]
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
            ["returnSignal", showFirstWindow],
        ])
    }


    return {
        start: function(){
            // showDocumentListWindow();
            showFirstWindow();
        }
    }
})();
