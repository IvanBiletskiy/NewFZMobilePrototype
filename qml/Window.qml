import QtQuick 1.1

Item  {
    id: window
    anchors.fill: parent
    visible: true
    property alias header: header
    property alias errorBox: errorBox
    Header{
        id: header
    }
    MessageBox{
        id: errorBox
        onClicked: {
            console.log("Message box clicked");
        }
        visible: true
    }
}

