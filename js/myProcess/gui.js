module = {
    DocumentListWindow: function(documentList){
        var linesNamesArray = [];
        for (var i = 0; i < documentList.length; i++) {
            var document = documentList[i];
            linesNamesArray.push("[" + document.id + "] - " + document.creator);
        }
        GUI.Windows.DefaultListWindow.call(this, linesNamesArray);
        var menu = this.menu;
        this.addSignal("documentClicked");
        this.bindSignals([
            [menu.lineClicked, "documentClicked", menu]
        ]);
    }
};
