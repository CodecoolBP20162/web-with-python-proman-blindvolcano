from connectdatabase import ConnectDatabase
from peewee import *


class Basemodel(Model):
    """A base model that will use our Postgresql database"""

    class Meta:
        database = ConnectDatabase.db


class Board(Basemodel):
    board_name = CharField()
    board_order_id = IntegerField()


class Card(Basemodel):
    card_name = CharField()
    card_order_id = IntegerField()
    related_board = ForeignKeyField(Board, related_name="board")


class TableCreate():

    def __init__(self):
        self.db = db

    def connect_to_db(self):
        self.db.connect()

    def drop_table(self):
        self.db.drop_tables([Board, Card], safe=True)

    def create_tables(self):
        self.db.create_tables([Board, Card], safe=True)

db = ConnectDatabase().db
