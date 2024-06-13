from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, League

league_routes = Blueprint('leagues', __name__)

# create a league
@league_routes.route('/', methods=['POST'])
@login_required
def create_league():
    """
    Create a new league with the current logged-in user.
    """
    data = request.get_json()
    league = League(
        user_id=current_user.id,
        name=data['name'],
        note=data['note'],
        league_img=data['league_img'],
        scoring_type=data['scoring_type'],
        max_players=data['max_players']
    )
    db.session.add(league)
    db.session.commit()
    return jsonify(league.to_dict()), 201

# get all leagues
@league_routes.route('/', methods=['GET'])
@login_required
def get_leagues():
    """
    Get all leagues associated with the current logged-in user.
    """
    leagues = League.query.filter_by(user_id=current_user.id).all()
    return jsonify([league.to_dict() for league in leagues])

# get a specific league
@league_routes.route('/<int:id>', methods=['GET'])
@login_required
def get_league(id):
    """
    Get a specific league by its ID associated with the current logged-in user.
    """
    league = League.query.get(id)
    if league and league.user_id == current_user.id:
        return jsonify(league.to_dict())
    return jsonify({'errors': 'League not found'}), 404

# update a specific league
@league_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_league(id):
    """
    Update a specific league by its ID associated with the current logged-in user.
    """
    league = League.query.get(id)
    if league and league.user_id == current_user.id:
        data = request.get_json()
        league.name = data.get('name', league.name)
        league.note = data.get('note', league.note)
        league.league_img = data.get('league_img', league.league_img)
        league.scoring_type = data.get('scoring_type', league.scoring_type)
        league.max_players = data.get('max_players', league.max_players)
        db.session.commit()
        return jsonify(league.to_dict())
    return jsonify({'errors': 'League not found'}), 404

# delete a specific league
@league_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_league(id):
    """
    Delete a specific league by its ID associated with the current logged-in user.
    """
    league = League.query.get(id)
    if league and league.user_id == current_user.id:
        db.session.delete(league)
        db.session.commit()
        return jsonify({'message': 'League successfully deleted'})
    return jsonify({'errors': 'League not found'}), 404
