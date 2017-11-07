module = {
    DocumentListWindow: function(documentList){
        var documentsNames = getDocumentNames(documentList);

        // var parentSetData = this.setData;
        // this.setData = function(documentListData){
        //     for (var i = 0; i < documentList.length; i++) {
        //         var document = documentList[i];
        //         documentsNames.push("[" + document.id + "] - " + document.creator);
        //     }
        //     parentSetData()
        // }

        //TODO: make setData() method
        GUI.Windows.DefaultListWindow.call(this, documentsNames);
        this.returnButton.visible = false;
        this.addSignal("documentClicked");
        // this.bindSignals([
        //     [menu.lineClicked, "documentClicked"]
        // ]);
        var that = this; //сохраняем контекст this.emitSignal, чтобы тот не потерялся
        var menuClickHandler = function(clickedItemIndex) {
            var chosenDocumentId = documentList[clickedItemIndex].id;
            that.emitSignal("documentClicked", [chosenDocumentId]);
        }
        this.menu.lineClicked.connect(menuClickHandler);

        function getDocumentNames(documentList){
            var documentsNames = [];
            for (var i = 0; i < documentList.length; i++) {
                var document = documentList[i];
                documentsNames.push("[" + document.id + "] - " + document.creator);
            }
            return documentsNames;
        }

        // function setData()
    },

    DocumentWindow: function(document){
        var lines = document.lines;
        var menuItemsNames = [];
        for (var i = 0; i < lines.length; i++) {
            var lager = lines[i];
            menuItemsNames.push(
                "[" + lager.id + "] - " + lager.name + " (" + lager.count + ")"
            );
        }
        GUI.Windows.DefaultListWindow.call(this, menuItemsNames);
        this.addSignal("lagerClicked");

        var that = this; //сохраняем контекст this.emitSignal, чтобы тот не потерялся
        var menuClickHandler = function(clickedItemIndex) {
            var chosenLagerId = lines[clickedItemIndex].id;
            that.emitSignal("lagerClicked", [chosenLagerId]);
        }
        this.menu.lineClicked.connect(menuClickHandler);
    }
};
