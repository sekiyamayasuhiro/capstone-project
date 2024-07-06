from nba_api.stats.static import players
from nba_api.stats.endpoints import playercareerstats

# player_dict = players.get_players()
# print(player_dict[:5])  # Display the first five players to check

###
# # Fetch the list of all players
# player_dict = players.get_players()

# # Filter to get only active players
# active_players = [player for player in player_dict if player['is_active']]

# # Display the first five active players to check
# print(active_players[:5])

###
# player_active_dict = players.get_active_players()

# print(player_active_dict[:5])

###
# get_victor = players.find_players_by_full_name("Victor Wembanyama")
# get_paolo = players.find_players_by_full_name("Paolo Banchero")

# print(get_victor)
# print("XXXXXXXXXXXXXXXXXXXXXXXXXXXX-Divider")
# print(get_paolo)
# print("XXXXXXXXXXXXXXXXXXXXXXXXXXXX-Divider")

# test_victor = playercareerstats.PlayerCareerStats(player_id=1641705).get_normalized_dict()
# test_paolo = playercareerstats.PlayerCareerStats(player_id=1631094).get_normalized_dict()

# print(test_victor)
# print("XXXXXXXXXXXXXXXXXXXXXXXXXXXX-Divider")
# print(test_paolo)

###
# query = "stephen curry"

# titled_name = query.title()

# find_player_by_full_name = players.find_players_by_full_name(titled_name)
# active_players = [player for player in find_player_by_full_name if player['is_active']]

# if not active_players:
#     print("No active players found")

# first_active_player = {
#         'id': active_players[0]['id'],
#         'full_name': active_players[0]['full_name']
#     }

# print(first_active_player)

###
# player_id = 201939

# def season_totals(player_id):
#     try:
#         player_stats = playercareerstats.PlayerCareerStats(player_id=player_id).get_normalized_dict()
#         print(player_stats['SeasonTotalsRegularSeason'])
#     except Exception as e:
#         print({"error": str(e)})

# season_totals(201939)

###
# def season_totals(player_id):
#     try:
#         player_stats = playercareerstats.PlayerCareerStats(player_id=player_id).get_normalized_dict()
#         seasons_data = player_stats['SeasonTotalsRegularSeason']

#         for season in seasons_data:
#             games_played = season['GP']
#             if games_played > 0:
#                 season['RPG'] = round(season['REB'] / games_played, 1)
#                 season['APG'] = round(season['AST'] / games_played, 1)
#                 season['SPG'] = round(season['STL'] / games_played, 1)
#                 season['BPG'] = round(season['BLK'] / games_played, 1)
#                 season['TPG'] = round(season['TOV'] / games_played, 1)
#                 season['PPG'] = round(season['PTS'] / games_played, 1)
#         print(seasons_data)
#     except Exception as e:
#         print({"error": str(e)})

# season_totals(201939)

###

# def season_2023_24_totals(player_id):
#     try:
#         player_stats = playercareerstats.PlayerCareerStats(player_id=player_id).get_normalized_dict()
#         season_data = [season for season in player_stats['SeasonTotalsRegularSeason'] if season['SEASON_ID'] == '2023-24']
#         if not season_data:
#             print("No data available for the 2023-24 season")
#         print(season_data[0])
#     except Exception as e:
#         print({"error": str(e)})

# season_2023_24_totals(201939)


###
# def season_2023_24_totals(player_id):
#     try:
#         player_stats = playercareerstats.PlayerCareerStats(player_id=player_id).get_normalized_dict()
#         season_data = [season for season in player_stats['SeasonTotalsRegularSeason'] if season['SEASON_ID'] == '2023-24']
#         if not season_data:
#             print("No data for the 2023-24 season")

#         stats = season_data[0]
#         games_played = stats['GP']

#         if games_played > 0:
#             stats['RPG'] = round(stats['REB'] / games_played, 1)
#             stats['APG'] = round(stats['AST'] / games_played, 1)
#             stats['SPG'] = round(stats['STL'] / games_played, 1)
#             stats['BPG'] = round(stats['BLK'] / games_played, 1)
#             stats['TPG'] = round(stats['TOV'] / games_played, 1)
#             stats['PPG'] = round(stats['PTS'] / games_played, 1)

#         print(stats)
#     except Exception as e:
#         print({"error": str(e)})

# season_2023_24_totals(201939)


###
# def career_totals(player_id):
#     try:
#         player_stats = playercareerstats.PlayerCareerStats(player_id=player_id).get_normalized_dict()

#         career_stats = player_stats[0]
#         games_played = career_stats['GP']

#         if games_played > 0:
#             career_stats['RPG'] = round(career_stats['REB'] / games_played, 1)
#             career_stats['APG'] = round(career_stats['AST'] / games_played, 1)
#             career_stats['SPG'] = round(career_stats['STL'] / games_played, 1)
#             career_stats['BPG'] = round(career_stats['BLK'] / games_played, 1)
#             career_stats['TPG'] = round(career_stats['TOV'] / games_played, 1)
#             career_stats['PPG'] = round(career_stats['PTS'] / games_played, 1)
#         print(career_stats)

#     except Exception as e:
#         print("ERROR")

# career_totals(201939)

# def career_totals(player_id):
#     try:
#         player_stats = playercareerstats.PlayerCareerStats(player_id=player_id).get_normalized_dict()
#         return print(player_stats['CareerTotalsRegularSeason'])
#     except Exception as e:
#         return print({"error": str(e)})

# career_totals(201939)

def career_totals(player_id):
    try:
        player_stats = playercareerstats.PlayerCareerStats(player_id=player_id).get_normalized_dict()
        career_stats = player_stats['CareerTotalsRegularSeason'][0]  # Directly accessing the first entry
        games_played = career_stats['GP']

        # Calculate per-game stats only if games played is greater than zero
        if games_played > 0:
            career_stats['RPG'] = round(career_stats['REB'] / games_played, 1)
            career_stats['APG'] = round(career_stats['AST'] / games_played, 1)
            career_stats['SPG'] = round(career_stats['STL'] / games_played, 1)
            career_stats['BPG'] = round(career_stats['BLK'] / games_played, 1)
            career_stats['TPG'] = round(career_stats['TOV'] / games_played, 1)
            career_stats['PPG'] = round(career_stats['PTS'] / games_played, 1)
        return print(career_stats)
    except Exception as e:
        return print({"error": str(e)})

career_totals(201939)
