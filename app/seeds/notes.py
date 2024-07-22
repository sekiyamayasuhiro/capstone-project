from app.models import db, Note, environment, SCHEMA
from sqlalchemy.sql import text


def seed_notes():
    notes = [
        Note(
            user_id=1,
            player_name="Stephen Curry",
            note_content="Great performance in the last game.",
        ),
        Note(
            user_id=1,
            player_name="Stephen Curry",
            note_content="Excellent shooting from the 3-point line."
        ),
        Note(
            user_id=1,
            player_name="Stephen Curry",
            note_content="3 POINT GOD!!!"
        ),
    ]

    for note in notes:
        db.session.add(note)
    db.session.commit()

def undo_notes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.notes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM notes"))

    db.session.commit()
