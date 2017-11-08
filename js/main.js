var module = null;
globalRequire("windowManager");
globalRequire("gui");

var global = {
    appInfo: "FZMobile 0.0.1-T",
    userInfo: ""
}

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


// полифилл Function.prototype.bind из ECMAScript 5
if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (typeof this !== 'function') {
      // ближайший аналог внутренней функции
      // IsCallable в ECMAScript 5
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var aArgs = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        FNOP    = function() {},
        fBound  = function() {
          return fToBind.apply(this instanceof FNOP && oThis
                 ? this
                 : oThis,
                 aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    FNOP.prototype = this.prototype;
    fBound.prototype = new FNOP();

    return fBound;
  };
}

function O(){
    this.x = 12;
    function f1(){
        console.log(this.x);
    }
    this.getFunc = function(){
        return f1.bind(this);
    }
}

var o1 = new O();
var f1 = o1.getFunc();
f1();
