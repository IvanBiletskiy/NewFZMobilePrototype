module = {
    DocumentListWindow: function(documentsList){
        //TODO: make setData() method
        var documentsNames = getDocumentsNames(documentsList);
        GUI.Windows.DefaultListWindow.call(this, documentsNames);


        this.returnButton.visible = false;
        this.addSignal("documentClicked");

        var that = this; //сохраняем контекст this.emitSignal, чтобы тот не потерялся
        var menuClickHandler = function(clickedItemIndex) {
            var chosenDocumentId = documentsList[clickedItemIndex].id;
            that.emitSignal("documentClicked", [chosenDocumentId]);
        }
        this.menu.lineClicked.connect(menuClickHandler);
        var superChangeData = this.changeData;
        this.changeData = function(documentsList){
            var documentsNames = getDocumentsNames(documentsList);
            superChangeData.call(this, documentsNames);
        }

        function getDocumentsNames(documentList){
            var documentsNames = [];
            for (var i = 0; i < documentList.length; i++) {
                var document = documentList[i];
                documentsNames.push("[" + document.id + "] - " + document.creator);
            }
            return documentsNames;
        }


    },

    DocumentWindow: function(document){
        var menuItemsNames = getLinesNames(document);

        GUI.Windows.DefaultListWindow.call(this, menuItemsNames);
        this.addSignal("lagerClicked");

        var that = this; //сохраняем контекст this.emitSignal, чтобы тот не потерялся
        var menuClickHandler = function(clickedItemIndex) {
            var chosenLagerId = document.lines[clickedItemIndex].id;
            that.emitSignal("lagerClicked", [chosenLagerId]);
        }
        this.menu.lineClicked.connect(menuClickHandler);

        function getLinesNames(document){
            var linesNames = [];
            for (var i = 0; i < document.lines.length; i++) {
                var lager = document.lines[i];
                linesNames.push("[" + lager.id + "] - " + lager.name + " (" + lager.count + ")");
            }
            return linesNames;
        }

        var superChangeData = this.changeData;
        this.changeData = function(document){
            var linesNames = getLinesNames(document);
            superChangeData.call(this, linesNames);
        }
    }
};
