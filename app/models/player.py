from .db import db, environment, SCHEMA, add_prefix_for_prod

class Player(db.Model):
    __tablename__ = 'players'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    nba_player_id = db.Column(db.Integer, unique=True, nullable=False)
    full_name = db.Column(db.String(100), nullable=False)
    is_active = db.Column(db.Boolean, default=True, nullable=False)

    # Relationships
    roster = db.relationship('Roster', back_populates='player')

    def to_dict(self):
        return {
            'id': self.id,
            'nba_player_id': self.nba_player_id,
            'full_name': self.full_name,
            'is_active': self.is_active
        }
