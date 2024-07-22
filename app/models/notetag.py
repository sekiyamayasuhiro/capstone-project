from .db import db, environment, SCHEMA, add_prefix_for_prod

class NoteTag(db.Model):
    __tablename__ = 'note_tags'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    note_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('note.id')), primary_key=True)
    tag_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('tag.id')), primary_key=True)
