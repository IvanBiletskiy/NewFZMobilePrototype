module = function(model, windowManager, thisProcess){

    function showDocumentListWindow(){
        var documentList = model.getDocumentList();
        var window = windowManager.getDocumentListWindow(documentList);
        window.connect([
            ["documentClicked", documentClickedHandler],
            ["returnSignal", exit]
        ])

        function documentClickedHandler(documentId){
            showDocumentWindow(documentId);
        }
    }

    function showDocumentWindow(documentId) {
        var document = model.getDocument(documentId);
        var window = windowManager.getDocumentWindow(document);
        window.connect([
            ["returnSignal", showDocumentListWindow],
            ["lagerClicked", lagerClickedHandler]
        ])

        function lagerClickedHandler(lagerId){
            console.log("CLICKED Lager "+lagerId);
            window.showError("Lager "+lagerId+" info not found");
        }

    }

    function exit(){
        thisProcess.exit("exit info");
    }


    return {
        start: function(){
            showDocumentListWindow();
        }
    }
}