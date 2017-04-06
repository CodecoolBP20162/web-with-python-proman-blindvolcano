var saveUrl = "http://127.0.0.1:5000/save"
var loadUrl = "http://127.0.0.1:5000/load"
var json_obj = none

var Getter = function (yourUrl) {
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET", yourUrl, false);
    Httpreq.send(null);
    return Httpreq.responseText;
}

var Setter = function (yourUrl) {
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("POST", yourUrl, false);
    Httpreq.send(JSON.stringify(json_obj);
    return Httpreq.responseText;
}

//----------------State Pattern for saving and laoding data-----------

var DataHandler = function () {
    var currentState = new DBstat(this);

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

var DBstat = function (savedata) {
    this.savedata = savedata;

    this.load = function () {
        json_obj = JSON.parse(Get(loadUrl));
    }

    this.save = function () {
        Setter(saveUrl);
    }
};

var Localstate = function (savedata) {
    this.savedata = savedata;

    this.load = function () {
        json_obj =
        //Load data from local storage
    }

    this.save = function () {
        //save data to local storage
    }
};

var datahandler = new DataHandler();
