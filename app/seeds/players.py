from app.models import db, Player, environment, SCHEMA
from sqlalchemy.sql import text


def seed_players():
    players = [
        Player(
            nba_player_id=201939,
            full_name='Stephen Curry',
        ),
        Player(
            nba_player_id=2544,
            full_name='LeBron James',
        ),
        Player(
            nba_player_id=203999,
            full_name='Nikola Jokic',
        ),
    ]

    for player in players:
        db.session.add(player)
    db.session.commit()

def undo_players():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.players RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM players"))

    db.session.commit()
