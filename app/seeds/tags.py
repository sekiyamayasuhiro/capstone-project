from app.models import db, Tag, environment, SCHEMA
from sqlalchemy.sql import text


def seed_tags():
    tags = [
        Tag(
            tag_name="Shooter",
        ),
        Tag(
            tag_name="All-Star",
        ),
        Tag(
            tag_name="Injury-Prone",
        ),
    ]

    for tag in tags:
        db.session.add(tag)
    db.session.commit()

def undo_tags():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tags RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tags"))

    db.session.commit()
