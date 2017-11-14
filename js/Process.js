function Process(parent, processName, exitCallback){
    console.log("creating new process "+processName+"!!!");
    var model = require(processName + "/model");
    var windowManager = new WindowManager(processName);
    var lastParentWindow;

    var getOwnProcessProperties = require(processName + "/process");
    var ownProcessProperties = getOwnProcessProperties(model, windowManager, this);
    this.start = function(){
        ownProcessProperties.start();
        if (parent) {
            lastParentWindow = parent.windowManager.getCurrentWindow();
            lastParentWindow.hide();
        }
    }
    this.exit = function(exitData){
        exitCallback(exitData);
    }
    this.windowManager = windowManager;
    this.model = model;
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
}
