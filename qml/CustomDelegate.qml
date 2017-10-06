import QtQuick 1.1

    Rectangle {
        id: wrapper
        anchors.right: parent.right
        anchors.left:parent.left
        height: text.height
        border.width: 1
        color: "green"
        Text {
            id: text
            text: lineName
            anchors.horizontalCenter: parent.horizontalCenter
        }
    }


