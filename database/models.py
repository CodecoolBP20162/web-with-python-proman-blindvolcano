from flaskr.connectdatabase import ConnectDatabase
from peewee import *


class BaseModel(Model):
    class Meta:
        database = ConnectDatabase.db


class Card(BaseModel):
    title = CharField()
    text = TextField(null=True)
    board = ForeignKeyField(Board)


class Board(BaseModel):
    title = CharField()
