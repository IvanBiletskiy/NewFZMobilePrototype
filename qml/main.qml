import QtQuick 1.1
import "../js/main.js" as JS

Rectangle {
    id: canvas
    width: 360
    height: 360

    Component.onCompleted: {
        JS.start();
//        JS.showObject(myModel,"myModel",3);
    }
//    VisualItemModel {
//        id: myModel
//    }
}

