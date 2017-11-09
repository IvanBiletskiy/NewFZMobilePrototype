module = (function(){
    return function DefaultListWithTitleWindow(menuLines, titleText){
        GUI.Windows.DefaultListWindow.call(this, menuLines);
        var title = GUI.QmlComponents.textBoxComponent.createObject(this.qml);
        title.isFullWidth = true;
        title.text = titleText;
        title.anchors.top = this.header.bottom;
        title.anchors.horizontalCenter = this.qml.horizontalCenter;
        title.color = "blue";
        title.font.bold = true;
        title.z = this.header.z;
        this.title = title;        
        var titleLine = GUI.QmlComponents.lineComponent.createObject(this.qml);
        titleLine.anchors.top = title.bottom;
        this.titleLine = titleLine;
        this.menu.anchors.top = this.titleLine.bottom;

        var superChangeData = this.changeData;
        this.changeData = function(menuLinesNames, titleText){
            superChangeData(menuLinesNames);
            this.title.text = titleText;
        }
    }
})()
