# Additional import path used to resolve QML modules in Creator's code model
QML_IMPORT_PATH =

# The .cpp file which was generated for your project. Feel free to hack it.
SOURCES += main.cpp



# Installation path
# target.path =

# Please do not modify the following two lines. Required for deployment.
include(qtquick1applicationviewer/qtquick1applicationviewer.pri)

# Default rules for deployment.
include(deployment.pri)


DISTFILES += \
    js/myProcess/gui.js \
    js/myProcess/model.js \
    js/myProcess/process.js \
    js/main.js \
    qml/Button.qml \
    qml/main.qml \
    qml/Window.qml \
    js/windowManager.js \
    qml/Text.qml \
    js/DefaultWindows/listWindow.js \
    js/DefaultWindows/window.js \
    js/gui.js \
    qml/Menu.qml \
    qml/CustomDelegate.qml \
    qml/Line.qml \
    qml/Header.qml
