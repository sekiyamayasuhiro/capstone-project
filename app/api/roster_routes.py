from flask import Blueprint, request, jsonify
from app.models import db, Team, Player, Roster, League
from flask_login import login_required, current_user

roster_routes = Blueprint('rosters', __name__)

# add player to roster
@roster_routes.route('/teams/<int:team_id>/roster', methods=['POST'])
@login_required
def add_player_to_roster(team_id):
    print("HELLO WORLD!")
    player_id = request.json.get('player_id')

    team = Team.query.get(team_id)
    player = Player.query.get(player_id)
    if not team or not player:
        return jsonify({"error": "Team or player not found"}), 404

    if team.league.user_id != current_user.id:
        return jsonify({"error": "Not authorized"}), 403

    existing_entry = Roster.query.join(Team).filter(Team.league_id == team.league_id, Roster.player_id == player_id).first()
    if existing_entry:
        return jsonify({"error": "Player already on a team in this league"}), 409

    new_entry = Roster(team_id=team_id, player_id=player_id)
    db.session.add(new_entry)
    db.session.commit()
    return jsonify(new_entry.to_dict()), 201

# remove player from roster
@roster_routes.route('/teams/<int:team_id>/roster/<int:player_id>', methods=['DELETE'])
@login_required
def remove_player_from_roster(team_id, player_id):
    team = Team.query.get(team_id)
    if not team or team.league.user_id != current_user.id:
        return jsonify({"error": "Team not found or not authorized"}), 403

    roster_entry = Roster.query.filter_by(team_id=team_id, player_id=player_id).first()
    if not roster_entry:
        return jsonify({"error": "Player not found on this team"}), 404

    db.session.delete(roster_entry)
    db.session.commit()
    return jsonify({"message": "Player removed from roster"}), 200

# list players in roster
@roster_routes.route('/teams/<int:team_id>/roster', methods=['GET'])
@login_required
def list_roster(team_id):
    team = Team.query.get(team_id)
    if not team or team.league.user_id != current_user.id:
        return jsonify({"error": "Team not found or not authorized"}), 403

    roster_entries = Roster.query.filter_by(team_id=team_id).all()
    players = [entry.player.to_dict() for entry in roster_entries]
    return jsonify(players), 200
