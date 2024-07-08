from app.models import db, Roster, environment, SCHEMA
from sqlalchemy.sql import text


def seed_rosters():
    rosters = [
        Roster(
            team_id=1,
            player_id=1
        ),
        Roster(
            team_id=1,
            player_id=2
        ),
        Roster(
            team_id=1,
            player_id=3
        ),
    ]

    for roster in rosters:
        db.session.add(roster)
    db.session.commit()

def undo_rosters():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.rosters RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM rosters"))

    db.session.commit()
