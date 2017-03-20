from flaskr.connectdatabase import ConnectDatabase
from peewee import *

class BaseModel(Model):
    class Meta:
        database = ConnectDatabase.db

class Cards(BaseModel):
    title = CharField()
    text = TextField(null=True)
    board = ForeignKeyField(Boards)

class Boards(BaseModel):
    title = CharField()

