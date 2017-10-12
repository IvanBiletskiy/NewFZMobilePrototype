import QtQuick 1.1

Item  {
    id: window
    anchors.fill: parent
    visible: true
    property alias header: header
    Header{
        id: header
    }
}

