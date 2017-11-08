import QtQuick 1.1

Item{
    id: component
    anchors.fill: parent
    z: 999
    visible: false

    function show(){
        component.visible = true;
    }
    function hide(){
        component.visible = false;
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
        Rectangle{
            id: contextMenuBox
            anchors.centerIn: blockedArea
            width: parent.width*0.8
            height: parent.height*0.75
            color: "white"
            radius: 15

        }
    }
}

