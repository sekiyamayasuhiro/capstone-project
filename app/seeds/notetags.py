from app.models import db, NoteTag, environment, SCHEMA
from sqlalchemy.sql import text


def seed_note_tags():
    note_tags = [
        NoteTag(
            note_id=1,
            tag_id=1,
        ),
        NoteTag(
            note_id=1,
            tag_id=2,
        ),
        NoteTag(
            note_id=1,
            tag_id=3,
        ),
    ]

    for note_tag in note_tags:
        db.session.add(note_tag)
    db.session.commit()

def undo_note_tags():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.note_tags RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM note_tags"))

    db.session.commit()
