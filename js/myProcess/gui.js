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
    }
};
