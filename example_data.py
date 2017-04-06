from model import *


def create_example_data():

    #--------------------------Board
    board1 = Board.create(board_name="First Board", board_order_id=1)
    board2 = Board.create(board_name="Second Board", board_order_id=2)

    #--------------------------Card
    card1 = Card.create(card_name='First card', card_order_id=1, related_board=1)
    card2 = Card.create(card_name='Second Card', card_order_id=2, related_board=1)
    card3 = Card.create(card_name='Third card', card_order_id=1, related_board=2)
    card4 = Card.create(card_name='Forth card', card_order_id=2, related_board=2)
