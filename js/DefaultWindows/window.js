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
 /**
  * 
  * @param {string} signalName - имя сигнала страницы
  * @param {Array} params - массив параметров сигнала 
  */
    function emitSignal(signalName, params) {
        console.log("  emitting signal ["+signalName+"] with params = "+JSON.stringify(params));
        // showObject(signals, "signals", 3);
        for (var i = 0; i < signals.length; i++) {
            var currentSignal = signals[i];
            if (currentSignal.name === signalName) {
                var slots = currentSignal.slots;
                for (var slotIndex = 0; slotIndex < slots.length; slotIndex++) {
                    slots[slotIndex].apply(null, params);
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
     *      [qmlObject.signal, "windowSignalName", windowSignalOwnParamsArray],
     *      [button15.clicked, "someButtonClicked", [15]]
     *      ...
     * ]
     * 
     * windowSignalOwnParamsArray - массив собственны параметров сигнала окна.
     * Список аргументов внешнего сигнала окна формируется по принципу [собственные параметры, параметры QML-сигнала] 
     */
        //TODO. REMAKE FOR PARAMETRIZED QML SIGNALS
     function bindSignals(signalConnections){
        for (var i = 0; i < signalConnections.length; i++) {
            var signalConnection = signalConnections[i],
                qmlSignal = signalConnection[0],
                windowSignalName = signalConnection[1],
                windowSignalOwnParamsArray = signalConnection[2] || [];
            qmlSignal.connect(function(){
                var qmlSignalParams = [].slice.call(arguments); //получаем список параметров qml-сигнала в виде массива
                var windowSignalParams = windowSignalOwnParamsArray.concat(qmlSignalParams);
                emitSignal(windowSignalName, windowSignalParams);
            })
        }
    }

    function inheritSuperChangeData(newChangeData){
        if(typeof this.changeData === "function"){
            var superChangeData = this.changeData; 
            this.changeData = function(data){
                superChangeData(data);
                newChangeData(data);
            }           
        }
        else {
            this.changeData=newChangeData;
        }

    }

    function showError(errorMessage) {
        this.qml.errorBox.show(errorMessage);
    }
    function hideError(errorMessage) {
        this.qml.errorBox.hide();
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
        window.visible = false;
    }
    this.connect = connect;
    this.addSignal = addSignal;
    this.bindSignals = bindSignals;
    this.emitSignal = emitSignal;
    this.clearSignals = clearSignals;  
    this.signals = signals;  
    this.showError = showError;
    this.hideError = hideError;
    this.inheritSuperSetData = inheritSuperChangeData;
}
