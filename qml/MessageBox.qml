import QtQuick 1.0

Item{
    id: component
    anchors.fill: parent
    z: 9999
    visible: false

    function show(text){
        messageText.text = text;
        component.visible = true;
    }
    function hide(){
        component.visible = false;
    }

    signal clicked

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
        Rectangle{
            id: messageBox
            anchors.centerIn: blockedArea
            width: parent.width*0.75
            height: parent.height*0.5
            color: "white"
            radius: 15
            MouseArea{
                id: messageBoxMouseArea
                anchors.fill: parent
                onClicked: {
                    component.clicked();
                    hide();
                }
            }
            Text {
                id: messageText
                text: qsTr("ERROR!")
                color: "red"
                anchors.centerIn: parent
            }

        }
    }
}
