module = function Window(){
    var signals = [];
    function addSignal(signalName) {
        signals.push({
            name: signalName,
            slots: []
        });
    }

    function clearSignals(){
        for (var signalIndex = 0; signalIndex < signals.length; signalIndex++) {
            var signal = signals[signalIndex];
            signal.slots = []
        }
    }

    function emitSignal(signalName, param) {
        // console.log("  emitting signal ["+signalName+"]");
        for (var i = 0; i < signals.length; i++) {
            var currentSignal = signals[i];
            if (currentSignal.name === signalName) {
                var slots = currentSignal.slots;
                for (var slotIndex = 0; slotIndex < slots.length; slotIndex++) {
                    slots[slotIndex](param);
                }
            }
        }
    }

    var connect = function(connections) {
        for (var i = 0; i < connections.length; i++) {
            var connection = connections[i],
                signalName = connection[0],
                slot = connection[1];
            for (var signalIndex in signals) {
                var signal = signals[signalIndex];
                if(signal.name === signalName) {
                    signal.slots.push(slot);
                }
            }
        }
    };

    /**
     * Связывает сигналы элементов QML с сигналами окна
     * @param {Array} signalConnections - пары сигналов вида
     * [
     *      [qmlObject.signal, "windowSignalName", windowSignalParam{}],
     *      [button15.clicked, "someButtonClicked", {buttonId: 15}],
     *      ...
     * ]
     */
        //TODO. REMAKE FOR PARAMETRIZED QML SIGNALS
     function bindSignals(signalConnections){
        for (var i = 0; i < signalConnections.length; i++) {
            var signalConnection = signalConnections[i],
                qmlSignal = signalConnection[0],
                windowSignalName = signalConnection[1],
                windowSignalParam = signalConnection[2];
            qmlSignal.connect(function(){
                emitSignal(windowSignalName, windowSignalParam);
            })
        }
    }

    function showError(errorMessage) {
        this.errorBox.show(errorMessage);
    }
    function hideError(errorMessage) {
        this.errorBox.hide();
    }

    clearSignals();
    var window = GUI.QmlComponents.windowComponent.createObject(canvas);
    var returnButton = GUI.QmlComponents.buttonComponent.createObject(window, {text: "<"});
    returnButton.anchors.left = window.left;
    returnButton.anchors.bottom = window.bottom;
    addSignal("returnSignal");
    bindSignals([
        [returnButton.clicked, "returnSignal"]
    ]);

    var header = window.header;
    header.appInfo = global.appInfo;
    header.userInfo = global.userInfo;

    
    //object interface
    this.qml = window;
    this.header = header;
    this.returnButton = returnButton;
    this.show = function(){
        console.log("window showed");
        window.visible = true;
    }
    this.hide = function(){
        console.log("window hided");
        window.visible = false;
    }
    this.connect = connect;
    this.addSignal = addSignal;
    this.bindSignals = bindSignals;
    this.clearSignals = clearSignals;  
    this.signals = signals;  
    this.showError = showError;
    this.hideError = hideError;
}
