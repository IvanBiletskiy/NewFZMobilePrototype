module = (function(){
    return function DefaultListWindow(menuLines){
        GUI.Windows.Window.call(this);
        var menu = GUI.QmlComponents.menuComponent.createObject(this.qml);
        menu.anchors.top = this.header.bottom;
        menu.anchors.bottom = this.returnButton.top;
        this.menu = menu;
        setData(menuLines);
        this.setData = setData;

        function setData(menuLinesArray) {
            console.log("in setData. menuLinesArray = "+JSON.stringify(menuLinesArray));
            menu.model.clear();
            for (var i = 0; i < menuLinesArray.length; i++) {
                var line = menuLinesArray[i];
                menu.model.append({
                    lineName: line
                })
            }
        }
    }


})()
