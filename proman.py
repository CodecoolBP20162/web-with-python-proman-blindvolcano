import sys
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


@app.route("/save")
def save():
    json = get_json(force=True, silent=False, cache=True)
    pass


@app.route("/load")
def load():
    pass

if __name__ == "__main__":
    if len(sys.argv) > 1:
        if sys.argv[1] == "initdb":
            init_db()
    app.run(host='127.0.0.1', port=5000)
