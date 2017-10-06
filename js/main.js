var module = null;
globalRequire("windowManager");
globalRequire("gui");

function start(){
    var process = require("myProcess/process");
    process.start();
}

var Processes = {
    MY_PROCESS: "MyProcess"
}

function showObject(obj, objName, depth){
    console.log("IVAN. -------------------"+objName+"--------------------------------");
    var level = 0;
    function getOtstup(){
       var otstup = ""
       for (var i = 0; i < level; i++) {
           otstup+="    ";
       }
       return otstup;
    };
    function logObjProperties(obj) {
        for (var key in obj){
            switch (typeof obj[key]) {
                case "object":
                    if(depth && (level >= (depth-1))) {
                        console.log(getOtstup() + key + " = { object }");
                    }
                    else {
                        console.log(getOtstup() + key + " = {");
                        level++;
                        logObjProperties(obj[key]);
                        level--;
                        console.log(getOtstup() + "}")
                    }
                    break;
                default:
                    console.log(getOtstup() + key + " = " + obj[key]);
                    break;
            }
        }
    }
    if (!obj || (typeof obj === "string")) {
        console.log(obj);
    }
    else {
        logObjProperties(obj);
    }
    console.log("IVAN. ------------------------------------------------------------------");
}

function require(moduleName){
    globalRequire(moduleName);
    var newModuleLink = module;
    module = null;
    return newModuleLink;
}

function globalRequire(moduleName){
    var filePath = moduleName + ".js";
    var includeResult = Qt.include(filePath);
    switch (includeResult.status) {
        case 2: // result.NETWORK_ERROR - некорректный URL, в нашем случае ошибка в пути к файлу
            console.log("Error including of " + filePath + ". Uncorrect file path/name");
            break;
        case 3: // result.EXCEPTION - возникла ошибка при выполнении файла
            var err = includeResult.exception;
            console.log("Error in " + filePath + ". " + err.message + " in line " + err.lineNumber);
            break;
        default:
            console.log("includeResult.status = " + includeResult.status + ", " + filePath + " included");
            break;
    }
}

