$(document).ready(function () {
    var boardList = [];
    function Board(title, cardlist = []) {
        this.title = title;
        this.cardlist = cardlist;
    };

    function Card(title, cardcontent) {
        this.title = title;
        this.cardcontent = cardcontent;
    }

    //Card list
    function listCards(list_of_cards) {
        for (var card in list_of_cards) {
            createCard(list_of_cards[card]);
        }
    };

    function getBoardTitle() {
        $("div.board").click(function () {
            var title = $(this).find("h1");
            var innerTitle = title[0].innerHTML;
            localStorage.setItem("boardTitle", innerTitle)
        });
    };

    function detailedBoard() {
        var innerTitle = localStorage.getItem("boardTitle")
        $(".divBoardHeader").append("<h1></h1>")
        $(".divBoardHeader h1:first").html(innerTitle);
        for (board in boardList) {
            if (boardList[board].title === innerTitle) {
                listCards(boardList[board].cardlist)
            };
        };
    };

    //Card Create
    function createCard(item) {
        $(".divCard").append(
            "<div class='col-sm-3'>" +
            "<div class='col-sm-12 card'>" +
            "<div class='cardTitle'><h1></h1></div>" +
            "<div><h2></h2></div>" +
            "</div></div>");
        $(".card h1:last").html(item.title);
        $(".card h2:last").html(item.cardcontent);

    }


    // New cards
    $("#add_new_card").click(function () {
        var card_title = $("#cardTitle").val();
        var card_content = $("#cardContent").val();
        var card = new Card(card_title, card_content);
        for (board in boardList) {
            if (boardList[board].title === localStorage.getItem("boardTitle")) {
                boardList[board].cardlist.push(card);
            };
        };
        localStorage.setItem("boardList", JSON.stringify(boardList));
        createCard(card);
        card_title = $("#cardTitle").val("");
        card_content= $("#cardContent").val("");

    });


    getBoardTitle();
    detailedBoard();
    $('.divCard').sortable({
        update: function (even, ui) {
            for (board in boardList) {
                if (boardList[board].title === localStorage.getItem("boardTitle")) {
                    boardList[board].cardlist = [];
                };
            };
            $('.card').each(function () {
                var card_title = $(this).find("h1").html();
                var card_content = $(this).find("h2").html();
                var card = new Card(card_title, card_content);
                for (board in boardList) {
                    if (boardList[board].title === localStorage.getItem("boardTitle")) {
                        boardList[board].cardlist.push(card);
                    };
                };
            });
            localStorage.setItem("boardList", JSON.stringify(boardList));
        }
    });
});