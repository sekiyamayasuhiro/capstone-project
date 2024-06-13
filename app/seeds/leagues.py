from app.models import db, League, environment, SCHEMA
from sqlalchemy.sql import text

def seed_leagues():
    leagues = [
        League(
            user_id=1,
            name='The League',
            note='Not so friendly league with high school buddies.',
            league_img='https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/002.png',
            scoring_type='head-to-head-categories',
            max_players=12
        ),
        League(
            user_id=1,
            name='A/a League',
            note='Friendly league with A/a members.',
            league_img='https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/005.png',
            scoring_type='head-to-head-categories',
            max_players=10
        ),
        League(
            user_id=2,
            name='Second User League',
            note='Just checking the second user.',
            league_img='https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/008.png',
            scoring_type='head-to-head-categories',
            max_players=8
        ),
    ]

    for league in leagues:
        db.session.add(league)
    db.session.commit()

def undo_leagues():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.leagues RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM leagues"))

    db.session.commit()
