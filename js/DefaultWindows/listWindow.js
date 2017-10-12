module = (function(){
    return function DefaultListWindow(){
        GUI.Windows.Window.call(this);
        var menu = GUI.QmlComponents.menuComponent.createObject(this.qml);
        menu.anchors.top = this.header.bottom;
        menu.anchors.bottom = this.returnButton.top;
        menu.model.append({lineName: "line 1"});
        menu.model.append({lineName: "line 2"});
        menu.model.append({lineName: "line 3"});
        this.menu = menu;
    }
})()
