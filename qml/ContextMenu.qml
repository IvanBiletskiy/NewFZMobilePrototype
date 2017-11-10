import QtQuick 1.1

Item{
    id: component
    anchors.fill: parent
    z: 999
    visible: false
    signal lineClicked(int lineNumber)

    function show(){
        visible = true;
    }
    function hide(){
        visible = false;
    }


    Rectangle{
        id: darkArea
        anchors.fill: parent
        color: "black"
        opacity: 0.5
        visible: true
    }

    MouseArea{
        id: blockedArea
        anchors.fill: parent

        Rectangle {
            id: contextMenu
            property alias model: menuModel
            property alias delegate: menuView.delegate
            width: parent.width*0.75
            height: parent.height*0.5
            anchors.centerIn: parent
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
                    height: text.height + 10
                    border.width: 1
                    Text {
                        id: text
                        text: lineName
                        anchors.horizontalCenter: parent.horizontalCenter
                        anchors.verticalCenter: parent.verticalCenter
                    }
                    MouseArea {
                        id: mouseArray
                        anchors.fill: parent
                        onClicked: {
                            lineClicked(index);
                        }
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
    }

}

