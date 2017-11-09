var GUI = {
    QmlComponents: {
        windowComponent: Qt.createComponent("Window.qml"),
        buttonComponent: Qt.createComponent("Button.qml"),
        textBoxComponent: Qt.createComponent("TextBox.qml"),
        menuComponent: Qt.createComponent("Menu.qml"),
        lineComponent: Qt.createComponent("Line.qml")
    },
    Windows: {
        Window: require("DefaultWindows/window"),
        DefaultListWindow: require("DefaultWindows/listWindow"),
        DefaultListWithTitleWindow: require("DefaultWindows/listWithTitleWindow")
    }
}

