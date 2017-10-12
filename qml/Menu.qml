import QtQuick 1.1

Rectangle {
    id: menu
    property alias model: menuModel
    property alias delegate: menuView.delegate
    anchors.left: parent.left
    anchors.right: parent.right
    border.width: 1

    ListModel{
        id: menuModel
    }

    Component {
        id: defaultDelegate
        Rectangle {
            id: wrapper
            anchors.right: parent.right
            anchors.left:parent.left
            height: text.height
            border.width: 1
            Text {
                id: text
                text: lineName
                anchors.horizontalCenter: parent.horizontalCenter
            }
        }
    }

    ListView{
        id: menuView
        anchors.fill: parent
        model: menuModel
        delegate: defaultDelegate
    }
}

