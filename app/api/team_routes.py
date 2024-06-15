from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Team, League

team_routes = Blueprint('teams', __name__)

# create a team
@team_routes.route('/<int:league_id>/teams', methods=['POST'])
@login_required
def create_team(league_id):
    """
    Create a new team within a given league.
    """
    league = League.query.get(league_id)
    if league and league.user_id == current_user.id:
        data = request.get_json()
        team = Team(
            league_id=league_id,
            name=data['name'],
            note=data['note'],
            team_img=data['team_img'],
            wins=data.get('wins', 0),
            losses=data.get('losses', 0),
            ties=data.get('ties', 0)
        )
        db.session.add(team)
        db.session.commit()
        return jsonify(team.to_dict()), 201
    return jsonify({'error': 'League not found or not authorized'}), 404

# get all teams
@team_routes.route('/<int:league_id>/teams', methods=['GET'])
@login_required
def get_teams(league_id):
    """
    Get all teams within a given league.
    """
    league = League.query.get(league_id)
    if league and league.user_id == current_user.id:
        teams = Team.query.filter_by(league_id=league_id).all()
        return jsonify([team.to_dict() for team in teams])
    return jsonify({'error': 'League not found or not authorized'}), 404

# get a specific team
@team_routes.route('/<int:league_id>/teams/<int:team_id>', methods=['GET'])
@login_required
def get_team(league_id, team_id):
    """
    Get a specific team by its ID within a given league.
    """
    team = Team.query.filter_by(id=team_id, league_id=league_id).first()
    if team:
        return jsonify(team.to_dict())
    return jsonify({'errors': 'Team not found'}), 404

# update a specific team
@team_routes.route('/<int:league_id>/teams/<int:team_id>', methods=['PUT'])
@login_required
def update_team(league_id, team_id):
    """
    Update a specific team by its ID within a given league.
    """
    league = League.query.get(league_id)
    team = Team.query.get(team_id)
    if league and team and league.user_id == current_user.id and team.league_id == league_id:
        data = request.get_json()
        team.name = data.get('name', team.name)
        team.note = data.get('note', team.note)
        team.team_img = data.get('team_img', team.team_img)
        team.wins = data.get('wins', team.wins)
        team.losses = data.get('losses', team.losses)
        team.ties = data.get('ties', team.ties)
        db.session.commit()
        return jsonify(team.to_dict())
    return jsonify({'error': 'League or team not found or not authorized'}), 404

# delete a specific team
@team_routes.route('/<int:league_id>/teams/<int:team_id>', methods=['DELETE'])
@login_required
def delete_team(league_id, team_id):
    """
    Delete a specific team by its ID within a given league.
    """
    league = League.query.get(league_id)
    team = Team.query.get(team_id)
    if league and team and league.user_id == current_user.id and team.league_id == league_id:
        db.session.delete(team)
        db.session.commit()
        return jsonify({'message': 'Team successfully deleted'})
    return jsonify({'error': 'League or team not found or not authorized'}), 404
