import QtQuick 1.1

Rectangle {
    id: pageCommonHeader
    width: parent.width
    height: 15
    z: 999
    color: "blue"
    border.width: 1
    property alias appInfo: appInfo.text
    property alias userInfo: userInfo.text

    Text {
        id: appInfo
        text: "FZMobile 0.0.1"
        color: "white"
        anchors.left: parent.left
        anchors.leftMargin: 2
        font.bold: true
        font.pixelSize: 12
    }
    Text {
        id: userInfo
        text: "User name"
        color: "white"
        anchors.left: appInfo.right
        anchors.leftMargin: 4
        font: appInfo.font
    }

}

