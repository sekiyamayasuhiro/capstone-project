from app.models import db, Team, environment, SCHEMA
from sqlalchemy.sql import text


def seed_teams():
    teams = [
        Team(
            league_id=1,
            name='Dray to the UFC',
            note='This is me!!!',
            team_img='https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/025.png',
            wins=82,
            losses=86,
            ties=3
        ),
        Team(
            league_id=1,
            name='Walker Kessler',
            note='This is Matt... I hate him.',
            team_img='https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/026.png',
            wins=91,
            losses=79,
            ties=1
        ),
        Team(
            league_id=1,
            name='ShaiGuys',
            note='Lan knows what he is doing...',
            team_img='https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/027.png',
            wins=96,
            losses=72,
            ties=3
        ),
        Team(
            league_id=2,
            name='Pandamonium',
            note='Janine relies on luck and it works...',
            team_img='https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/028.png',
            wins=104,
            losses=63,
            ties=4
        )
    ]

    for team in teams:
        db.session.add(team)
    db.session.commit()

def undo_teams():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.teams RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM teams"))

    db.session.commit()
