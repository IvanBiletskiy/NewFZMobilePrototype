var windowManager = (function (){
    var managerInterface;
    var processGui;
    var windowsCache = {};
    var currentWindow; //текущее отображаемое 
    
    function setProcess(processName){
        var processGuiFilePath = "./"+processName+"/gui"
        processGui = require(processGuiFilePath);
        windowManager = createInterface();
    }

    function addToCache(window, windowName){
        windowsCache[windowName] = window;
    }

    function deleteFromCache(windowName){
        delete windowsCache[windowName];
    }

    function getWindowByConstructorName(constructorName){
        console.log("in getWindowByConstructorName("+constructorName+")");
        for (var savedWindowName in windowsCache) {
            if (windowsCache.hasOwnProperty(savedWindowName)) {
                if (constructorName === savedWindowName){
                    console.log("this page was cached");
                    var window = windowsCache[constructorName];
                    if (currentWindow) {
                        currentWindow.hide();
                    }
                    currentWindow = window;
                    window.clearSignals();
                    window.show();
                    return window;
                }
            }
        }
        //if window not in cache - create new window
        return createNewWindow(constructorName);
    }

    function createNewWindow(constructorName){
        console.log("creating new page "+constructorName);
        if (currentWindow) {
            currentWindow.hide();
        }
        currentWindow = new processGui[constructorName]();
        addToCache(currentWindow, constructorName);
        console.log("after addToCache, cache:");
        consoleLogCache();

        return currentWindow;
    }

    function consoleLogCache(){
        for (var key in windowsCache) {
            if (windowsCache.hasOwnProperty(key)) {
                console.log("    - " +key);
            }
        }
    }

    function createInterface(){
        managerInterface = getDefaultInterface();
        for (var constructorName in processGui) {
            if (processGui.hasOwnProperty(constructorName)) {
                var windowGetterName = "get"+constructorName;
                managerInterface[windowGetterName] = createWindowGetter(constructorName);       
            }
        }
        return managerInterface;
    }

    function createWindowGetter(constructorName){
        return function(){
            return getWindowByConstructorName(constructorName);
        }
    }

    function getDefaultInterface(){
        return {
            setProcess: setProcess
        };
    }

    return getDefaultInterface();
})()
