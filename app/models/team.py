from .db import db, environment, SCHEMA, add_prefix_for_prod

class Team(db.Model):
    __tablename__ = 'teams'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    league_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('leagues.id')), nullable=False)
    name = db.Column(db.String(30), nullable=False)
    note = db.Column(db.String(100), nullable=False)
    team_img = db.Column(db.String, nullable=False)
    wins = db.Column(db.Integer, nullable=False, default=0)
    losses = db.Column(db.Integer, nullable=False, default=0)
    ties = db.Column(db.Integer, nullable=False, default=0)
    created_at = db.Column(db.TIMESTAMP, default=db.func.current_timestamp())
    updated_at = db.Column(db.TIMESTAMP, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    # Relationships
    league = db.relationship('League', back_populates='team')
    roster = db.relationship('Roster', back_populates='team')

    def to_dict(self):
        return {
            'id': self.id,
            'league_id': self.league_id,
            'name': self.name,
            'note': self.note,
            'team_img': self.team_img,
            'wins': self.wins,
            'losses': self.losses,
            'ties': self.ties,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'roster': [player.player.to_dict() for player in self.roster]
        }
