import QtQuick 1.1

Rectangle {
    id: button
    signal clicked
    property alias text: text.text
    border.color: "black"
    border.width: 1
    radius: 5
    height: 40
    width: 80

    Text {
        id: text
        color: "#000000"
        text: "button"
        horizontalAlignment: Text.AlignHCenter
        verticalAlignment: Text.AlignVCenter
        font.pointSize: 14
        anchors.centerIn: parent
    }

     MouseArea {
         id: mouseArea;
         anchors.fill: parent;
         onClicked: button.clicked()
     }
}

