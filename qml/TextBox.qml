import QtQuick 1.1

Item {
    id: component
    width: textString.width
    height: textString.height
    property alias text: textString.text
    property alias color: textString.color
    property alias boxColor: box.color
    property alias font: textString.font
    property bool isFullWidth: false

    Rectangle {
        id: box
        anchors.fill: parent
        border.width: 1
    }

    Text{
        id: textString
        anchors.centerIn: box
    }
    onIsFullWidthChanged: {
        if(isFullWidth){
            anchors.left = parent.left;
            anchors.right = parent.right;
        }
        else {
            width = textString.width;
            height = textString.height;
        }
    }
}

