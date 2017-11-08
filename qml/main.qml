import QtQuick 1.1
import "../js/main.js" as JS

Rectangle {
    id: canvas
    width: 220
    height: 360

    Component.onCompleted: {
        JS.start();
    }
}

