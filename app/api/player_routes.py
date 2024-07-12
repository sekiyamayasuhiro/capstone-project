from flask import Blueprint, request, jsonify
from nba_api.stats.static import players
from nba_api.stats.endpoints import playercareerstats

player_routes = Blueprint('players', __name__)

# player search
@player_routes.route('/search', methods=['GET'])
def search_players():
    query = request.args.get('name')
    if not query:
        return jsonify({"error": "No search query provided"}), 400

    titled_name = query.title()

    find_player_by_full_name = players.find_players_by_full_name(titled_name)
    active_players = [player for player in find_player_by_full_name if player['is_active']]

    if not active_players:
        return jsonify({"message": "No active players found"}), 404

    return jsonify(active_players), 200

# get career totals of a player
@player_routes.route('/stats/career/<int:player_id>', methods=['GET'])
def career_totals(player_id):
    try:
        player_stats = playercareerstats.PlayerCareerStats(player_id=player_id).get_normalized_dict()
        career_stats = player_stats['CareerTotalsRegularSeason'][0]
        games_played = career_stats['GP']

        if games_played > 0:
            career_stats['RPG'] = round(career_stats['REB'] / games_played, 1)
            career_stats['APG'] = round(career_stats['AST'] / games_played, 1)
            career_stats['SPG'] = round(career_stats['STL'] / games_played, 1)
            career_stats['BPG'] = round(career_stats['BLK'] / games_played, 1)
            career_stats['TPG'] = round(career_stats['TOV'] / games_played, 1)
            career_stats['PPG'] = round(career_stats['PTS'] / games_played, 1)
        return jsonify(career_stats), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# get season totals of a player
@player_routes.route('/stats/season/<int:player_id>', methods=['GET'])
def season_totals(player_id):
    try:
        player_stats = playercareerstats.PlayerCareerStats(player_id=player_id).get_normalized_dict()
        seasons_data = player_stats['SeasonTotalsRegularSeason']

        for season in seasons_data:
            games_played = season['GP']
            if games_played > 0:
                season['RPG'] = round(season['REB'] / games_played, 1)
                season['APG'] = round(season['AST'] / games_played, 1)
                season['SPG'] = round(season['STL'] / games_played, 1)
                season['BPG'] = round(season['BLK'] / games_played, 1)
                season['TPG'] = round(season['TOV'] / games_played, 1)
                season['PPG'] = round(season['PTS'] / games_played, 1)
        return jsonify(seasons_data), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# get 2023-24 season totals of a player
@player_routes.route('/stats/2023-24/<int:player_id>', methods=['GET'])
def season_2023_24_totals(player_id):
    try:
        player_stats = playercareerstats.PlayerCareerStats(player_id=player_id).get_normalized_dict()
        season_data = [season for season in player_stats['SeasonTotalsRegularSeason'] if season['SEASON_ID'] == '2023-24']
        if not season_data:
            return jsonify({"error": "No data for the 2023-24 season"}), 404

        stats = season_data[0]
        games_played = stats['GP']

        if games_played > 0:
            stats['RPG'] = round(stats['REB'] / games_played, 1)
            stats['APG'] = round(stats['AST'] / games_played, 1)
            stats['SPG'] = round(stats['STL'] / games_played, 1)
            stats['BPG'] = round(stats['BLK'] / games_played, 1)
            stats['TPG'] = round(stats['TOV'] / games_played, 1)
            stats['PPG'] = round(stats['PTS'] / games_played, 1)
        return jsonify(stats), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# get player details by ID
@player_routes.route('/<int:player_id>', methods=['GET'])
def get_player_by_id(player_id):
    try:
        player = players.find_player_by_id(player_id)
        if not player:
            return jsonify({"error": "Player not found"}), 404
        return jsonify(player), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
