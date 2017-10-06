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
        var nextPageButton = GUI.QmlComponents.buttonComponent.createObject(this.qml, {text: ">"});
        nextPageButton.anchors.bottom = this.qml.bottom;
        nextPageButton.anchors.right = this.qml.right;
        this.addSignal("nextPageSignal")
        this.bindSignals([
            [nextPageButton.clicked, "nextPageSignal"]
        ]);
    },
    CustomMenuWindow: function(){
        GUI.Windows.DefaultListWindow.apply(this); //Окно с ListView и каким-то дефолтным делегатом
        this.menu.delegate = Qt.createComponent("CustomDelegate.qml"); //подменяем делегат
    }
};
