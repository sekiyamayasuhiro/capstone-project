from .db import db, environment, SCHEMA, add_prefix_for_prod

class League(db.Model):
    __tablename__ = 'leagues'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String(30), nullable=False)
    note = db.Column(db.String(100), nullable=False)
    league_img = db.Column(db.String, nullable=False)
    scoring_type = db.Column(db.String, nullable=False)
    max_players = db.Column(db.Integer, nullable=False)

    # Relationships
    user = db.relationship('User', back_populates='league')
    team = db.relationship('Team', back_populates='league', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'note': self.note,
            'league_img': self.league_img,
            'scoring_type': self.scoring_type,
            'max_players': self.max_players
        }
