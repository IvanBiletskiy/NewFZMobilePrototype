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

    function getWindowByConstructorName(constructorName, params){
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
                    console.log("... changing window data ...")
                    window.changeData.apply(window, params);
                    window.show();
                    return window;
                }
            }
        }
        //if window not in cache - create new window
        return createNewWindow(constructorName, params);
    }

    function createNewWindow(constructorName, params){
        console.log("creating new page "+constructorName);
        if (currentWindow) {
            currentWindow.hide();
        }

        var RequiredConstructor = processGui[constructorName];

        var createNewRequiredWindow = (function() {
            function F(args) {
                return RequiredConstructor.apply(this, args);
            }
            F.prototype = RequiredConstructor.prototype;
        
            return function() {
                return new F(arguments);
            }
        })();
        currentWindow = createNewRequiredWindow.apply(null, params);
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
            var params = [].slice.call(arguments); 
            return getWindowByConstructorName(constructorName, params);
        }
    }

    function getDefaultInterface(){
        return {
            setProcess: setProcess
        };
    }

    return getDefaultInterface();
})()
