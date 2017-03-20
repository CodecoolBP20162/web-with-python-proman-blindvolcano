from database.models import *


class ConnectDatabase:
    def get_connect_string():
        try:
            with open('connect_str.txt', "r") as db_name:
                return db_name.readline().strip()
        except:
            print("You need to create a database and store its name in a file named 'connect_str.txt'.")

    db = PostgresqlDatabase(get_connect_string())


class CreateDatabase:
    def create_db():
        ConnectDatabase.db.drop_tables([Board, Card], safe=True)
        ConnectDatabase.db.create_tables([Board, Card], safe=True)