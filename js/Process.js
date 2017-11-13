function Process(parent, processName, exitCallback){
    var model = require(processName + "/model")
    var createProcessFunc = require(processName + "/process");
    var windowManager = new WindowManager(processName);
    var process = createProcessFunc(model, windowManager, this);
}