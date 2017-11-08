import QtQuick 1.1

Item  {
    id: window
    anchors.fill: parent
    visible: true
    property alias header: header
    property alias errorBox: errorBox
    property alias contextMenu: contextMenu
    property alias returnButton: returnButton
    signal returnClicked
    Header{
        id: header
    }
    MessageBox{
        id: errorBox
        visible: false
    }

    ContextMenu{
        id: contextMenu
        visible: false
    }

    Button {
        id: returnButton
        anchors.bottom: parent.bottom
        anchors.left: parent.left
        text: "<"
        onClicked: {}
        property bool lastVisible: visible
        property int lastZ: z
        Component.onCompleted: {
            clicked.connect(emitReturnSignal());
        }
        function emitReturnSignal(){
            if(!contextMenu.visible){
                returnClicked();
            }
        }
        function contextMenuModeSlot(){
            contextMenu.hide();
            contextMenuButton.visible = true;
            visible = lastVisible;
            z = lastZ;
            clicked.disconnect(contextMenuModeSlot);
            clicked.connect(emitReturnSignal);
        }
    }

    Button {
        id: contextMenuButton
        anchors.bottom: parent.bottom
        anchors.right: parent.right
        text: "Menu"
        onClicked:{
            contextMenuButton.visible = false;
            returnButton.lastVisible = returnButton.visible;
            returnButton.visible = true;
            returnButton.lastZ = returnButton.z;
            returnButton.z = contextMenu.z+1;
            contextMenu.show();
            returnButton.clicked.disconnect(returnButton.emitReturnSignal);
            returnButton.clicked.connect(returnButton.contextMenuModeSlot);
        }
    }

    onReturnClicked: {
        console.log("OLOLOOLOLOOLOLOLO")
    }

}

