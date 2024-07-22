from .db import db, environment, SCHEMA, add_prefix_for_prod

class Tag(db.Model):
    __tablename__= 'tags'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    tag_name = db.Column(db.String(255), unique=True, nullable=False)

    # Relationships
    note = db.relationship('Note', secondary='note_tags', back_populates='tag')
