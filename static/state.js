var saveUrl = "http://127.0.0.1:5000/save"
var loadUrl = "http://127.0.0.1:5000/load"
var json_obj;

var Getter = function (yourUrl) {
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET", yourUrl, false);
    Httpreq.send(null);
    return Httpreq.responseText;
}

var Setter = function (yourUrl) {
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("POST", yourUrl, false);
    Httpreq.setRequestHeader("Content-Type", "application/json");
    Httpreq.send(JSON.stringify(json_obj));
    return Httpreq.responseText;
}

//----------------State Pattern for saving and laoding data-----------

var DataHandler = function () {
    var currentState = new DBstate(this);

    this.change = function (state) {
        currentState = state;
        currentState.save();
    };
    this.save = function () {
        currentState.save();
    };
    this.load = function () {
        currentState.load();
    }
}

var DBstate = function (savedata) {
    this.savedata = savedata;

    this.load = function () {
        json_obj = JSON.parse(Getter(loadUrl));
    }

    this.save = function () {
        Setter(saveUrl);
    }
};

var Localstate = function (savedata) {
    this.savedata = savedata;

    this.load = function () {
        json_obj = JSON.parse(localStorage.getItem('boardlist'));
        console.log("should be loaded");
    }

    this.save = function () {
        localStorage.setItem('test', "shit works fool");
        localStorage.setItem('boardlist', JSON.stringify(json_obj));
        console.log("should be saved");
    }
};

var datahandler = new DataHandler();
datahandler.load();