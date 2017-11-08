this.changeData = setMenuLines.bind(this);
setMenuLines(menuLines);

var superChangeData = this.changeData;
this.changeData = function(menuLinesNames, titleText){
    superChangeData(menuLinesNames);
    this.title.text = titleText;
}

function setMenuLines(menuLinesArray) {
    this.menu.model.clear();
    for (var i = 0; i < menuLinesArray.length; i++) {
        var line = menuLinesArray[i];
        menu.model.append({
            lineName: line
        })
    }
}

function O(){
    this.x = 12
    f1 = function(){
        console.log(this.x);
    }
    this.getFunc = function(){
        return f1.bind(this);
    }
}

o1 = new O();
f1 = o1.getFunc();
f1();
