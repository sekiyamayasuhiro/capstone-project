from flask import Blueprint, request, jsonify
from app.models import db, Team, Player, Roster, League
from flask_login import login_required, current_user

roster_routes = Blueprint('rosters', __name__)

# add player to roster

# remove player from roster

# list players in roster
