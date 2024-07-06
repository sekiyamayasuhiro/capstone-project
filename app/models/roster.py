from .db import db, environment, SCHEMA, add_prefix_for_prod

class Roster(db.Model):
    __tablename__ = 'rosters'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    team_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('teams.id')), primary_key=True)
    player_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('players.id')), primary_key=True)

    # Relationships
    team = db.relationship('Team', back_populates='roster')
    player = db.relationship('Player', back_populates='roster')

    def to_dict(self):
        return {
            'team_id': self.team_id,
            'player_id': self.player_id
        }
