import sys
import json
from flask import Flask, request, redirect, url_for, render_template, g
from model import *
from example_data import *

app = Flask(__name__)  # create the application instance :)
app.config.from_object(__name__)


def init_db():
    proman = TableCreate()
    proman.connect_to_db()
    proman.drop_table()
    proman.create_tables()
    create_example_data()


@app.cli.command('initdb')
def initdb_command():
    """Initializes the database."""
    init_db()
    print('Initialized the database.')


@app.teardown_appcontext
def close_db(error):
    """Closes the database again at the end of the request."""
    if hasattr(g, 'postgre_db'):
        g.postgre_db.close()


@app.route('/')
def root():
    return render_template('index.html')


@app.route('/cards')
def cards():
    return render_template('cards.html')


@app.route('/boards')
def boards():
    return render_template('boards.html')


@app.route('/createboards')
def boards2():
    return render_template('createboards.html')


@app.route("/save", methods=['POST'])
def save():
    json = request.get_json(force=True, silent=False, cache=True)
    boarddata = json[0]
    carddata = json[1]
    for i in boarddata:
        query = Board.select().where(Board.id == i[0])
        if query.exists():
            board = Board.select().where(Board.id == i[0]).get()
            board.board_name = i[1]
            board.board_order_id = i[2]
            board.save()
        else:
            Board.create(id=i[0], board_name=i[1], board_order_id=i[2])
    for i in carddata:
        query = Card.select().where(Card.id == i[0])
        if query.exists():
            card = Card.select().where(Card.id == i[0]).get()
            card.card_name = i[1]
            card.board_order_id = i[2]
            card.related_board = i[3]
        else:
            Card.create(id=boarddata[i][0], card_name=boarddata[i][1],
                        board_order_id=boarddata[i][2], related_board=boarddata[i][3])

    return "success"


@app.route("/load", methods=['GET'])
def load():
    boarddata = []
    carddata = []
    for boards in Board.select():
        boardtemp = [boards.id, boards.board_name, boards.board_order_id]
        boarddata.append(boardtemp)
    for cards in Card.select():
        cardtemp = [cards.id, cards.card_name, cards.card_order_id, cards.related_board.id]
        carddata.append(cardtemp)
    data = [boarddata, carddata]
    return json.dumps(data)


if __name__ == "__main__":
    if len(sys.argv) > 1:
        if sys.argv[1] == "initdb":
            init_db()
    app.run(debug=True, host='127.0.0.1', port=5000)
