//setting the tile of the page
document.write('<title>Proman</title>');
// set the navigation bar and the background
document.getElementById("body").innerHTML = '<style> \
    body { \
    background-image: url("/static/pics/background.png"); \
	background-size: 1300px 800px; \
} \
</style> \
<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation"> \
        <div class="container"> \
            <div class="navbar-header"> \
                <a class="navbar-brand" href="#"><img style="max-width:80px; margin-top: -15px;" src="/static/pics/logo.png"></a> \
            </div> \
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1"> \
                <ul class="nav navbar-nav navbar-right"> \
                    <li> \
                    <button id="newboard" class="btn btn-primary btn-success navbar-btn" type="button">New Board</button> \
                    </li> \
                </ul> \
            </div> \
        </div> \
    </nav>';
// populate the space with boards
//------------Board contense
var boardlist = []
var loadboardlist = function () {
    boardlist = ["oldboard", "newboard", "testboard"];
};
var checkboard = function () {
    if (localStorage.getItem("boardlist") === null) {
        var oldboard = Object();
        oldboard.name = "oldboard";
        var newboard = Object();
        newboard.name = "newboard";
        var testboard = Object();
        testboard.name = "testboard";
        return boardlist = [oldboard, newboard, testboard];
    }
    else {
        boardlist = loadboardlist();
    }
};

var printboard = function () {
    for (var i = 0; i <= boardlist.length; i++) {
        document.getElementById("body").innerHTML = '<div><h2>';
        document.getElementById("body").innerHTML = boardlist;
        document.getElementById("body").innerHTML = '</h2></div>';
    }
};
checkboard();
// document.getElementById("body").innerHTML = boardlist;
//printboard();


//board storage 1st bord 2 board
// each bord has mulitple lists
//each list has multiple items

//first we want to check if there is data in the local cache

//if yes we retrive it and show it else we create the default cards.

// wire the new board button to create a new board id="newboard"

// the board boxes should have a remove function.
// they should also be stored in the local cache.
