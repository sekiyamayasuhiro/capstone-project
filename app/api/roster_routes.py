from flask import Blueprint, request, jsonify
from app.models import db, Team, Player, Roster, League
from flask_login import login_required, current_user

roster_routes = Blueprint('rosters', __name__)

# get roster for a specific team
@roster_routes.route('/teams/<int:team_id>/roster', methods=['GET'])
@login_required
def get_roster(team_id):
    team = Team.query.get(team_id)
    if not team or team.league.user_id != current_user.id:
        return jsonify({"error": "Team not found or not authorized"}), 404

    roster_entries = Roster.query.filter_by(team_id=team_id).all()
    roster_list = [entry.player.to_dict() for entry in roster_entries]
    return jsonify(roster_list), 200

# add a player to a team's roster (and add to the db if does not exist)
@roster_routes.route('/teams/<int:team_id>/roster', methods=['POST'])
@login_required
def add_player_to_roster(team_id):
    # try:
        team = Team.query.get(team_id)
        if not team or team.league.user_id != current_user.id:
            return jsonify({"error": "Team not found or not authorized"}), 404

        player_data = request.get_json()
        nba_player_id = player_data.get('id')
        full_name = player_data.get('full_name')

        # Check if player exists, if not add
        player = Player.query.filter_by(nba_player_id=nba_player_id).first()
        if not player:
            player = Player(nba_player_id=nba_player_id, full_name=full_name)
            db.session.add(player)
            db.session.commit()

        # Check for player on another team in this league
        existing_roster_entry = Roster.query.join(Team).filter(Team.league_id == team.league_id, Roster.player_id == player.id).first()
        if existing_roster_entry:
            return jsonify({"error": "Player already on a team in this league"}), 409

        new_roster_entry = Roster(team_id=team_id, player_id=player.id)
        db.session.add(new_roster_entry)
        db.session.commit()
        return jsonify(new_roster_entry.to_dict()), 201

    # except Exception as e:
    #     return jsonify({"error": str(e)}), 500


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
