$(document).ready(function () {
    var boardList = [];
    function Board(title, cardlist = []) {
        this.title = title;
        this.cardlist = cardlist;
    };

    function Card(title, cardtext) {
        this.title = title;
        this.cardtext = cardtext;
    }

    //Board list
    function listBoard(list_of_boards) {
        for (var oneBoard in list_of_boards) {
            createBoard(list_of_boards[oneBoard]);
        }
    };

    //Add new board

    $("#add_new_board").click(function () {
        var board_title = $("#boardTitle").val();
        var board = new Board(board_title);
        localStorage.setItem("boardTitle", board_title)
        boardList.push(board);
        localStorage.setItem("boardList", JSON.stringify(boardList));
        createBoard(board);
        board_title = $("#boardTitle").val("");
    });

    //Create board Function
    //function createBoard(item)


    // Index
    var board1 = new Board("Board1");
    var board2 = new Board("Board2");
    var board3 = new Board("Board3")
    var board4 = new Board("Board4")
    var board5 = new Board("Board5")
    var loadBoard = JSON.parse(localStorage.getItem("boardList"));
    if (loadBoard) {
        boardList = loadBoard;
        listBoard(loadBoard);
    } else {
        boardList.push(board1);
        boardList.push(board2);
        boardList.push(board3);
        boardList.push(board4);
        boardList.push(board5);
        listBoard(boardList);
        localStorage.setItem("boardList", JSON.stringify(boardList))
    };
    getBoardTitle();
    detailedBoard();
    $('.divCard').sortable({
        update: function (even, ui) {
            for (board in boardList) {
                if (boardList[board].title === localStorage.getItem("boardTitle")) {
                    boardList[board].cardlist = [];
                };
            };
          
            localStorage.setItem("boardList", JSON.stringify(boardList));
        }
    });
});