from .db import db, environment, SCHEMA, add_prefix_for_prod

class Note(db.Model):
    __tablename__= 'notes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    player_name = db.Column(db.String(255), nullable = False)
    note_content = db.Column(db.Text, nullable = False)
    created_at = db.Column(db.TIMESTAMP, default=db.func.current_timestamp())
    updated_at = db.Column(db.TIMESTAMP, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    # Relationships
    user = db.relationship('User', back_populates='note')
    tag = db.relationship('Tag', secondary='note_tags', back_populates='note')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'player_name': self.player_name,
            'note_content': self.note_content,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'tags': [tag.tag_name for tag in self.tags],
        }
