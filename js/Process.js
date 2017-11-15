function Process(parent, processName, exitCallback, inputData){
    console.log("creating new process "+processName+"!!!");
    var model = require(processName + "/model");
    var windowManager = new WindowManager(processName);
    var lastParentWindow;

    var getOwnProcessProperties = require(processName + "/process");
    var ownProcessProperties = getOwnProcessProperties(model, windowManager, this);
    this.start = function(){
        ownProcessProperties.start();
        if (parent) { 
            parent.windowManager.getCurrentWindow().hide();
        }
    }
    this.exit = function(exitData){
        exitCallback(exitData);
    }
    this.windowManager = windowManager;
    this.model = model;
    this.inputData = inputData;
    this.destroy = function(){
        windowManager.destroyAllWindows();
    }

    this.runChildProcess = function(processName, exitCallback){
        var childProcess = new Process(this, processName, exitHandler);
        childProcess.start();
        function exitHandler(){
            childProcess.destroy();
            exitCallback.apply(null, arguments);
            childProcess = null;
        }
    }

    this.setDefaultProcessContextMenuItem = function(itemString, windowSignalName, signalSlot){

    }

    if(parent.defaultProcessContextMenuItems) {
        this.defaultProcessContextMenuItems = [];
        for (var i = 0; i < parent.defaultProcessContextMenuItems.length; i++) {
            this.defaultProcessContextMenuItems.push(parent.defaultProcessContextMenuItems[i]);
        }
    }
}
