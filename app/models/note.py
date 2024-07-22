from .db import db, environment, SCHEMA, add_prefix_for_prod

class Note(db.Model):
    __tablename__= 'notes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    player_name = db.Column(db.String(255), nullable = False)
    note_content = db.column(db.Text, nullable = False)
    created_at = db.Column(db.TIMESTAMP, default=db.func.current_timestamp())
    updated_at = db.Column(db.TIMESTAMP, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())
