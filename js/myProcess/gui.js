module = {
    FirstWindow: function(){
        console.log("in FirstWindow constructor");
        GUI.Windows.Window.apply(this);
        var forwardButton = GUI.QmlComponents.buttonComponent.createObject(this.qml, {text: ">"});
        forwardButton.anchors.centerIn = this.qml;
        this.addSignal("nextPageSignal")
        this.bindSignals([
            [forwardButton.clicked, "nextPageSignal"]
        ]);
    },
    SecondWindow: function(){
        GUI.Windows.Window.apply(this);
        var textLabel = GUI.QmlComponents.textComponent.createObject(this.qml, {text: "Hello World!", color: "red"});
        textLabel.anchors.centerIn = this.qml;
        this.textLabel = textLabel;
    },
    MenuWindow: function(){
        GUI.Windows.DefaultListWindow.apply(this);
        this.menu.model.append({lineName: "line 4"});
        var nextPageButton = GUI.QmlComponents.buttonComponent.createObject(this.qml, {text: ">"});
        nextPageButton.anchors.bottom = this.qml.bottom;
        nextPageButton.anchors.right = this.qml.right;
        this.addSignal("nextPageSignal")
        this.bindSignals([
            [nextPageButton.clicked, "nextPageSignal"]
        ]);
    },
    CustomMenuWindow: function(){
        GUI.Windows.DefaultListWindow.apply(this);
        this.menu.delegate = GUI.QmlComponents.customDelegateComponent;
    }
};
